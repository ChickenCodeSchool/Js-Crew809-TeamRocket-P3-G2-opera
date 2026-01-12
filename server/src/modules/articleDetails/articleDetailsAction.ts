import type { RequestHandler } from "express";
import articleDetailsRepository from "./articleDetailsRepository";

const readArticleDetails: RequestHandler = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (Number.isNaN(productId)) {
      res.status(400).json({ message: "Invalid productId" });
      return;
    }
    console.log("ProductId reçu :", productId);
    const Details = await articleDetailsRepository.get(productId);
    res.json(Details);
  } catch (err) {
    next(err);
  }
};

export default { readArticleDetails };
