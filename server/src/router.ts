import express from "express";
import { upload } from "../middlewares/upload";

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

import articleDetailsActions from "./modules/articleDetails/articleDetailsAction";
router.get("/products/:productId", articleDetailsActions.readArticleDetails);
router.post("/api/products", articleDetailsActions.createArticle);

import productImageActions from "./modules/productImage/productImageActions";
router.post(
  "/products/:productId/images",
  upload.array("images", 5),
  productImageActions.addImages,
);

import filterBarActions from "./modules/filterbar/filterBarActions";
router.get("/api/products/filter", filterBarActions.browse);
router.get("/api/filter/categories", filterBarActions.getCategories);
router.get("/api/filter/brands", filterBarActions.getBrands);
router.get("/api/sizes", filterBarActions.getSizes);
router.get("/api/filter/colors", filterBarActions.getColors);

import brandActions from "./modules/brand/brandActions";
router.get("/brands/:brandId/hero", brandActions.readHero);
router.get("/brands", brandActions.readAllBrands);

import authActions from "./modules/auth/authActions";
router.post("/auth/login", authActions.login);
router.get("/auth/session", authActions.verifyToken, authActions.getSession);
router.post("/auth/logout", authActions.logout);

router.post("/auth/forgot-password", authActions.forgotPassword);
router.post("/auth/reset-password", authActions.resetPassword);

import customerActions from "./modules/user/customerActions";

router.post("/customers", authActions.hashPassword, customerActions.add);
router.get("/customers", customerActions.browse);
router.get("/customers/:id", customerActions.read);
router.put(
  "/customers/:id",
  /*authActions.hashPassword,*/ customerActions.update,
);
router.put("/customers/:id", customerActions.update);
router.delete(
  "/customers/:id",
  authActions.verifyToken,
  customerActions.remove,
);

import adminProductsActions from "./modules/admin/adminProductsActions";

router.get("/api/admin/products", adminProductsActions.browse);
router.get("/api/admin/brands", adminProductsActions.getBrands);
router.get("/api/admin/categories", adminProductsActions.getCategories);
router.put("/api/admin/products/:id", adminProductsActions.update);
router.delete("/api/admin/products/:id", adminProductsActions.remove);
router.delete("/api/admin/products/:id", adminProductsActions.remove);

import orderActions from "./modules/order/orderActions";

router.get("/api/orders", orderActions.browse);
router.get("/api/orders/:id", orderActions.read);

import adminOrderActions from "./modules/orderDeliveryAdmin/adminOrderActions";

router.get("/api/admin/orders", adminOrderActions.browse);
router.delete("/api/admin/orders/:id", adminOrderActions.destroy);
router.put("/api/admin/orders/:id", adminOrderActions.edit);
router.delete(
  "/api/admin/orders/:id/items/:productId",
  adminOrderActions.removeItem,
);

import stripeActions from "./modules/Stripe/stripeAction";
router.post(
  "/api/stripe/create-checkout-session",
  stripeActions.createCheckoutSession,

  router.post("/api/stripe/verify-payment", stripeActions.verifyPayment),
);

import * as dashboardActions from "./modules/dashboard/dashboardActions";
router.get("/api/dashboard/revenue", dashboardActions.revenuePerMonth);
router.get("/api/dashboard/top-products", dashboardActions.topProducts);
router.get("/api/dashboard/items-per-day", dashboardActions.itemsPerDay);
router.get(
  "/api/dashboard/customers-per-day",
  dashboardActions.customersPerDay,
);
import cartActions from "./modules/cart/cartActions";
router.post("/api/cartitem", cartActions.addNewCartItem);
router.post("/cartitem", cartActions.addNewCartItem);
router.get("/api/cart/:customerId", cartActions.getCart);
router.put("/api/cartitem/:cartItemId", cartActions.updateCartItem);
router.delete("/api/cartitem/:cartItemId", cartActions.removeCartItem);
router.post("/api/cart/sync", cartActions.syncCart);
router.delete("/api/cart/:customerId/clear", cartActions.clearCart);

//ROUTE CONNEXION GOOGLE
router.post("/auth/google", authActions.googleLogin);

export default router;
