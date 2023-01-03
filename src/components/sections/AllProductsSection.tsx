import { use } from "react";
import { fetchProducts } from "../../handlers/fetchProducts";
import Border from "../Border";
import ProductGrids from "../ProductGrids";

const AllProductsSection = () => {
  const products = use(fetchProducts());

  return (
    <>
      <Border />
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <h2 className="mx-auto max-w-6xl text-2xl font-black mb-4">
          All Available Products ({products.length}):
        </h2>
        <ProductGrids products={products} />
      </div>
    </>
  );
};

export default AllProductsSection;
