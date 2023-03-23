"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { PRODUCTS_PER_PAGE } from "../../../constants";
import { trpc } from "../../../providers/trpcProvider";
import PaginationButtons from "../../buttons/PaginationButtons";
import Loader from "../../loaders/Loader";
import NotFoundText from "../../NotFoundText";
import ProductGrids from "../../ProductGrids";

interface SearchProductSectionProp {
  search: string;
  onClose?: () => void;
}
const SearchProductSection = ({ search, onClose }: SearchProductSectionProp) => {
  const [page, setPage] = useState(1);

  const { data: products, isLoading } = trpc.product.search.useQuery(
    {
      search,
      page,
    },
    {
      onError: (err) => toast(err.message),
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Loader />;
  }
  if (!products) {
    return <NotFoundText>No Products Found.</NotFoundText>;
  }
  return (
    <>
      <ProductGrids products={products} handleClickAfter={onClose} />
      {products.length !== 0 && (
        <PaginationButtons
          currentPage={page}
          disableNextPage={products.length < PRODUCTS_PER_PAGE}
          handlePrev={() => page !== 1 && setPage(page - 1)}
          handleNext={() =>
            products.length >= PRODUCTS_PER_PAGE && setPage(page + 1)
          }
        />
      )}
    </>
  );
};

export default SearchProductSection;
