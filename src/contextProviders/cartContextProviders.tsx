"use client";

import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { CartItem } from "../types/types";

interface CartContextValues {
  cartItems: CartItem[];
  setCartItems: (cartItems: CartItem[]) => void;
}
export const CartContext = createContext<CartContextValues>({
  cartItems: [],
  setCartItems: () => {},
});

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("carts", []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
