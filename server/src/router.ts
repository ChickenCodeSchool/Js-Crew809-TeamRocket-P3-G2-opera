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

import brandActions from "./modules/brand/brandActions";
router.get("/brands/:brandId/hero", brandActions.readHero);


/*
// ici toutes les routes sur le système d'authentification (à vérifier, si possibilité d'enlever mes authActions dans l'api)
import authActions from "./modules/auth/authActions";
import customerActions from "./modules/user/customerActions";

router.post("/auth/login", authActions.login);
router.get("/customers", authActions.verifyToken, customerActions.browse);
router.get("/customers/:id", authActions.verifyToken, customerActions.read);
router.post("/customers", authActions.hashPassword, authActions.verifyToken, customerActions.add);
router.put("/customers/:id", authActions.hashPassword, authActions.verifyToken, customerActions.update);
router.delete("/customers/:id", authActions.verifyToken, customerActions.remove);
router.use(authActions.verifyToken);
*/

export default router;
