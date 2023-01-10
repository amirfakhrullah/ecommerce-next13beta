import { Prisma, PrismaClient } from "@prisma/client";
import db from "../../../lib/servers/prismadb";

export const getOrderCheckout = async (
  orderId: string,
  paymentIntentClientSecret: string,
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
      stripePaymentClientSecret: paymentIntentClientSecret,
    },
    include: {
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
