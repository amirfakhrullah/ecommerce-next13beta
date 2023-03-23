import { Prisma, PrismaClient } from "@prisma/client";
import { massageProductClientList } from "../../../helpers/massageProductClient";
import { CartProductsInput } from "../../../helpers/validations/productRoutesSchema";
import db from "../../../lib/servers/prismadb";

export const getCartProducts = async (
  products: CartProductsInput,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  if (products.length === 0) return [];

  const data = await (prisma ?? db).product.findMany({
    where: {
      deleted: false,
      OR: products.map((product) => ({
        id: product.id,
        quantity: {
          gt: 0,
        },
        sizes: {
          has: product.size,
        },
      })),
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
  
  return massageProductClientList(data);
};
