import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { sendResetEmail } from "../../../utils/email";
import customerRepository from "../user/customerRepository";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface GoogleTokenPayload {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture?: string;
  sub: string;
}

interface MyPayload {
  sub: string;
}

interface ResetPasswordPayload {
  sub: string;
  purpose: "reset-password";
}

const SALT_ROUNDS = 10;

const login: RequestHandler = async (req, res, next) => {
  try {
    const { mail, password } = req.body ?? {};

    if (!mail || !password) {
      res.status(400).json({ error: "Mail and password are required" });
      return;
    }

    const customer = await customerRepository.readByEmailWithPassword(mail);

    if (!customer) {
      res.status(422).json({ error: "Invalid credentials" });
      return;
    }

    const verified = await bcrypt.compare(password, customer.password);

    if (!verified) {
      res.status(422).json({ error: "Invalid credentials" });
      return;
    }

    const { password: _password, ...customerWithoutPassword } = customer;

    const payload: MyPayload = {
      sub: customer.customer_id.toString(),
    };

    const token = jwt.sign(payload, process.env.APP_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.json({
      token,
      user: customerWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
};

const getSession: RequestHandler = async (req, res, next) => {
  try {
    const customerId = Number(req.auth.sub);
    const customer = await customerRepository.read(customerId);

    if (!customer) {
      res.sendStatus(404);
      return;
    }

    const { password: _password, ...customerWithoutPassword } = customer;
    res.json({ user: customerWithoutPassword });
  } catch (err) {
    next(err);
  }
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      res.status(400).json({ error: "Password is required" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    req.body.hashed_password = hashedPassword;
    // biome-ignore lint/performance/noDelete: <explanation>
    delete req.body.password;

    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const cookieToken = req.cookies?.auth_token;
    const authorizationHeader = req.get("Authorization");
    const headerToken = authorizationHeader?.startsWith("Bearer ")
      ? authorizationHeader.slice("Bearer ".length)
      : undefined;
    const token = cookieToken ?? headerToken;

    if (!token) {
      res.sendStatus(401);
      return;
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload;

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const forgotPassword: RequestHandler = async (req, res, next) => {
  try {
    const { mail } = req.body ?? {};

    if (!mail) {
      res.status(400).json({ error: "Mail is required" });
      return;
    }

    const customer = await customerRepository.readByEmailWithPassword(mail);
    // Réponse générique pour la sécurité
    if (!customer) {
      res.json({
        message: "Si un compte existe, un email a été envoyé",
      });
      return;
    }

    const resetPayload: ResetPasswordPayload = {
      sub: customer.customer_id.toString(),
      purpose: "reset-password",
    };

    const resetToken = jwt.sign(
      resetPayload,
      process.env.APP_SECRET as string,
      { expiresIn: "15m" },
    );

    const resetLink = `${process.env.FRONT_URL}/reset-password?token=${resetToken}`;

    await sendResetEmail(mail, resetLink);

    res.json({
      message: "Si un compte existe, un email a été envoyé",
    });
  } catch (err) {
    next(err);
  }
};

const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { token, password } = req.body ?? {};

    if (!token || !password) {
      res.status(400).json({ error: "Token et mot de passe requis" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.APP_SECRET as string,
    ) as ResetPasswordPayload;

    if (decoded.purpose !== "reset-password") {
      res.status(401).json({ error: "Token invalide" });
      return;
    }

    const customerId = Number(decoded.sub);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await customerRepository.update({
      customer_id: customerId,
      password: hashedPassword,
    });

    res.json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (err) {
    res.status(401).json({ error: "Token invalide ou expiré" });
  }
};

// CONNEXION GOOGLE
const googleLogin: RequestHandler = async (req, res, next) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      res.status(400).json({ error: "Google credential is required" });
      return;
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      console.error("GOOGLE_CLIENT_ID not found in environment variables");
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    console.log("Verifying Google token...");

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      res.status(401).json({ error: "Invalid Google token" });
      return;
    }

    // Chercher si l'utilisateur existe déjà
    let customer = await customerRepository.readByEmailWithPassword(
      payload.email,
    );

    // Si l'utilisateur n'existe pas, le créer
    if (!customer) {
      console.log("Creating new user from Google account");
      const newCustomer = {
        firstname:
          payload.given_name || payload.name?.split(" ")[0] || "Utilisateur",
        lastname:
          payload.family_name ||
          payload.name?.split(" ").slice(1).join(" ") ||
          "Google",
        mail: payload.email,
        password: await bcrypt.hash(payload.sub, SALT_ROUNDS),
        role: 0 as const,
        birthday: null, // Valeur par défaut au lieu de null
        adress: "", // Valeur par défaut au lieu de null
        postal_code: "", // Valeur par défaut au lieu de null
        country: "", // Valeur par défaut au lieu de null
        phone: "", // Valeur par défaut au lieu de null
        created_at: new Date(),
        updated_at: new Date(),
      };

      const insertId = await customerRepository.create(newCustomer);
      customer = await customerRepository.readByEmailWithPassword(
        payload.email,
      );
    }

    if (!customer) {
      res.status(500).json({ error: "Failed to create or retrieve user" });
      return;
    }

    const { password: _password, ...customerWithoutPassword } = customer;

    const jwtPayload: MyPayload = {
      sub: customer.customer_id.toString(),
    };

    const token = jwt.sign(jwtPayload, process.env.APP_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    console.log("Google login successful for:", payload.email);

    res.json({
      token,
      user: customerWithoutPassword,
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({
      error: "Authentication failed",
      details: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

const logout: RequestHandler = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ message: "Déconnecté avec succès" });
};

export default {
  login,
  getSession,
  hashPassword,
  verifyToken,
  forgotPassword,
  resetPassword,
  googleLogin,
  logout, 
};



