"use client";

import { Fragment } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../loaders/Loader";
import NotFoundText from "../../../components/NotFoundText";
import { ITEMS_PER_PAGE } from "../../../constants";
import { trpc } from "../../../providers/trpcProvider";
import OrderCard from "../../cards/OrderCard";
import SmallLoader from "../../loaders/SmallLoader";
import usePaginatedRef from "../../../hooks/usePaginatedRef";

const OrderHistorySection = () => {
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.order.history.useInfiniteQuery(
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
    <div className="mb-5">
      {pages.map((page) => (
        <Fragment key={page.cursor ?? "last"}>
          {page.orders.length === 0 && (
            <NotFoundText>No Order History</NotFoundText>
          )}
          {page.orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </Fragment>
      ))}
      <span ref={viewRef} />
      {isFetchingNextPage && <SmallLoader />}
    </div>
  );
};

export default OrderHistorySection;
