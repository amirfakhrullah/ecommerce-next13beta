import { use } from "react";
import { fetchProducts } from "../../handlers/fetchProducts";
import PaginationButtons from "../buttons/PaginationButtons";
import NotFoundText from "../NotFoundText";
import ProductGridsWithPaginations from "../ProductGridsWithPaginations";

interface Props {
  page: number;
}
const AllProductsSection = ({ page }: Props) => {
  const skip = page > 1 ? page * 6 : undefined;
  const products = use(fetchProducts(skip, 6));

  return (
    <>
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <h2 className="mx-auto max-w-6xl text-2xl font-black mb-4">
          All Available Products:
        </h2>
        {!products || !products.length ? (
          <>
            <NotFoundText>No Product Found.</NotFoundText>
            <PaginationButtons
              currentPage={page}
              route="/products"
              disableNextPage
            />
          </>
        ) : (
          <ProductGridsWithPaginations
            initialProducts={products}
            page={page}
            skip={skip ? skip + 6 : 6}
          />
        )}
      </div>
    </>
  );
};

export default AllProductsSection;
