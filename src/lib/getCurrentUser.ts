import { UserType } from "@prisma/client";
import db from "./servers/prismadb";
import { getSession } from "./servers/session";

export const getCurrentUser = async () => {
  const session = await getSession();

  return session?.user;
};

export const isAdmin = async () => {
  const session = await getSession();
  if (!session?.user) return false;

  return !!(await db.user.findFirst({
    where: {
      id: session.user.id,
      userType: UserType.Admin,
    },
  }));
};
