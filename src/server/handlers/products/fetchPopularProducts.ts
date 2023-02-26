import { Prisma, PrismaClient } from "@prisma/client";
import { massageProductClientList } from "../../../helpers/massageProductClient";
import db from "../../../lib/servers/prismadb";

export const fetchPopularProducts = async (
  limit: number,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  const products = await (prisma ?? db).product.findMany({
    where: {
      deleted: false,
    },
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
