import { UserType } from "@prisma/client";
import { Session } from "next-auth";
import db from "./servers/prismadb";
import { getSession } from "./servers/session";

export const getCurrentUser = async () => {
  const session = await getSession();

  return session?.user;
};

export const isAdmin = async (userId?: string) => {
  if (!userId) return false;

  return !!(await db.user.findFirst({
    where: {
      id: userId,
      userType: UserType.Admin,
    },
  }));
};
