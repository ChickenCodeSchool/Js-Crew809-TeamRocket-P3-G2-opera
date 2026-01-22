import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import customerRepository from "../user/customerRepository";

interface MyPayload {
  sub: string;
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

    res.json({
      token,
      user: customerWithoutPassword,
    });
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
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader) {
      res.sendStatus(401);
      return;
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer" || !token) {
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

export default { login, hashPassword, verifyToken };
