"use client";

import { useContext, useState } from "react";
import { FullProductClient } from "../../../types/types";
import Button from "../../buttons/Button";
import { IoIosAddCircle } from "react-icons/io";
import { CartContext } from "../../../contextProviders/cartContextProviders";

interface ProductCartProps {
  product: FullProductClient;
}

const ProductCart = ({ product }: ProductCartProps) => {
  const { id, name, image, sizes } = product;
  const [size, setSize] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems, setCartItems } = useContext(CartContext);

  const handleAddToCart = () => {
    if (!size) return;
    setIsLoading(true);
    setCartItems([
      ...cartItems,
      {
        id,
        name,
        image,
        size,
      },
    ]);
    setSize(undefined);
    setIsLoading(false);
  };

  return (
    <div className="pt-3">
      <p className="text-[16px]">Select Size:</p>
      <div className="flex flex-row flex-wrap gap-1 pt-2 pb-5">
        {sizes.map((currSize, idx) => (
          <div
            onClick={() => setSize(currSize)}
            key={id + idx}
            className={`cursor-pointer border border-zinc-300 hover:border-zinc-800 hover:text-zinc-800 p-2 ease-in duration-75 ${
              size === currSize ? "bg-zinc-800 text-white" : ""
            }`}
          >
            US M {currSize}
          </div>
        ))}
      </div>

      <Button
        onClick={() => handleAddToCart()}
        isLoading={isLoading}
        loaderOnClick={false}
        color="primary"
        className="py-2 px-4 mb-5"
        disabled={!size}
      >
        <IoIosAddCircle className="text-xl mr-1" />
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCart;
