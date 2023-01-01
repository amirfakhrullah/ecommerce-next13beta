"use client";

import { Category } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const CategoryCard = ({ id, name, image }: Category) => {
  const router = useRouter();

  return (
    <div
      className="group cursor-pointer sm:p-5 p-2 border border-zinc-300 hover:border-red-800 ease-in duration-150 overflow-hidden"
      onClick={() => router.push(`/categories/${id}`)}
    >
      <div className="mb-10 flex flex-row items-center justify-center">
        <Image
          src={image}
          alt={id}
          width={300}
          height={300}
        />
      </div>
      <h3 className="text-2xl font-black text-center group-hover:text-red-800">Nike {name}</h3>
    </div>
  );
};
