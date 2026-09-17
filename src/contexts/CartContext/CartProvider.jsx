import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("thriftbuild-cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  // =========================
  // SAVE CART TO LOCAL STORAGE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "thriftbuild-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingProduct = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // =========================
  // CLEAR CART
  // =========================

  const clearCart = () => {
    setCartItems([]);
  };

  // =========================
  // TOTAL ITEMS
  // =========================

  const cartItemCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

  // =========================
  // TOTAL PRICE
  // =========================

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total +
        (Number(item.numericPrice) ||
          Number(item.price) ||
          0) *
          item.quantity,
      0
    );
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartItemCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;