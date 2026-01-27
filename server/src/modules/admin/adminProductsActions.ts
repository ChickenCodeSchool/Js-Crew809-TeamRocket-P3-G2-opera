import type { RequestHandler } from "express";
import adminProductsRepository from "./adminProductsRepository";

export const browse: RequestHandler = async (req, res) => {
  const filters = {
    search: req.query.search as string | undefined,
    brandId: req.query.brandId ? Number(req.query.brandId) : undefined,
    categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined,
  };

  const products = await adminProductsRepository.findAllWithDetails(filters);
  res.json(products);
};

export const getBrands: RequestHandler = async (req, res) => {
  const brands = await adminProductsRepository.findAllBrands();
  res.json(brands);
};

export const getCategories: RequestHandler = async (req, res) => {
  const categories = await adminProductsRepository.findAllCategories();
  res.json(categories);
};

export const update: RequestHandler = async (req, res) => {
  const productId = Number(req.params.id);
  const data = req.body;

  const result = await adminProductsRepository.update(productId, data);

  if (result) {
    res.json({ success: true, message: "Produit mis à jour" });
  } else {
    res.status(400).json({ success: false, message: "Aucune modification" });
  }
};
export const remove: RequestHandler = async (req, res) => {
  const productId = Number(req.params.id);

  const result = await adminProductsRepository.delete(productId);

  if (result) {
    res.json({ success: true, message: "Produit supprimé" });
  } else {
    res.status(400).json({ success: false, message: "Erreur suppression" });
  }
};

export default {
  browse,
  getBrands,
  getCategories,
  update,
  remove,
};
