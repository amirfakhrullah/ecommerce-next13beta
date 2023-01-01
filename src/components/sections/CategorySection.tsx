import React from "react";
import db from "../../lib/prismadb";
import Border from "../Border";
import { CategoryCard } from "../CategoryCard";

const fetchAllCategories = async () => db.category.findMany();

const CategorySection = async () => {
  const categories = await fetchAllCategories();

  return (
    <>
      <Border />
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <h2 className="mx-auto max-w-6xl text-2xl font-black mb-4">
          Filter by categories 🚀
        </h2>
        <div className="mx-auto max-w-6xl w-full grid sm:grid-cols-2  grid-cols-1 gap-2">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategorySection;
