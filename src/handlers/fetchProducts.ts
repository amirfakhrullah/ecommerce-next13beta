import {
  massageProductClient,
  massageProductClientList,
} from "../helpers/massageProductClient";
import db from "../lib/servers/prismadb";

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

export const fetchProductById = async (id: string) => {
  const product = await db.product.findFirst({
    where: {
      id,
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
  if (!product) return;
  return massageProductClient(product);
};
