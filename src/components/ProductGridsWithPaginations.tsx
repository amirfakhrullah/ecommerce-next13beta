"use client";

import { toast } from "react-hot-toast";
import { trpc } from "../providers/trpcProvider";
import { FullProductClient } from "../types/types";
import PaginationButtons from "./buttons/PaginationButtons";
import ProductCard from "./cards/ProductCard";
import Loader from "./Loader";

interface ProductGridsWithPaginationsProps {
  initialProducts: FullProductClient[];
  page: number;
  skip: number;
}

const ProductGridsWithPaginations = ({
  initialProducts,
  page,
  skip,
}: ProductGridsWithPaginationsProps) => {
  const { data: nextProducts, isLoading: isNextProductsLoading } =
    trpc.getProducts.useQuery(
      {
        skip,
        take: 6,
      },
      {
        onError: (err) => toast.error(err.message),
      }
    );

  return (
    <>
      <div className="mx-auto max-w-6xl w-full grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-1">
        {initialProducts.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
        {nextProducts &&
          nextProducts.length > 0 &&
          nextProducts.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))}
      </div>
      {initialProducts.length >= 6 && isNextProductsLoading && <Loader />}
      {(initialProducts.length < 6 ||
        (initialProducts.length >= 6 && !isNextProductsLoading)) && (
        <PaginationButtons
          currentPage={page}
          route="/products"
          disableNextPage={!nextProducts || nextProducts.length < 6}
        />
      )}
    </>
  );
};

export default ProductGridsWithPaginations;
