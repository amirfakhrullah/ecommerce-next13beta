"use client";

import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import { useContext, useState } from "react";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../contextProviders/cartContextProviders";
import Button from "./buttons/Button";
import SeeAllButton from "./buttons/SeeAllButton";
import { IoArrowForwardOutline } from "react-icons/io5";
import cn from "../helpers/cn";
import { useRouter } from "next/navigation";

const CheckoutBtn = () => {
  const router = useRouter();
  const { cartItems, setCartItems } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = (idx: number) => {
    if (idx < 0 || idx >= cartItems.length) return;
    setIsLoading(true);
    setCartItems([...cartItems.filter((_, index) => index !== idx)]);
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <div className="flex flex-row items-center justify-center cursor-pointer border border-zinc-400 text-zinc-500 hover:border-zinc-700 hover:text-zinc-800 ease-in duration-100 p-2 rounded-md">
          <AiOutlineShoppingCart className="text-xl mr-1" />
        </div>
      </MenuHandler>
      <MenuList
        className={cn(
          "rounded-md bg-zinc-100 p-3 shadow-md mb-2 max-h-[500px] overflow-y-auto",
          cartItems.length && "max-w-[500px] w-full"
        )}
      >
        {cartItems.length ? (
          <div className="flex flex-row items-center justify-between gap-1 pb-4 mb-4 border-b border-zinc-300">
            <h3 className="text-xl font-black pl-2">
              Total ({cartItems.length})
            </h3>
            <div
              className="cursor-pointer flex flex-row items-center justify-center py-2 px-6 border rounded-md border-zinc-300 text-zinc-500 hover:bg-zinc-200 ease-in duration-100"
              onClick={() => router.push("/carts")}
            >
              <p className="text-[14px]">Checkout</p>
              <IoArrowForwardOutline className="text-lg ml-2" />
            </div>
          </div>
        ) : (
          <div className="p-3">
            <p className="text-[14px] text-center">Cart is empty.</p>
          </div>
        )}
        {cartItems.map((item, idx) => (
          <div
            key={`cartItem__${item.id}__${idx}`}
            className="grid grid-cols-5 gap-2 border-b border-zinc-300 pb-3 mb-2 last:border-0 last:pb-0 last:mb-0"
          >
            <div className="col-span-2">
              <Image
                src={item.image}
                alt={item.id + idx}
                width={200}
                height={200}
                className="w-auto h-auto"
              />
            </div>
            <div className="col-span-3 flex flex-col justify-between p-1">
              <div>
                <p className="text-[14px]">{item.name}</p>
                <p className="text-[14px] font-medium">US M{item.size}</p>
              </div>
              <Button
                onClick={() => handleRemove(idx)}
                isLoading={isLoading}
                color="secondary"
                className="py-1 w-full"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CheckoutBtn;
