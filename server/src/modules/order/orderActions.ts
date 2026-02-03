import type { Request, Response } from "express";
import orderRepository from "./orderRepository";

const browse = async (req: Request, res: Response) => {
  try {
    const customerId = Number(req.query.customerId);
    if (!customerId) {
      res.status(400).json({ error: "Customer ID manquant" });
      return;
    }
    const orders = await orderRepository.readByCustomerId(customerId);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
const readByCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = Number(req.params.id); // On récupère l'id depuis /api/orders/customer/:id
    const orders = await orderRepository.readByCustomerId(customerId);

    // Même si la liste est vide ([]), on renvoie 200 avec le tableau vide
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.id);
    const order = await orderRepository.read(orderId);
    if (order) {
      res.json(order);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export default { browse, read, readByCustomer };
