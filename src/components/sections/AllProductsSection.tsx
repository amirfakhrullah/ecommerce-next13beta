import { use } from "react";
import { PRODUCTS_PER_PAGE } from "../../constants";
import { fetchProducts } from "../../server/handlers/fetchProducts";
import PaginationButtons from "../buttons/PaginationButtons";
import ProductGrids from "../ProductGrids";

interface Props {
  page: number;
}

const AllProductsSection = ({ page }: Props) => {
  const skip = page > 1 ? (page - 1) * PRODUCTS_PER_PAGE : undefined;
  const products = use(fetchProducts(skip, PRODUCTS_PER_PAGE));

  return (
    <>
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <h2 className="mx-auto max-w-6xl text-2xl font-black mb-4">
          All Available Products:
        </h2>
        <ProductGrids products={products} />
        <PaginationButtons
          currentPage={page}
          route="/products"
          disableNextPage={products.length < PRODUCTS_PER_PAGE}
        />
      </div>
    </>
  );
};

export default AllProductsSection;
