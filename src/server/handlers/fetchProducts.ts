import { massageProductClientList } from "../../helpers/massageProductClient";
import db from "../../lib/prismadb";

export const fetchPopularProducts = async (limit: number) => {
  const products = await db.product.findMany({
    take: limit,
    orderBy: {
      price: "desc",
    },
    include: {
      category: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
  });
  return massageProductClientList(products);
};

export const fetchProducts = async () => {
  const products = await db.product.findMany({
    include: {
      category: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
  });
  return massageProductClientList(products);
};
