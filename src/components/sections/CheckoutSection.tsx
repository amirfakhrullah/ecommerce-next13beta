"use client";

import { Elements } from "@stripe/react-stripe-js";
import { getClientStripe } from "../../lib/clients/stripeClient";
import CheckoutForm from "../forms/CheckoutForm";
import { useCartContext } from "../../providers/CartContextProvider";
import { useEffect } from "react";

interface CheckoutSectionProps {
  paymentIntentClientSecret: string;
}
const CheckoutSection = ({
  paymentIntentClientSecret,
}: CheckoutSectionProps) => {
  const { setCartItems } = useCartContext();

  useEffect(() => {
    setCartItems([]);
    // eslint-disable-next-line
  }, []);

  const stripeClientPromise = getClientStripe();

  return (
    <div>
      {paymentIntentClientSecret && (
        <Elements
          options={{
            appearance: {
              theme: "none",
            },
            clientSecret: paymentIntentClientSecret,
          }}
          stripe={stripeClientPromise}
        >
          <CheckoutForm clientSecret={paymentIntentClientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutSection;
