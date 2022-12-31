import React from "react";
import CheckoutBtn from "./buttons/CheckoutBtn";
import AuthButton from "./buttons/AuthButton";

const Header = () => {
  return (
    <div className="sticky top-0 bg-gray-100 sm:mx-3 mx-1 px-2 sm:py-5 py-4 border-b border-zinc-300 flex flex-row items-center justify-between">
      <h1 className="text-2xl text-red-800 font-black">Checks!</h1>
      <div className="flex flex-row items-center justify-center">
        {/* @ts-expect-error Server Component */}
        <AuthButton />
        <div className="m-1" />
        <CheckoutBtn />
      </div>
    </div>
  );
};

export default Header;
