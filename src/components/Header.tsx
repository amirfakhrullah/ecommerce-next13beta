"use client";

import React from "react";
import Button from "./ui/Button";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
  return (
    <div className="sticky top-0 bg-gray-100 sm:mx-3 mx-1 px-2 sm:py-5 py-4 border-b border-zinc-300 flex flex-row items-center justify-between">
      <h1 className="text-2xl font-black">Checks!</h1>
      <Button onClick={() => {}}>
        <AiOutlineShoppingCart className="text-xl" />
      </Button>
    </div>
  );
};

export default Header;
