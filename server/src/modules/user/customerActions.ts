import type { RequestHandler } from "express";
import customerRepository from "./customerRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const customer = await customerRepository.readAll();
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const customer = await customerRepository.read(id);
    if (customer == null) {
      res.sendStatus(404);
    } else {
      res.json(customer);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCustomer = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      mail: req.body.mail,
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
    console.log("customer", customer);
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
  try {
    const customerId = Number(req.params.id);
    const affectedRows = await customerRepository.delete(customerId);
    if (affectedRows === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, update, remove };
