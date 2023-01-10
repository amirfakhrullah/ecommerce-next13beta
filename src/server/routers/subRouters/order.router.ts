import { orderHistoryInputSchema } from "../../../helpers/validations/userRoutesSchema";
import { userProcedure } from "../../procedures";
import { router } from "../../trpc";

export const orderRouter = router({
  orderHistory: userProcedure
    .input(orderHistoryInputSchema)
    .query(async ({ ctx, input }) => {
      const { take, cursor } = input;
      const orders = await ctx.prisma.order.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
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
