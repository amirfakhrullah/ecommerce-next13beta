import { Prisma, PrismaClient } from "@prisma/client";
import { massageProductClientList } from "../../../helpers/massageProductClient";
import db from "../../../lib/servers/prismadb";

export const fetchAllProducts = async (
    skip?: number,
    take?: number,
    prisma?: PrismaClient<
      Prisma.PrismaClientOptions,
      never,
      Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >
  ) => {
    const products = await (prisma ?? db).product.findMany({
      include: {
        category: true,
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
      ...(skip && { skip }),
      ...(take && { take }),
    });
    return massageProductClientList(products);
  };