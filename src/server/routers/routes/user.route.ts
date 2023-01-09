import { userProcedure } from "../../procedures";
import { orderHistoryInputSchema } from "../../../helpers/validations/userRoutesSchema";

export const userRoutes = {
  getProfileData: userProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
  getOrderHistory: userProcedure
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
        skip: 1,
        ...(cursor && {
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
};
