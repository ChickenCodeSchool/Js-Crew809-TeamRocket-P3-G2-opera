import type { Request, Response } from "express";
import adminOrderRepository from "./adminOrderRepository";

const browse = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await adminOrderRepository.readAll();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération des commandes" });
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = Number(req.params.id);

    if (Number.isNaN(orderId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    await adminOrderRepository.delete(orderId);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};

export default { browse, destroy };
