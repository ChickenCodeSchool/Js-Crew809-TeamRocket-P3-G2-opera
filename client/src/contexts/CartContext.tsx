import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type CartItem = {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  size_id: number;
  size_label: string;
  cart_item_id?: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: number, sizeId: number) => Promise<void>;
  updateQuantity: (
    productId: number,
    quantity: number,
    sizeId: number,
  ) => Promise<void>;
  getTotal: () => number;
  getItemCount: () => number;
  isLoaded: boolean;
  syncWithDatabase: (customerId: number) => Promise<void>;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// ✅ Ajouter cette fonction AVANT CartProvider
/**
 * Parse en toute sécurité une valeur du localStorage
 * @param key - Clé du localStorage
 * @param defaultValue - Valeur par défaut si parsing échoue
 * @returns La valeur parsée ou la valeur par défaut
 */
const safeParseJSON = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);

    // Vérifier que la valeur existe et n'est pas une chaîne invalide
    if (!item || item === "undefined" || item === "null") {
      return defaultValue;
    }

    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Erreur parsing ${key}:`, error);
    localStorage.removeItem(key); // Nettoyer les données corrompues
    return defaultValue;
  }
};

// ✅ Maintenant le CartProvider
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [cartId, setCartId] = useState<number | null>(null);

  const baseUrl = import.meta.env.VITE_API_URL;

  // Charger le panier au démarrage
  useEffect(() => {
    loadCart();
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const loadCart = async () => {
    try {
      const user = safeParseJSON<{ customer_id: number } | null>("user", null);

      console.log("👤 User récupéré:", user); // 👀 LOG

      if (user?.customer_id) {
        console.log("✅ User connecté, customer_id:", user.customer_id); // 👀 LOG
        setCustomerId(user.customer_id); // ✅ Cette ligne est importante

        try {
          const response = await fetch(
            `${baseUrl}/api/cart/${user.customer_id}`,
          );
          if (response.ok) {
            const data = await response.json();
            console.log("📦 Panier chargé depuis DB:", data); // 👀 LOG
            setCartId(data.cartId);
            setItems(data.items || []);
          } else {
            const localCart = safeParseJSON<CartItem[]>("cart", []);
            setItems(localCart);
          }
        } catch (error) {
          console.error("Erreur chargement panier DB:", error);
          const localCart = safeParseJSON<CartItem[]>("cart", []);
          setItems(localCart);
        }
      } else {
        console.log("⚠️ User non connecté"); // 👀 LOG
        const localCart = safeParseJSON<CartItem[]>("cart", []);
        setItems(localCart);
      }
    } catch (error) {
      console.error("Erreur chargement panier:", error);
      setItems([]);
    } finally {
      setIsLoaded(true);
    }
  };

  const syncWithDatabase = async (customerId: number) => {
    console.log("🔄 syncWithDatabase appelée avec customerId:", customerId);
    console.log("📦 Items à synchroniser:", items);

    try {
      const response = await fetch(`${baseUrl}/api/cart/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: customerId,
          items: items,
        }),
      });

      console.log("📡 Réponse sync:", response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Données sync reçues:", data);

        setCustomerId(customerId);
        setCartId(data.cartId);
        setItems(data.items || []); // ✅ Les items de la DB ont des cart_item_id

        localStorage.removeItem("cart");

        console.log("✅ Items après sync (avec cart_item_id):", data.items);
      } else {
        const errorText = await response.text();
        console.error("❌ Erreur sync:", response.status, errorText);
      }
    } catch (error) {
      console.error("❌ Erreur sync panier:", error);
      throw error;
    }
  };

  const addToCart = async (newItem: CartItem) => {
    console.log("➕ addToCart appelée:", newItem);
    console.log("👤 customerId:", customerId, "🛒 cartId:", cartId);

    const existingIndex = items.findIndex(
      (item) =>
        item.product_id === newItem.product_id &&
        item.size_id === newItem.size_id,
    );

    let updatedItems: CartItem[];

    // Si connecté, envoyer à la DB AVANT de mettre à jour le state
    if (customerId && cartId) {
      try {
        console.log("🔄 Envoi à la DB");

        const response = await fetch(`${baseUrl}/api/cartitem`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cart_id: cartId,
            product_id: newItem.product_id,
            size_id: newItem.size_id,
            quantity: newItem.quantity,
            unit_price: newItem.price,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("✅ Réponse DB:", data);

          // ✅ Récupérer le cart_item_id depuis la DB
          const cartItemId = data.cartItemId;

          if (existingIndex > -1) {
            // Mettre à jour l'item existant avec le cart_item_id
            updatedItems = [...items];
            updatedItems[existingIndex].quantity += newItem.quantity;
            updatedItems[existingIndex].cart_item_id = cartItemId; // ✅ Ajouter l'ID
          } else {
            // Ajouter le nouvel item avec le cart_item_id
            updatedItems = [...items, { ...newItem, cart_item_id: cartItemId }]; // ✅ Ajouter l'ID
          }
        } else {
          console.error("❌ Erreur ajout DB:", await response.text());
          // Fallback : ajouter sans cart_item_id
          if (existingIndex > -1) {
            updatedItems = [...items];
            updatedItems[existingIndex].quantity += newItem.quantity;
          } else {
            updatedItems = [...items, newItem];
          }
        }
      } catch (error) {
        console.error("❌ Erreur ajout DB:", error);
        // Fallback : ajouter sans cart_item_id
        if (existingIndex > -1) {
          updatedItems = [...items];
          updatedItems[existingIndex].quantity += newItem.quantity;
        } else {
          updatedItems = [...items, newItem];
        }
      }
    } else {
      // Pas connecté : ajouter en local seulement
      console.log("⚠️ Pas connecté, ajout en local uniquement");
      if (existingIndex > -1) {
        updatedItems = [...items];
        updatedItems[existingIndex].quantity += newItem.quantity;
      } else {
        updatedItems = [...items, newItem];
      }
    }

    setItems(updatedItems);
    console.log("✅ State mis à jour:", updatedItems);
  };

  const removeFromCart = async (productId: number, sizeId: number) => {
    console.log("🗑️ removeFromCart appelée:", { productId, sizeId });
    console.log("👤 customerId actuel:", customerId); // 👀 LOG IMPORTANT
    console.log("🛒 cartId actuel:", cartId); // 👀 LOG IMPORTANT

    const item = items.find(
      (i) => i.product_id === productId && i.size_id === sizeId,
    );

    console.log("🔍 Item trouvé:", item);

    // Si connecté ET que l'item a un cart_item_id, supprimer de la DB
    if (customerId && item?.cart_item_id) {
      console.log(
        "🔄 Suppression dans la DB, cart_item_id:",
        item.cart_item_id,
      );

      try {
        const response = await fetch(
          `${baseUrl}/api/cartitem/${item.cart_item_id}`,
          {
            method: "DELETE",
          },
        );

        console.log("📡 Réponse suppression DB:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ Erreur suppression DB:", errorText);
        } else {
          console.log("✅ Item supprimé de la DB avec succès");
        }
      } catch (error) {
        console.error("❌ Erreur suppression DB:", error);
      }
    } else {
      console.log("⚠️ Suppression uniquement locale");
      console.log("  - customerId:", customerId);
      console.log("  - item.cart_item_id:", item?.cart_item_id);
    }

    // Toujours supprimer du state local
    setItems(
      items.filter(
        (i) => !(i.product_id === productId && i.size_id === sizeId),
      ),
    );
  };

  const updateQuantity = async (
    productId: number,
    quantity: number,
    sizeId: number,
  ) => {
    console.log("🔄 updateQuantity appelée:", { productId, quantity, sizeId }); // 👀 LOG

    if (quantity < 1) {
      await removeFromCart(productId, sizeId);
      return;
    }

    const item = items.find(
      (i) => i.product_id === productId && i.size_id === sizeId,
    );

    console.log("🔍 Item trouvé pour update:", item); // 👀 LOG

    // Si connecté, mettre à jour la DB
    if (customerId && item?.cart_item_id) {
      console.log("🔄 Mise à jour dans la DB"); // 👀 LOG

      try {
        const response = await fetch(
          `${baseUrl}/api/cartitem/${item.cart_item_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity }),
          },
        );

        console.log("📡 Réponse update DB:", response.status); // 👀 LOG

        if (!response.ok) {
          console.error("❌ Erreur update DB:", await response.text());
        }
      } catch (error) {
        console.error("❌ Erreur update DB:", error);
      }
    }

    // Toujours mettre à jour le state local
    setItems(
      items.map((item) =>
        item.product_id === productId && item.size_id === sizeId
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const getTotal = () => {
    if (!items || !Array.isArray(items)) {
      return 0;
    }
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    if (!items || !Array.isArray(items)) {
      return 0;
    }
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
        getItemCount,
        isLoaded,
        syncWithDatabase,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
};
