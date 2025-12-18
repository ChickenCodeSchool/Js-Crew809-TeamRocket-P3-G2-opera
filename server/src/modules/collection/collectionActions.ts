import type { RequestHandler } from "express";
import collectionRepository from "./collectionRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const collections = await collectionRepository.readAll();
    res.json(collections);
  } catch (err) {
    next(err);
  }
};

export default { browse };
