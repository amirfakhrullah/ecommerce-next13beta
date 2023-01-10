import { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import { orderHistoryInputSchema } from "../../../helpers/validations/userRoutesSchema";
import { getOrder } from "../../handlers/orders/getOrder";
import { userProcedure } from "../../procedures";
import { router } from "../../trpc";

export const orderRouter = router({
  get: userProcedure
    .input(z.string().max(30))
    .query(async ({ ctx, input: orderId }) => {
      return await getOrder(orderId, ctx.session.user.id, ctx.prisma);
    }),
  history: userProcedure
    .input(orderHistoryInputSchema)
    .query(async ({ ctx, input }) => {
      const { take, cursor } = input;
      const orders = await ctx.prisma.order.findMany({
        where: {
          userId: ctx.session.user.id,
        },
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
    }),
});

type OrderRouterOutput = inferRouterOutputs<typeof orderRouter>;
export type OrderResponse = OrderRouterOutput["get"];
export type OrderHistoryList = OrderRouterOutput["history"];
