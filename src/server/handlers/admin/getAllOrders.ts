import { Prisma, PrismaClient } from "@prisma/client";
import db from "../../../lib/servers/prismadb";

/**
 * admin use only
 */
export const getAllOrders = async (
  take: number,
  cursor?: string,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  const orders = await (prisma ?? db).order.findMany({
    select: {
      id: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
    take: take,
    ...(cursor && {
      skip: 1,
      cursor: {
        id: cursor,
      },
    }),
    orderBy: {
      id: "desc",
    },
  });
  return {
    orders,
    cursor: orders[take - 1]?.id,
  };
};
