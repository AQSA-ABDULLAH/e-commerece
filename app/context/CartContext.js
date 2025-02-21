"use client";

import React, { createContext, useContext, useState } from "react";

// Create a Context for the cart
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Update quantity if the item already exists
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Add new item
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use the Cart Context
export const useCart = () => useContext(CartContext);

