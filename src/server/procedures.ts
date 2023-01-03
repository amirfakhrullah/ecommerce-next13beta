import * as trpc from "@trpc/server";
import db from "../lib/servers/prismadb";
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

export const adminProcedure = procedure.use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
  }
  const isAdmin = !!db.user.findFirst({
    where: {
      id: ctx.session.user.id,
      userType: UserType.Admin,
    },
  });
  if (!isAdmin) {
    throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
