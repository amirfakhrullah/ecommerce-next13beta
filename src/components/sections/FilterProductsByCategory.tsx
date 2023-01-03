import { Category } from "@prisma/client";
import { FullProductClient } from "../../types/types";
import Border from "../Border";
import ProductGrids from "../ProductGrids";

interface FilterProductsByCategoryProps {
  category: Category;
  products: FullProductClient[];
}

const FilterProductsByCategory = async ({
  category,
  products,
}: FilterProductsByCategoryProps) => {
  return (
    <>
      <Border />
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <h2 className="mx-auto max-w-6xl text-2xl font-black mb-4">
          All Available Nike {category.name} ({products.length}):
        </h2>
        <ProductGrids products={products} />
      </div>
    </>
  );
};

export default FilterProductsByCategory;
