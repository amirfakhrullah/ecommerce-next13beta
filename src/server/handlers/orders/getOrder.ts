import { Prisma, PrismaClient } from "@prisma/client";
import db from "../../../lib/servers/prismadb";

export const getOrder = async (
  orderId: string,
  userId: string,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  const order = await (prisma ?? db).order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              price: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!order) return;
  
  return {
    ...order,
    orderItems: order.orderItems.map((item) => ({
      ...item,
      size: item.size.toString(),
    })),
  };
};
