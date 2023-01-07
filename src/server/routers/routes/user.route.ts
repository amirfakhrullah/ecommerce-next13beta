import { userProcedure } from "../../procedures";
import {
  orderHistoryInputSchema,
  userIdSchema,
} from "../../../helpers/validations/userRoutesSchema";

export const userRoutes = {
  getProfileData: userProcedure
    .input(userIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  getOrderHistory: userProcedure
    .input(orderHistoryInputSchema)
    .query(async ({ ctx, input }) => {
      const { userId, take, skip } = input;
      return await ctx.prisma.order.findMany({
        where: {
          userId,
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
  getAddress: userProcedure
    .input(userIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.address.findFirst({
        where: {
          userId: input.id,
        },
      });
    }),
};
