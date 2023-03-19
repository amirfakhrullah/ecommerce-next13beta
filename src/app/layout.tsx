import "../styles/globals.css";
import { Inter } from "@next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartContextProvider from "../providers/CartContextProvider";
import Toaster from "../components/Toaster";
import { AnalyticsWrapper } from "../lib/clients/Analytics";
import { TRPCProvider } from "../providers/trpcProvider";
import UserContextProvider from "../providers/UserProvider";
import AuthError from "../components/AuthError";
import { getCurrentUser, isAdmin } from "../lib/getCurrentUser";
import { use } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = use(getCurrentUser());
  const admin = use(isAdmin());

  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="bg-gray-100">
        <UserContextProvider user={user} isAdmin={admin}>
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
