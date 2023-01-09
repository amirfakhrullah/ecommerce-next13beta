"use client";

import { Fragment, useEffect } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../loaders/Loader";
import NotFoundText from "../../../components/NotFoundText";
import { ORDERS_PER_PAGE } from "../../../constants";
import { trpc } from "../../../providers/trpcProvider";
import OrderCard from "../../cards/OrderCard";
import { useInView } from "react-intersection-observer";
import SmallLoader from "../../loaders/SmallLoader";

const OrderHistorySection = () => {
  const { ref, inView } = useInView();
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.getOrderHistory.useInfiniteQuery(
      {
        take: ORDERS_PER_PAGE,
      },
      {
        onError: (err) => toast.error(err.message),
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => lastPage.cursor,
      }
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const pages = data?.pages;
  if (isLoading) {
    return <Loader />;
  }

  if (!pages) {
    return <NotFoundText>No Order History</NotFoundText>;
  }

  return (
    <div className="mb-5">
      {pages.map((page) => (
        <Fragment key={page.cursor ?? "last"}>
          {page.orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </Fragment>
      ))}
      <span ref={ref} />
      {isFetchingNextPage && <SmallLoader />}
    </div>
  );
};

export default OrderHistorySection;
