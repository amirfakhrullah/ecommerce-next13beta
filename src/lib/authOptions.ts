import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../lib/prismadb";
import env from "../env";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth",
    signOut: "/auth",
  },
  callbacks: {
    session({ user, session }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export default authOptions;
