import type { RequestHandler } from "express";
import articleDetailsRepository from "./articleDetailsRepository";

const readArticleDetails: RequestHandler = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);

    if (Number.isNaN(productId)) {
      res.status(400).json({ message: "Invalid productId" });
      return;
    }

    const details = await articleDetailsRepository.get(productId);
    res.json(details);
  } catch (err) {
    next(err);
  }
};

const createArticle: RequestHandler = async (req, res, next) => {
  try {
    const { name, description, brand_id, price, color, gender, category_id } =
      req.body;

    if (!name || !brand_id || !price || !category_id) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const productId = await articleDetailsRepository.createproduct({
      name,
      description,
      brand_id: Number(brand_id),
      price: Number(price),
      color,
      gender,
      category_id: Number(category_id),
    });

    res.status(201).json({ product_id: productId });
  } catch (err) {
    next(err);
  }
};

export default { readArticleDetails, createArticle };
