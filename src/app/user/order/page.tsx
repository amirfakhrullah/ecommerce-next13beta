"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../../components/Loader";
import NotFoundText from "../../../components/NotFoundText";
import { PRODUCTS_PER_PAGE } from "../../../constants";
import { trpc } from "../../../providers/trpcProvider";

const OrderHistoryPage = () => {
  const [page, setPage] = useState(1);

  const { isLoading } = trpc.getOrderHistory.useQuery(
    {
      take: PRODUCTS_PER_PAGE,
      skip: (page - 1) * PRODUCTS_PER_PAGE,
    },
    {
      onError: (err) => toast.error(err.message),
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  return <NotFoundText>Order History Page in progress..</NotFoundText>;
};

export default OrderHistoryPage;
