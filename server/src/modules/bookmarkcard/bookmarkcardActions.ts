import type { RequestHandler } from "express";
import BookmarkRepository from "./bookmarkcardRepository";

const readBookmark: RequestHandler = async (req, res, next) => {
  try {
    const brandId = Number(req.params.brandId);
    if (Number.isNaN(brandId)) {
      res.status(400).json({ message: "Invalid brandId" });
      return;
    }
    console.log("BrandId reçu :", brandId);
    const bookmarkCards = await BookmarkRepository.getBookbrand(brandId);
    res.json(bookmarkCards);
  } catch (err) {
    next(err);
  }
};

export default { readBookmark };
