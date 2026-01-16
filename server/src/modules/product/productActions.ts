import type { RequestHandler } from "express";
import productRepository from "../product/productRepository";

export const read: RequestHandler = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const product = await productRepository.read(productId);
    if (!product) {
      res.sendStatus(404);
      return;
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export default { read };
