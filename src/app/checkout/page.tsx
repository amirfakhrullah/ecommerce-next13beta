"use client";

import { notFound, useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { stripeClientPromise } from "../../lib/clients/stripeClient";
import CheckoutForm from "../../components/forms/CheckoutForm";

interface PageProps {
  searchParams?: {
    user_checkout_session?: string;
  };
}
const CheckoutPage = ({ searchParams }: PageProps) => {
  const clientSecret = searchParams?.user_checkout_session;

  if (!clientSecret || typeof clientSecret !== "string") {
    return notFound();
  }

  return (
    <div>
      {clientSecret && (
        <Elements
          options={{
            appearance: {
              theme: "stripe",
            },
            clientSecret,
          }}
          stripe={stripeClientPromise}
        >
          {/* <CheckoutForm /> */}
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
