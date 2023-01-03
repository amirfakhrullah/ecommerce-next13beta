import { use } from "react";
import { fetchPopularProducts } from "../../handlers/fetchProducts";
import Border from "../Border";
import SeeAllButton from "../buttons/SeeAllButton";
import ProductGrids from "../ProductGrids";

const PopularProductsSection = () => {
  const products = use(fetchPopularProducts(12));

  return (
    <>
      <Border />
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <div className="mx-auto max-w-6xl flex flex-row items-center justify-between mb-4">
          <h2 className="text-2xl font-black">Heat Sneakers 🔥</h2>
          <SeeAllButton route="/products" />
        </div>
        <ProductGrids products={products} />
      </div>
    </>
  );
};

export default PopularProductsSection;
