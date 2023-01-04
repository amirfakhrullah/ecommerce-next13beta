import { z } from "zod";
import { fetchProducts } from "../../handlers/fetchProducts";
import { fetchProductSuggestions } from "../../handlers/fetchProductsByCategory";
import { procedure, router } from "../trpc";

export const appRouter = router({
  getProducts: procedure
    .input(
      z.object({
        skip: z.number(),
        take: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { skip, take } = input;
      return await fetchProducts(skip, take, ctx.prisma);
    }),
  suggestProducts: procedure
    .input(
      z.object({
        categoryId: z.string(),
        skipProductId: z.string().optional(),
        limit: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { categoryId, skipProductId, limit } = input;
      return await fetchProductSuggestions({
        prisma: ctx.prisma,
        categoryId,
        skipProductId,
        limit,
      });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
