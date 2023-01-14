import { Order, Prisma, PrismaClient } from "@prisma/client";
import { CartProductsInput } from "../../../helpers/validations/productRoutesSchema";
import db from "../../../lib/servers/prismadb";

export const checkoutProducts = async (
  items: CartProductsInput,
  userId: string,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  const prismadb = prisma ?? db;
  let totalPrice = 0;
  let order: Order;

  try {
    await prismadb.$transaction(async (tx) => {
      await Promise.all(
        items.map(async (item) => {
          const product = await tx.product.update({
            where: {
              id: item.id,
            },
            data: {
              quantity: {
                decrement: 1,
              },
              updatedAt: new Date(),
            },
          });
          if (product.quantity < 0) {
            throw new Error(`Product ${product.id} is out of stock`);
          }
          totalPrice += product.price;
        })
      );
    });

    order = await prismadb.order.create({
      data: {
        userId,
        orderItems: {
          createMany: {
            data: items.map((item) => ({
              productId: item.id,
              size: item.size,
            })),
          },
        },
      },
    });
  } catch (ex) {
    if (ex instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(`Error ${ex.code}: ${ex.message}`);
    }
    throw new Error("An error occured");
  }

  return {
    order,
    totalPrice,
  };
};
