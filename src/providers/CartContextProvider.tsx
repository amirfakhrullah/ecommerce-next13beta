"use client";

import React, { createContext, useContext, useState } from "react";
import { cartsSchema } from "../helpers/validations/cartItemSchema";
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

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("carts", []);

  const parsedCartItems = (cartItems: CartItem[]) => {
    try {
      return cartsSchema.parse(cartItems);
    } catch (_) {
      setCartItems([]);
      return [];
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: parsedCartItems(cartItems),
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
