import { z } from "zod";
import { fetchProductSuggestions } from "../../handlers/fetchProductsByCategory";
import db from "../../lib/servers/prismadb";
import { userProcedure } from "../procedures";
import { procedure, router } from "../trpc";

export const appRouter = router({
  hello: userProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return {
        greeting: `hello ${input.text}`,
        user: ctx.session.user,
      };
    }),
  suggestProducts: procedure
    .input(
      z.object({
        categoryId: z.string(),
        skipProductId: z.string().optional(),
        limit: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const { categoryId, skipProductId, limit } = input;
      return await fetchProductSuggestions({
        categoryId,
        skipProductId,
        limit,
      });
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
