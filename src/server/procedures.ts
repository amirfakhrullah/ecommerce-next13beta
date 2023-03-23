import * as trpc from "@trpc/server";
import { UserType } from "@prisma/client";
import { procedure } from "./trpc";

export const userProcedure = procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const adminProcedure = userProcedure.use(async ({ ctx, next }) => {
  const { userType } =
    (await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        userType: true,
      },
    })) || {};

  if (userType !== UserType.Admin) {
    throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx,
  });
});
