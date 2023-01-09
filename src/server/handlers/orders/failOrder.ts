import { Prisma, PrismaClient } from "@prisma/client";
import db from "../../../lib/servers/prismadb";

export const failOrder = async (
  id: string,
  userId: string,
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) =>
  await (prisma ?? db).order.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      status: "Failed",
      updatedAt: new Date(),
    },
  });
