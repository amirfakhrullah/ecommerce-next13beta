import { inferRouterOutputs } from "@trpc/server";
import { paginatedInputSchema } from "../../../helpers/validations/userRoutesSchema";
import { adminProcedure } from "../../procedures";
import { router } from "../../trpc";

export const adminRouter = router({
  getProductsInfo: adminProcedure
    .input(paginatedInputSchema)
    .query(async ({ ctx, input }) => {
      const { take, cursor } = input;
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
          id: "desc",
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
