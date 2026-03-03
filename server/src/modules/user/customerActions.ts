import type { RequestHandler } from "express";
import databaseClient from "../../../database/client";
import { sendWelcomeEmail } from "../../../utils/emailwelcome";
import customerRepository from "./customerRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const customers = await customerRepository.readAll();
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const customer = await customerRepository.read(id);
    if (!customer) {
      res.sendStatus(404);
      return;
    }
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCustomer = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mail: req.body.hashed_mail ?? req.body.mail,
      password: req.body.hashed_password,
      role: req.body.role ?? 0,
      birthday: req.body.birthday || null,
      adress: req.body.adress || null,
      postal_code: req.body.postal_code || null,
      country: req.body.country || null,
      phone: req.body.phone || null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const insertId = await customerRepository.create(newCustomer);
    const customer = await customerRepository.read(insertId);

    // Envoi du mail de bienvenue
    // On utilise req.body.mail (email non-hashé) pour l'envoi
    if (req.body.mail) {
      try {
        await sendWelcomeEmail({
          to: req.body.mail,
          firstname: newCustomer.firstname,
        });
        console.log(`✅ Email de bienvenue envoyé à ${req.body.mail}`);
      } catch (emailError) {
        // Log l'erreur mais ne bloque pas la création du compte
        console.error(
          "❌ Erreur lors de l'envoi de l'email de bienvenue:",
          emailError,
        );
        // Le compte est créé même si l'email échoue
      }
    }

    res.status(201).json({ user: customer });
  } catch (err) {
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const customerId = Number(req.params.id);
    const updatedData = {
      ...req.body,
      customer_id: customerId,
      updated_at: new Date(),
    };
    const affectedRows = await customerRepository.update(updatedData);
    if (affectedRows === 0) {
      res.sendStatus(404);
      return;
    }
    res.json({ affectedRows });
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  const customerId = Number(req.params.id);

  try {
    const [carts] = await databaseClient.query(
      "SELECT cart_id FROM cart WHERE customer_id = ?",
      [customerId],
    );

    for (const cart of carts as { cart_id: number }[]) {
      await databaseClient.query("DELETE FROM cart_item WHERE cart_id = ?", [
        cart.cart_id,
      ]);
    }

    await databaseClient.query("DELETE FROM cart WHERE customer_id = ?", [
      customerId,
    ]);

    const [orders] = await databaseClient.query(
      "SELECT order_id FROM `order` WHERE customer_id = ?",
      [customerId],
    );

    for (const order of orders as { order_id: number }[]) {
      await databaseClient.query("DELETE FROM order_item WHERE order_id = ?", [
        order.order_id,
      ]);
    }

    await databaseClient.query("DELETE FROM `order` WHERE customer_id = ?", [
      customerId,
    ]);

    const affectedRows = await customerRepository.delete(customerId);
    if (affectedRows === 0) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({ message: "Compte supprimé avec succès" });
  } catch (err) {
    console.error("Erreur DELETE customer:", err);
    res.status(500).json({ message: "Erreur serveur lors de la suppression" });
  }
};

export default { browse, read, add, update, remove };
