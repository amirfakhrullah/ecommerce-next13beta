import { massageProductClientList } from "../../helpers/massageProductClient";
import db from "../../lib/prismadb";

export const fetchPopularProducts = async (limit: number) => {
  const products = await db.product.findMany({
    take: limit,
    orderBy: {
      orderItems: {
        _count: "desc",
      },
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
