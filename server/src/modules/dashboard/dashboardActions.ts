import type { Request, Response } from "express";
import DashboardRepository from "./dashboardRepository";

const repository = new DashboardRepository();

export async function revenuePerMonth(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const data = await repository.revenuePerMonth();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function topProducts(req: Request, res: Response): Promise<void> {
  try {
    const limit = Number(req.query.limit) || 10;
    const data = await repository.getTopProducts(limit);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function itemsPerDay(req: Request, res: Response): Promise<void> {
  try {
    const data = await repository.itemsPerDay();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function customersPerDay(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const data = await repository.customersPerDay();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
