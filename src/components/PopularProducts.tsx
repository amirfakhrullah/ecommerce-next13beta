import React from "react";
import db from "../lib/prismadb";

const fetchPopularProducts = async () =>
  await db.product.findMany({
    take: 10,
    orderBy: {
      orders: {
        _count: "desc",
      },
    },
    include: {
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

const PopularProducts = async () => {
  const products = await fetchPopularProducts();

  return <div>{JSON.stringify(products)}</div>;
};

export default PopularProducts;
