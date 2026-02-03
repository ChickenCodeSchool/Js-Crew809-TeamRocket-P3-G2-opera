import type { Request, Response } from "express";
import filterBarRepository from "./filterBarRepository";

const browse = async (req: Request, res: Response) => {
  try {
    const brandId = req.query.brandId ? Number(req.query.brandId) : undefined;

    const categoryId = req.query.categoryId
      ? Number(req.query.categoryId)
      : undefined;
    const color = req.query.color ? String(req.query.color) : undefined;
    const size = req.query.size ? String(req.query.size) : undefined;
    const priceRange = req.query.priceRange
      ? String(req.query.priceRange)
      : undefined;

    const products = await filterBarRepository.readFiltered(
      brandId,
      categoryId,
      color,
      size,
      priceRange,
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
    const categoryId = req.query.categoryId
      ? Number(req.query.categoryId)
      : undefined;

    const brands = await filterBarRepository.readAllBrands(categoryId);
    res.json(brands);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération marques" });
  }
};

const getSizes = async (req: Request, res: Response) => {
  try {
    const brandId = req.query.brandId ? Number(req.query.brandId) : undefined;
    const categoryId = req.query.categoryId
      ? Number(req.query.categoryId)
      : undefined;

    const sizes = await filterBarRepository.readSizes(brandId, categoryId);
    res.json(sizes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération tailles" });
  }
};

const getColors = async (req: Request, res: Response) => {
  try {
    const brandId = req.query.brandId ? Number(req.query.brandId) : undefined;
    const categoryId = req.query.categoryId
      ? Number(req.query.categoryId)
      : undefined;

    const colors = await filterBarRepository.readColors(brandId, categoryId);
    res.json(colors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur récupération couleurs" });
  }
};

export default { browse, getCategories, getBrands, getSizes, getColors };
