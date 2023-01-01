"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { displayNumbers } from "../../helpers/numbers";
import { FullProductClient } from "../../types/types";

const ProductCard = ({
  id,
  name,
  image,
  price,
  _count: { orderItems: totalOrdered },
}: FullProductClient) => {
  const router = useRouter();

  return (
    <div className="p-2 border border-zinc-300 flex flex-col" onClick={() => router.push(`/products/${id}`)}>
      <div className="mb-4 flex flex-row items-center justify-center h-32">
        <Image src={image} alt={id} width={200} height={200} />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <p className="text-sm cursor-pointer hover:underline">{name}</p>
        <div className="text-end mt-2">
          <p className="text-zinc-500 text-sm">{displayNumbers(totalOrdered)} sold</p>
          <p className="font-medium">${displayNumbers(price)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
