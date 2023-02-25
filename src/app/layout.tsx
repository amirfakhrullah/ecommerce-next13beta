import "../styles/globals.css";
import { Inter } from "@next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartContextProvider from "../providers/CartContextProvider";
import Toaster from "../components/Toaster";
import { AnalyticsWrapper } from "../lib/clients/Analytics";
import { TRPCProvider } from "../providers/trpcProvider";
import { use } from "react";
import { getCurrentUser } from "../lib/servers/session";
import UserContextProvider from "../providers/UserProvider";
import AuthError from "../components/AuthError";
import db from "../lib/servers/prismadb";
import { UserType } from "@prisma/client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  let isAdmin = false;
  if (user) {
    isAdmin =
      (
        await db.user.findFirst({
          where: {
            id: user.id,
          },
          select: {
            userType: true,
          },
        })
      )?.userType === UserType.Admin;
  }

  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="bg-gray-100">
        <UserContextProvider user={user} isAdmin={isAdmin}>
          <TRPCProvider>
            <CartContextProvider>
              <>
                <Header />
                {children}
                <Toaster position="top-center" />
                <Footer />
                <AuthError />
                <AnalyticsWrapper />
              </>
            </CartContextProvider>
          </TRPCProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
