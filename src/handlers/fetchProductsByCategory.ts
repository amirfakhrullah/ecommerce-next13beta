import { massageProductClientList } from "../helpers/massageProductClient";
import db from "../lib/servers/prismadb";

export const fetchProductsByCategory = async (categoryId: string) => {
  const [category, products] = await db.$transaction([
    db.category.findFirst({
      where: {
        id: categoryId,
      },
    }),
    db.product.findMany({
      where: {
        categoryId,
      },
      include: {
        category: true,
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    }),
  ]);
  return {
    category,
    products: massageProductClientList(products),
  };
};

export const fetchProductSuggestions = async ({
  categoryId,
  skipProductId,
  limit,
}: {
  categoryId: string;
  skipProductId?: string;
  limit?: number;
}) => {
  const products = await db.product.findMany({
    where: {
      categoryId,
      ...(skipProductId && {
        NOT: {
          id: skipProductId,
        },
      }),
    },
    ...(limit && { take: limit }),
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
