import { Prisma, PrismaClient } from "@prisma/client";
import { massageProductClient } from "../../../helpers/massageProductClient";
import db from "../../../lib/servers/prismadb";

export const fetchProductById = async (
  id: string,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  const product = await (prisma ?? db).product.findFirst({
    where: {
      id,
      deleted: false,
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
