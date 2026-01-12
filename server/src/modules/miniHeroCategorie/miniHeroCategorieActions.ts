import type { NextFunction, Request, Response } from "express";
import miniHeroRepository from "./miniHeroCategorieRepository";

const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brandId = Number(req.params.brandId);

    const brand = await miniHeroRepository.get(brandId);

    if (brand === null) {
      res.status(404).json();
      return;
    }
    res.json(brand);
  } catch (err) {
    next(err);
  }
};

export default { read };
