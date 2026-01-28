import { useEffect, useState, useRef } from "react";

export type CartItem = {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
};

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitialMount = useRef(true);

  // Charger depuis localStorage au montage
  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        // Convertir les prix en nombres
        const normalizedItems = parsedItems.map((item: CartItem) => ({
          ...item,
          price:
            typeof item.price === "string"
              ? Number.parseFloat(item.price)
              : item.price,
        }));
        setItems(normalizedItems);
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error);
        setItems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder dans localStorage chaque fois que les items changent
  useEffect(() => {
    // Ne pas sauvegarder au premier render (on vient de charger depuis localStorage)
    console.log("coucou");
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isLoaded) {
      console.log("items for useEffect", items);
      const jsonString = JSON.stringify(items);
      localStorage.setItem("cart", jsonString);
      console.log("💾 localStorage mis à jour:", jsonString);
    }
  }, [items, isLoaded]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.product_id === item.product_id,
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.product_id === item.product_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    console.log("🗑️ removeFromCart appelé avec productId:", productId);
    setItems((prevItems) => {
      console.log("📦 Items AVANT suppression:", prevItems);
      const newItems = prevItems.filter(
        (item) => item.product_id !== productId,
      );
      console.log("📦 Items APRÈS suppression:", newItems);
      return newItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    isLoaded,
  };
};
