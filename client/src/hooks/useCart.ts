import { useEffect, useRef, useState } from "react";

export type CartItem = {
  product_id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  size_label: string;
  size_id: number;
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

  const addToCart = (item: CartItem) => {
    const normalizedItem = {
      ...item,
      price:
        typeof item.price === "string"
          ? Number.parseFloat(item.price)
          : item.price,
    };
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.product_id === normalizedItem.product_id,
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.product_id === normalizedItem.product_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...prevItems, { ...normalizedItem, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number, sizeId: number) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product_id === productId && item.size_id === sizeId),
      ),
    );
  };

  // Dans useCart.ts

  const updateQuantity = (
    productId: number,
    quantity: number,
    sizeId: number,
  ) => {
    if (quantity <= 0) {
      // TypeScript ne fera plus d'erreur ici si removeFromCart
      // accepte bien deux arguments désormais
      removeFromCart(productId, sizeId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        // On compare le couple Produit + Taille pour mettre à jour la bonne ligne
        item.product_id === productId && item.size_id === sizeId
          ? { ...item, quantity }
          : item,
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
