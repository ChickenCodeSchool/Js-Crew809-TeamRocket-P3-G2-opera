import type { RequestHandler } from "express";
import landingRepository from "./landingRepository";

const browseBackgrounds: RequestHandler = async (req, res, next) => {
  try {
    const backgrounds = await landingRepository.getBackgrounds();
    res.json(backgrounds);
  } catch (err) {
    next(err);
  }
};

export default { browseBackgrounds };
