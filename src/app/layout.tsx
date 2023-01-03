import "../styles/globals.css";
import { Inter } from "@next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartContextProvider from "../providers/CartContextProvider";
import Toaster from "../components/Toaster";
import { AnalyticsWrapper } from "../lib/clients/Analytics";
import { TRPCProvider } from "../providers/trpcProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="bg-gray-100">
        <TRPCProvider>
          <CartContextProvider>
            <>
              <Header />
              {children}
              <Toaster position="top-center" />
              <Footer />
              <AnalyticsWrapper />
            </>
          </CartContextProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
