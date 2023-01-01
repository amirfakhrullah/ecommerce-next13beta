import { massageProductClientList } from "../../helpers/massageProductClient";
import db from "../../lib/prismadb";

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
