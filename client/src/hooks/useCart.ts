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

  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    const loadCart = async () => {
      //  NON CONNECTÉE  localStorage
      if (!isAuthenticated) {
        const storedItems = localStorage.getItem("cart");
        if (storedItems) {
          try {
            setItems(JSON.parse(storedItems));
          } catch {
            setItems([]);
          }
        }
      }

      // CONNECTÉE API
      else {
        const res = await fetch("/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setItems(data.items || []);
        }
      }

      setIsLoaded(true);
    };

    loadCart();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isLoaded) return;

    // évite la sauvegarde au premier render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const saveCart = async () => {
      // NON CONNECTÉE → localStorage
      if (!isAuthenticated) {
        localStorage.setItem("cart", JSON.stringify(items));
      }

      // CONNECTÉE → API
      else {
        await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ items }),
        });
      }
    };

    saveCart();
  }, [items, isLoaded, isAuthenticated]);

  const addToCart = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) =>
          cartItem.product_id === item.product_id &&
          cartItem.size_id === item.size_id,
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.product_id === item.product_id &&
          cartItem.size_id === item.size_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number, sizeId: number) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product_id === productId && item.size_id === sizeId),
      ),
    );
  };

  const updateQuantity = (
    productId: number,
    quantity: number,
    sizeId: number,
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, sizeId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
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
