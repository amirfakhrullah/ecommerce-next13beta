import { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import { paginatedInputSchema } from "../../../helpers/validations/userRoutesSchema";
import { adminProcedure } from "../../procedures";
import { router } from "../../trpc";

enum Sort {
  Desc = "Desc",
  Asc = "Asc",
  PriceUp = "PriceUp",
  PriceDown = "PriceDown",
}

export const adminRouter = router({
  getProductsInfo: adminProcedure
    .input(
      paginatedInputSchema.extend({
        sort: z.nativeEnum(Sort),
      })
    )
    .query(async ({ ctx, input }) => {
      const { take, cursor, sort } = input;
      const products = await ctx.prisma.product.findMany({
        select: {
          id: true,
          image: true,
          name: true,
          price: true,
          quantity: true,
          createdAt: true,
          updatedAt: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
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
          ...(sort === Sort.Asc && { id: "asc" }),
          ...(sort === Sort.Desc && { id: "desc" }),
          ...(sort === Sort.PriceDown && { price: "desc" }),
          ...(sort === Sort.PriceUp && { price: "asc" }),
        },
      });
      return {
        products,
        cursor: products[take - 1]?.id,
      };
    }),
});

type AdminRouterOutput = inferRouterOutputs<typeof adminRouter>;
export type ProductsInfoResponse = AdminRouterOutput["getProductsInfo"];
