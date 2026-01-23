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

export default {
  browse,
  getBrands,
  getCategories,
};
