// cartActions.ts - VERSION COMPLÈTE
import type { RequestHandler } from "express";
import cartRepository from "./cartRepository";

const addNewCartItem: RequestHandler = async (req, res, next) => {
  try {
    console.log("➕ addNewCartItem appelée");

    const { cart_id, product_id, size_id, quantity, unit_price } = req.body;

    if (!cart_id || !product_id || !size_id || !quantity || !unit_price) {
      res
        .status(400)
        .json({ message: "caractéristiques du panier manquantes" });
      return;
    }

    const existing = await cartRepository.findCartItemByProductAndSize(
      cart_id,
      product_id,
      size_id,
    );

    let cartItemId: number;

    if (existing) {
      console.log("🔄 Item existe déjà, mise à jour quantité");
      await cartRepository.updateCartItemQuantity(
        existing.cart_item_id,
        existing.quantity + quantity,
      );
      cartItemId = existing.cart_item_id;
    } else {
      console.log("➕ Ajout nouvel item");

      cartItemId = await cartRepository.addCartItem({
        cart_id,
        product_id,
        size_id,
        quantity,
        unit_price,
      });
    }

    console.log("✅ cart_item_id:", cartItemId);

    res.status(201).json({
      message: "Article ajouté au panier avec succès",
      cartItemId,
    });
  } catch (error) {
    console.error("❌ Erreur addNewCartItem:", error);
    next(error);
  }
};

const getCart: RequestHandler = async (req, res, next) => {
  try {
    const customerId = Number.parseInt(req.params.customerId);

    if (!customerId) {
      res.status(400).json({ message: "ID client invalide" });
      return;
    }

    const cartId = await cartRepository.findOrCreateCart(customerId);
    const items = await cartRepository.getCartItems(cartId);

    res.json({ cartId, items });
  } catch (error) {
    next(error);
  }
};

const syncCart: RequestHandler = async (req, res, next) => {
  try {
    console.log("🔵 syncCart appelée");
    console.log("📥 Body reçu:", req.body);

    const { customerId, items } = req.body;

    if (!customerId || !Array.isArray(items)) {
      console.log("❌ Données invalides:", { customerId, items });
      res.status(400).json({ message: "Données invalides" });
      return;
    }

    console.log(
      "🔍 Recherche/création du panier pour customer_id:",
      customerId,
    );
    const cartId = await cartRepository.findOrCreateCart(customerId);
    console.log("✅ Cart ID:", cartId);

    // Ajouter chaque item
    for (const item of items) {
      console.log("➕ Traitement item:", item);

      const existing = await cartRepository.findCartItemByProductAndSize(
        cartId,
        item.product_id,
        item.size_id,
      );

      if (existing) {
        console.log("🔄 Item existe déjà, mise à jour quantité");
        await cartRepository.updateCartItemQuantity(
          existing.cart_item_id,
          existing.quantity + item.quantity,
        );
      } else {
        console.log("➕ Ajout nouvel item");
        await cartRepository.addCartItem({
          cart_id: cartId,
          product_id: item.product_id,
          size_id: item.size_id,
          quantity: item.quantity,
          unit_price: item.price,
        });
      }
    }

    const updatedItems = await cartRepository.getCartItems(cartId);
    console.log("✅ Items après sync:", updatedItems);

    res.json({ cartId, items: updatedItems });
  } catch (error) {
    console.error("❌ Erreur dans syncCart:", error);
    next(error);
  }
};

// ✅ Nouvelle action : Mettre à jour la quantité
const updateCartItem: RequestHandler = async (req, res, next) => {
  try {
    const cartItemId = Number.parseInt(req.params.cartItemId);
    const { quantity } = req.body;

    if (!cartItemId || !quantity) {
      res.status(400).json({ message: "Données invalides" });
      return;
    }

    await cartRepository.updateCartItemQuantity(cartItemId, quantity);
    res.json({ message: "Quantité mise à jour" });
  } catch (error) {
    next(error);
  }
};

// ✅ Nouvelle action : Supprimer un item
const removeCartItem: RequestHandler = async (req, res, next) => {
  try {
    const cartItemId = Number.parseInt(req.params.cartItemId);

    console.log("🗑️ removeCartItem appelée avec ID:", cartItemId); // 👀 LOG

    if (!cartItemId || Number.isNaN(cartItemId)) {
      console.log("❌ ID invalide");
      res.status(400).json({ message: "ID invalide" });
      return;
    }

    await cartRepository.removeCartItem(cartItemId);
    console.log("✅ Item supprimé de la DB");

    res.json({ message: "Article supprimé" });
  } catch (error) {
    console.error("❌ Erreur removeCartItem:", error);
    next(error);
  }
};

const cartActions = {
  addNewCartItem,
  getCart,
  syncCart,
  updateCartItem,
  removeCartItem,
};

export default cartActions;
