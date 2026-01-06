import express from "express";

const router = express.Router();

import collectionActions from "./modules/collection/collectionActions";

router.get("/api/collections", collectionActions.browse);

import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import landingActions from "./modules/landing/landingActions";
router.get("/api/landing", landingActions.browseBackgrounds);

import bookmarkcardActions from "./modules/bookmarkcard/bookmarkcardActions";
router.get(
  "/brands/:brandId/bookmark-cards",
  bookmarkcardActions.browseBookmark,
);

import carouselLpActions from "./modules/carouselLp/carouselLpActions";
router.get("/api/carouselLp", carouselLpActions.browse);

export default router;
