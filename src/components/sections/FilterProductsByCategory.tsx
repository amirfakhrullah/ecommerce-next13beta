import { Category } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import db from "../../lib/prismadb";
import { ProductClient } from "../../types/types";
import Border from "../Border";
import ProductCard from "../cards/ProductCard";

interface FilterProductsByCategoryProps {
  products: ProductClient[];
}

const FilterProductsByCategory = async ({
  products,
}: FilterProductsByCategoryProps) => {
  return (
    <>
      <Border />
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <div className="mx-auto max-w-6xl w-full grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-1">
          {products.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterProductsByCategory;
