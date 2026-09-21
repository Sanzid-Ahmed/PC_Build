import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  // =====================================================
  // LOAD CART FROM LOCAL STORAGE
  // =====================================================

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("thriftbuild-cart");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      return parsedCart.map((item) => ({
        ...item,
        selected:
          typeof item.selected === "boolean"
            ? item.selected
            : true,
      }));
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  // =====================================================
  // SAVE CART TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "thriftbuild-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingProduct = currentItems.find(
        (item) => item.id === product.id
      );

      // -----------------------------------------------
      // PRODUCT ALREADY EXISTS
      // -----------------------------------------------

      if (existingProduct) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,

                // Keep the existing selection state
                selected:
                  typeof item.selected === "boolean"
                    ? item.selected
                    : true,
              }
            : item
        );
      }

      // -----------------------------------------------
      // NEW PRODUCT
      // -----------------------------------------------

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,

          // Respect selected value if provided.
          // BuildResult sends false.
          // Normal product pages without selected
          // will automatically become true.
          selected:
            typeof product.selected === "boolean"
              ? product.selected
              : true,
        },
      ];
    });
  };

  // =====================================================
  // REMOVE FROM CART
  // =====================================================

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

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

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

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

  // =====================================================
  // TOGGLE PRODUCT SELECTION
  // =====================================================

  const toggleSelection = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              selected: !item.selected,
            }
          : item
      )
    );
  };

  // =====================================================
  // SELECT ALL
  // =====================================================

  const selectAll = () => {
    setCartItems((currentItems) =>
      currentItems.map((item) => ({
        ...item,
        selected: true,
      }))
    );
  };

  // =====================================================
  // DESELECT ALL
  // =====================================================

  const deselectAll = () => {
    setCartItems((currentItems) =>
      currentItems.map((item) => ({
        ...item,
        selected: false,
      }))
    );
  };

  // =====================================================
  // CLEAR CART
  // =====================================================

  const clearCart = () => {
    setCartItems([]);
  };

  // =====================================================
  // TOTAL ITEMS IN CART
  // =====================================================

  const cartItemCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

  // =====================================================
  // SELECTED ITEMS
  // =====================================================

  const selectedItems = useMemo(() => {
    return cartItems.filter(
      (item) => item.selected === true
    );
  }, [cartItems]);

  // =====================================================
  // SELECTED ITEM COUNT
  // =====================================================

  const selectedItemCount = useMemo(() => {
    return selectedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [selectedItems]);

  // =====================================================
  // CART TOTAL
  // =====================================================

  const cartTotal = useMemo(() => {
    return selectedItems.reduce(
      (total, item) =>
        total +
        (Number(item.numericPrice) ||
          Number(item.price) ||
          0) *
          item.quantity,
      0
    );
  }, [selectedItems]);

  // =====================================================
  // CHECK WHETHER ALL ITEMS ARE SELECTED
  // =====================================================

  const allSelected = useMemo(() => {
    if (cartItems.length === 0) {
      return false;
    }

    return cartItems.every(
      (item) => item.selected === true
    );
  }, [cartItems]);

  // =====================================================
  // CONTEXT VALUE
  // =====================================================

  const value = {
    cartItems,

    // Cart actions
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,

    // Selection actions
    toggleSelection,
    selectAll,
    deselectAll,

    // Cart information
    cartItemCount,
    selectedItems,
    selectedItemCount,
    cartTotal,
    allSelected,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;