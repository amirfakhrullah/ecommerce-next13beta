"use client";

import { notFound } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { getClientStripe } from "../../lib/clients/stripeClient";
import CheckoutForm from "../../components/forms/CheckoutForm";
import { useCartContext } from "../../providers/CartContextProvider";
import { useEffect } from "react";

interface PageProps {
  searchParams?: {
    user_checkout_session?: string;
  };
}
const CheckoutPage = ({ searchParams }: PageProps) => {
  const clientSecret = searchParams?.user_checkout_session;
  const { setCartItems } = useCartContext();

  if (!clientSecret || typeof clientSecret !== "string") {
    return notFound();
  }

  useEffect(() => {
    setCartItems([]);
  }, []);

  const stripeClientPromise = getClientStripe();

  return (
    <div>
      {clientSecret && (
        <Elements
          options={{
            appearance: {
              theme: "none",
            },
            clientSecret,
          }}
          stripe={stripeClientPromise}
        >
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
