"use client";

import { Fragment } from "react";
import { toast } from "react-hot-toast";
import ProductForAdminCard from "../../../components/cards/ProductForAdminCard";
import Loader from "../../../components/loaders/Loader";
import SmallLoader from "../../../components/loaders/SmallLoader";
import NotFoundText from "../../../components/NotFoundText";
import EditOrAddProductDialog from "../../../components/sections/EditOrAddProductSection/EditOrAddProductDialog";
import { ITEMS_PER_PAGE } from "../../../constants";
import usePaginatedRef from "../../../hooks/usePaginatedRef";
import { trpc } from "../../../providers/trpcProvider";

enum Sort {
  Desc = "Desc",
  Asc = "Asc",
  PriceUp = "PriceUp",
  PriceDown = "PriceDown",
}

const AdminPage = () => {
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.admin.getProductsInfo.useInfiniteQuery(
      {
        take: ITEMS_PER_PAGE,
        sort: Sort.PriceDown,
      },
      {
        onError: (err) => toast.error(err.message),
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => lastPage.cursor,
      }
    );

  const { viewRef } = usePaginatedRef({
    hasNextPage,
    fetchNextPage,
  });

  const pages = data?.pages;
  if (isLoading) {
    return <Loader />;
  }

  if (!pages || pages.length === 0) {
    return <NotFoundText>No Order History</NotFoundText>;
  }

  return (
    <div className="mb-5">
      <div className="flex flex-row justify-end py-4">
        <EditOrAddProductDialog />
      </div>
      {pages.map((page) => (
        <Fragment key={page.cursor ?? "last"}>
          {page.products.length === 0 && (
            <NotFoundText>No Order History</NotFoundText>
          )}
          {page.products.map((product) => (
            <ProductForAdminCard key={product.id} {...product} />
          ))}
        </Fragment>
      ))}
      <span ref={viewRef} />
      {isFetchingNextPage && <SmallLoader />}
    </div>
  );
};

export default AdminPage;
