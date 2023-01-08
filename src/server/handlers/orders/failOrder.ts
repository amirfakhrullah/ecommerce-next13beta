import { Prisma, PrismaClient } from "@prisma/client";
import db from "../../../lib/servers/prismadb";

export const failOrder = async (
  id: string,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) =>
  await (prisma ?? db).order.update({
    where: {
      id,
    },
    data: {
      status: "Failed",
      updatedAt: new Date(),
    },
  });
