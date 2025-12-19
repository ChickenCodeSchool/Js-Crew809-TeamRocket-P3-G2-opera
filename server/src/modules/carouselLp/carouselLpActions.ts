import type { RequestHandler } from "express";
import carouselLpRepository from "./carouselLpRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const carousellandingpicture = await carouselLpRepository.readAll();
    res.json(carousellandingpicture);
  } catch (err) {
    next(err);
  }
};

export default { browse };
