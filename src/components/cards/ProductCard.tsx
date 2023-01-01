import { Product, Category } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface ProductCardProps extends Product {
  category: Category;
  _count: {
    orderItems: number;
  };
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  _count: { orderItems: totalOrdered },
}: ProductCardProps) => {
  return (
    <div className="p-2 border border-zinc-300 flex flex-col">
      <div className="mb-4 flex flex-row items-center justify-center h-32">
        <Image src={image} alt={id} width={200} height={200} />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <p className="text-sm cursor-pointer hover:underline">{name}</p>
        <div className="text-end mt-2">
          <p className="text-zinc-500 text-sm">{totalOrdered} sold</p>
          <p className="font-medium">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
