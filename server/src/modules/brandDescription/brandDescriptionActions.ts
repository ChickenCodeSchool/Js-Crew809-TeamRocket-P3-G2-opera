import type { NextFunction, Request, Response } from "express";
import brandDescriptionRepository from "./brandDescriptionRepository";

const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brandId = Number(req.params.id);

    const brand = await brandDescriptionRepository.read(brandId);

    if (brand == null) {
      res.sendStatus(404);
    } else {
      res.json(brand);
    }
  } catch (err) {
    next(err);
  }
};

export default { read };
