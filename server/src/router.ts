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
router.get("/brands/:brandId/bookmark-cards", bookmarkcardActions.readBookmark);

import carouselLpActions from "./modules/carouselLp/carouselLpActions";
router.get("/api/carouselLp", carouselLpActions.browse);

// Catégories
import categoryActions from "./modules/category/categoryActions";
router.get("/api/categories", categoryActions.browse);
router.get("/api/categories/:id/products", categoryActions.readProducts);

router.get("/api/brands/:brandId/categories", categoryActions.browseByBrand);

router.get(
  "/api/brands/:brandId/categories/:categoryId/products",
  categoryActions.browseProductsByBrandAndCategory,
);
import miniHeroCategorieActions from "./modules/miniHeroCategorie/miniHeroCategorieActions";
router.get(
  "/brands/:brandId/mini-hero-categories",
  miniHeroCategorieActions.read,
);
import brandDescriptionActions from "./modules/brandDescription/brandDescriptionActions";
router.get("/api/brands/:id", brandDescriptionActions.read);

import filterBarActions from "./modules/filterbar/filterBarActions";
router.get("/api/products/filter", filterBarActions.browse);
router.get("/api/filter/categories", filterBarActions.getCategories);
router.get("/api/filter/brands", filterBarActions.getBrands);
router.get("/api/sizes", filterBarActions.getSizes);

export default router;
