import { z } from "zod";
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
});

// export type definition of API
export type AppRouter = typeof appRouter;
