import type { Request, Response } from "express";
import filterBarRepository from "./filterBarRepository";

const browse = async (req: Request, res: Response) => {
  try {
    const brandId = Number(req.query.brandId);
    const categoryId = req.query.categoryId
      ? Number(req.query.categoryId)
      : undefined;
    const color = req.query.color ? String(req.query.color) : undefined;
    const size = req.query.size ? String(req.query.size) : undefined;

    if (!brandId) {
      res.status(400).json({ error: "Brand ID is required" });
      return;
    }

    const products = await filterBarRepository.readFiltered(
      brandId,
      categoryId,
      color,
      size,
    );
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors du filtrage" });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const brandId = req.query.brandId ? Number(req.query.brandId) : undefined;

    const categories = await filterBarRepository.readAllCategories(brandId);
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération catégories" });
  }
};

const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await filterBarRepository.readAllBrands();
    res.json(brands);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération marques" });
  }
};

const getSizes = async (req: Request, res: Response) => {
  try {
    const brandId = Number(req.query.brandId);
    const categoryId = req.query.categoryId
      ? Number(req.query.categoryId)
      : undefined;

    if (!brandId) {
      res.status(400).json({ error: "Brand ID requise" });
      return;
    }

    const sizes = await filterBarRepository.readSizes(brandId, categoryId);
    res.json(sizes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération tailles" });
  }
};

export default { browse, getCategories, getBrands, getSizes };
