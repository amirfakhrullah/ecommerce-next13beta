"use client";

import { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../../contextProviders/cartContextProviders";
import Button from "./Button";

const CheckoutBtn = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Button
      onClick={() => {}}
      loaderOnClick={false}
      color="secondary"
      className="p-2"
    >
      <AiOutlineShoppingCart className="text-xl" />
      {cartItems.length}
    </Button>
  );
};

export default CheckoutBtn;
