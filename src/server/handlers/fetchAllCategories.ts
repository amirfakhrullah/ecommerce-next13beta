import { Prisma, PrismaClient } from "@prisma/client";
import db from "../../lib/servers/prismadb";

export const fetchAllCategories = async (
  prisma?: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => await (prisma ?? db).category.findMany();
