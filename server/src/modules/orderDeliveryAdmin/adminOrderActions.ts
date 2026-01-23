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

const edit = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = Number(req.params.id);
    const { created_at, delivery_date, status } = req.body;

    if (Number.isNaN(orderId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    await adminOrderRepository.update(orderId, {
      created_at,
      delivery_date,
      status,
    });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
};

const removeItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = Number(req.params.id);
    const productId = Number(req.params.productId);

    if (Number.isNaN(orderId) || Number.isNaN(productId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    await adminOrderRepository.removeItem(orderId, productId);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur suppression article" });
  }
};

export default { browse, destroy, edit, removeItem };
