import { userProcedure } from "../procedures";
import { z } from "zod";

export const userRoutes = {
  getProfileData: userProcedure
    .input(
      z.object({
        id: z.string().max(30),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
  getOrderHistory: userProcedure
    .input(
      z.object({
        userId: z.string().max(30),
        skip: z.number().optional(),
        take: z.number(),
      })
    )
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
    .input(
      z.object({
        id: z.string().max(30),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.address.findFirst({
        where: {
          userId: input.id,
        },
      });
    }),
};
