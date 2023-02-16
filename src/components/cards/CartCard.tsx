"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import cn from "../../helpers/cn";
import { displayNumbers } from "../../helpers/numbers";
import { useCartContext } from "../../providers/CartContextProvider";
import { CartItem } from "../../types/types";
import Button from "../buttons/Button";

export interface CartCardProps {
  item: CartItem;
  price: number;
  disableAction?: boolean;
}

interface Props extends CartCardProps {
  index: number;
}
const CartCard = ({ item, price, index, disableAction = false }: Props) => {
  const { cartItems, setCartItems } = useCartContext();
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemove = () => {
    setIsDeleting(true);
    setCartItems([...cartItems.filter((_, idx) => idx !== index)]);
    setTimeout(() => {
      setIsDeleting(false);
      toast.success("Item successfully removed!");
    }, 200);
  };

  return (
    <div className="p-4 border border-zinc-300 bg-gradient-to-tl from-slate-200 grid sm:grid-cols-4 grid-cols-3 mt-2 gap-2">
      <div className="col-span-1">
        <Image
          src={item.image}
          alt={item.id}
          width={150}
          height={150}
          className="w-auto h-auto"
        />
      </div>
      <div className="sm:col-span-3 col-span-2">
        <p
          onClick={() => !disableAction && router.push(`/products/${item.id}`)}
          className={cn(
            "sm:text-lg text-[16px] font-black ease-in duration-75",
            !disableAction &&
              "hover:underline hover:text-red-800 cursor-pointer"
          )}
        >
          {item.name}
        </p>
        <p className="text-[14px] font-medium">US M{item.size}</p>
        <p className="text-md font-bold text-red-800">
          ${displayNumbers(price)}
        </p>
        {!disableAction && (
          <div className="flex justify-end">
            <Button
              onClick={() => handleRemove()}
              isLoading={isDeleting}
              color="red"
              className="py-2 px-6"
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartCard;
