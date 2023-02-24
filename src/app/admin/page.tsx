"use client";

import { Fragment, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import ProductForAdminCard from "../../components/cards/ProductForAdminCard";
import Loader from "../../components/loaders/Loader";
import SmallLoader from "../../components/loaders/SmallLoader";
import NotFoundText from "../../components/NotFoundText";
import { ITEMS_PER_PAGE } from "../../constants";
import { trpc } from "../../providers/trpcProvider";

const AdminPage = () => {
  const { ref, inView } = useInView();
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.admin.getProductsInfo.useInfiniteQuery(
      {
        take: ITEMS_PER_PAGE,
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
    // eslint-disable-next-line
  }, [inView]);

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
          {page.products.length === 0 && (
            <NotFoundText>No Order History</NotFoundText>
          )}
          {page.products.map((product) => (
            <ProductForAdminCard key={product.id} {...product} />
          ))}
        </Fragment>
      ))}
      <span ref={ref} />
      {isFetchingNextPage && <SmallLoader />}
    </div>
  );
};

export default AdminPage;
