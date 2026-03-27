"use client";

import { createContext, useContext, useState } from "react";

export const CartItems = createContext({
  cartItems: [],
  setCartItems: () => {},
});

export const CartItemsProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");

  return (
    <CartItems.Provider
      value={{
        cartItems,
        setCartItems,
        isOpen,
        setIsOpen,
        orderMessage,
        setOrderMessage,
      }}
    >
      {children}
    </CartItems.Provider>
  );
};

export const useCartItems = () => useContext(CartItems);
