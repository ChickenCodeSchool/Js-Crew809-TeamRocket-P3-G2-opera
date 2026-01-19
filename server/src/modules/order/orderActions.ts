import type { Request, Response } from "express";
import orderRepository from "./orderRepository";

const browse = async (req: Request, res: Response) => {
  try {
    // Plus tard, cela viendra du token d'authentification (req.user.id)
    const customerId = Number(req.query.customerId);

    if (!customerId) {
      res.status(400).json({ error: "Customer ID is required" });
      return;
    }

    const orders = await orderRepository.readByCustomerId(customerId);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commandes" });
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
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la commande" });
  }
};

export default { browse, read };
