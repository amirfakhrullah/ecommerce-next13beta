import { Category } from "@prisma/client";
import Image from "next/image";
import React from "react";

export const CategoryCard = ({ id, name }: Category) => {
  return (
    <div className="cursor-pointer sm:p-5 p-2 border border-zinc-300 hover:border-zinc-500 ease-in duration-150 overflow-hidden">
      <div className="mb-10 flex flex-row items-center justify-center">
        <Image src="/images/thumbnail.png" alt={id} width={300} height={300} />
      </div>
      <h3 className="text-2xl font-black text-center">{name}</h3>
    </div>
  );
};
