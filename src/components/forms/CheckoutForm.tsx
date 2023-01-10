"use client";

import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Button from "../buttons/Button";
import CartSection from "../sections/CartSection";
import { useUserContext } from "../../providers/UserProvider";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUserContext();

  const router = useRouter();

  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          toast.success("Payment succeeded!");
          return router.push("/");
        case "processing":
          return toast("Your payment is processing.");
        // case "requires_payment_method":
        //   setMessage("Your payment was not successful, please try again.");
        //   break;
        default:
          return;
      }
    });
    // eslint-disable-next-line
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsPaying(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${
          process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"
        }/orders/status`,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        toast.error(error.message ?? "The payment was unsuccessful");
      } else {
        toast.error("The payment was unsuccessful");
      }
    }
    setIsPaying(false);
  };

  if (!user?.email) {
    return notFound();
  }
  return (
    <div className="mx-auto w-full max-w-xl px-4 md:order-none order-last mb-2 sm:sticky sm:top-[120px] static">
      <div className="md:py-20">
        <div className="p-6 border border-zinc-300 z-0">
        <p className="text-[16px] mb-2 text-red-700">This is a Test Stripe account. Please use <span className="font-bold">4242 4242 4242 4242</span></p>
          <h2 className="text-2xl font-black mb-4">Proceed:</h2>
          <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
              id="link-authentication-element"
              options={{
                defaultValues: {
                  email: user.email,
                },
              }}
            />
            <PaymentElement
              id="payment-element"
              options={{
                layout: "tabs",
                defaultValues: {
                  billingDetails: {
                    name: user.name ?? user.email,
                    email: user.email,
                  },
                },
              }}
            />
            <Button
              color="primary"
              className="mt-4 py-3 w-full"
              disabled={isPaying || !stripe || !elements}
              isLoading={isPaying}
              localLoaderOnClick={false}
              id="submit"
            >
              Pay Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
