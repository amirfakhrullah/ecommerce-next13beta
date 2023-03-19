"use client";

import { Fragment } from "react";
import { toast } from "react-hot-toast";
import AdminOrderCard from "../../components/cards/AdminOrderCard";
import Loader from "../../components/loaders/Loader";
import SmallLoader from "../../components/loaders/SmallLoader";
import NotFoundText from "../../components/NotFoundText";
import { ITEMS_PER_PAGE } from "../../constants";
import usePaginatedRef from "../../hooks/usePaginatedRef";
import { trpc } from "../../providers/trpcProvider";

enum Sort {
  Desc = "Desc",
  Asc = "Asc",
  PriceUp = "PriceUp",
  PriceDown = "PriceDown",
}

const AdminPage = () => {
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.admin.getOrdersInfo.useInfiniteQuery(
      {
        take: ITEMS_PER_PAGE,
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
    <>
    <h2 className="text-2xl font-black mt-10 mb-5">
      All Orders 🚗
    </h2>
      <div className="mb-5">
        {pages.map((page) => (
          <Fragment key={page.cursor ?? "last"}>
            {page.orders.length === 0 && (
              <NotFoundText>No Order History</NotFoundText>
            )}
            {page.orders.map((order) => (
              <AdminOrderCard key={order.id} order={order} />
            ))}
          </Fragment>
        ))}
        <span ref={viewRef} />
        {isFetchingNextPage && <SmallLoader />}
      </div>
    </>
  );
};

export default AdminPage;
