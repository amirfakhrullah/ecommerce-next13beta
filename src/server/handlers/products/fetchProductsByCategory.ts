import { Prisma, PrismaClient } from "@prisma/client";
import { massageProductClientList } from "../../../helpers/massageProductClient";
import db from "../../../lib/servers/prismadb";

export const fetchProductsByCategory = async (
  categoryId: string,
  take?: number,
  skip?: number,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  const prismadb = prisma ?? db;
  const [category, products] = await prismadb.$transaction([
    prismadb.category.findFirst({
      where: {
        id: categoryId,
      },
    }),
    prismadb.product.findMany({
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
      ...(take && { take }),
      ...(skip && { skip }),
    }),
  ]);
  return {
    category,
    products: massageProductClientList(products),
  };
};
