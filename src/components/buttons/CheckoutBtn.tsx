"use client";

import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Button from "./Button";

const CheckoutBtn = () => {
  return (
    <Button onClick={() => {}} color="secondary" className="p-2">
      <AiOutlineShoppingCart className="text-xl" />
    </Button>
  );
};

export default CheckoutBtn;
