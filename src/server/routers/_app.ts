import { z } from "zod";
import { PRODUCTS_PER_PAGE } from "../../constants";
import { getProductsBySearch } from "../../handlers/fetchProducts";
import { procedure, router } from "../trpc";

export const appRouter = router({
  searchProducts: procedure
    .input(
      z.object({
        search: z.string(),
        page: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { search, page } = input;
      if (!search) return [];
      return await getProductsBySearch(
        search,
        PRODUCTS_PER_PAGE,
        (page - 1) * PRODUCTS_PER_PAGE,
        ctx.prisma
      );
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
