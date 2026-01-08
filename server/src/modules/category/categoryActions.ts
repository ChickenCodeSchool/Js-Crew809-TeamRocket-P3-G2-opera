import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

export const browse: RequestHandler = async (req, res) => {
  const categories = await categoryRepository.findAll();
  res.json(categories);
};

export const browseByBrand: RequestHandler = async (req, res) => {
  const brandId = Number(req.params.brandId);
  const categories = await categoryRepository.findByBrand(brandId);
  res.json(categories);
};

export const readProducts: RequestHandler = async (req, res) => {
  const categoryId = Number(req.params.id);
  const products = await categoryRepository.findProductsByCategory(categoryId);
  res.json(products);
};

export const browseProductsByBrandAndCategory: RequestHandler = async (
  req,
  res,
) => {
  const brandId = Number(req.params.brandId);
  const categoryId = Number(req.params.categoryId);
  const products = await categoryRepository.findProductsByBrandAndCategory(
    brandId,
    categoryId,
  );
  res.json(products);
};

export default {
  browse,
  browseByBrand,
  readProducts,
  browseProductsByBrandAndCategory,
};
