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
      const { take, skip } = input;
      return await ctx.prisma.order.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
        ...(take && { take }),
        ...(skip && { skip }),
      });
    }),
  getAddress: userProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.address.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
};
