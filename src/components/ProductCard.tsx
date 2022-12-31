"use client";

import { Product, Category } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface ProductCardProps extends Product {
  category: Category;
  _count: {
    orders: number;
  };
}

const ProductCard = ({
  id,
  name,
  price,
  _count: { orders: totalOrdered },
}: ProductCardProps) => {
  return (
    <div className="p-2 border border-zinc-300 overflow-hidden">
      <div className="mb-4 flex flex-row items-center justify-center">
        <Image src="/images/thumbnail.png" alt={id} width={100} height={100} />
      </div>
      <p className="text-sm cursor-pointer hover:underline">{name}</p>
      <div className="text-end mt-2">
        <p className="text-zinc-500 text-sm">{totalOrdered} sold</p>
        <p className="font-medium">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
