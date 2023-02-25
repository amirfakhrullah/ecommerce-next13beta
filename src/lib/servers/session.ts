import { getServerSession } from "next-auth/next";
import authOptions from "./authOptions";

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  const session = await getSession();

  return session?.user;
};
