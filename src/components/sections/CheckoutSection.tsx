"use client";

import { Elements } from "@stripe/react-stripe-js";
import { getClientStripe } from "../../lib/clients/stripeClient";
import CheckoutForm from "../forms/CheckoutForm";
import { useCartContext } from "../../providers/CartContextProvider";
import { useEffect } from "react";
import { OrderDetails } from "../../app/checkout/[orderId]/page";
import CartCard from "../cards/CartCard";
import { displayNumbers } from "../../helpers/numbers";

interface CheckoutSectionProps {
  paymentIntentClientSecret: string;
  order: OrderDetails;
}
const CheckoutSection = ({
  paymentIntentClientSecret,
  order,
}: CheckoutSectionProps) => {
  const { setCartItems } = useCartContext();

  useEffect(() => {
    setCartItems([]);
    // eslint-disable-next-line
  }, []);

  const stripeClientPromise = getClientStripe();

  const { orderItems } = order;
  return (
    <div className="grid md:grid-cols-2 grid-cols-1">
      <div className="grid-cols-1 md:block hidden md:py-20 px-4">
        <h2 className="text-2xl font-black mb-4">
          Your Cart ({orderItems.length}):
        </h2>
        <>
          {orderItems.map((item, idx) => (
            <CartCard
              index={idx}
              key={item.id + idx}
              item={{
                id: item.product.id,
                image: item.product.image,
                name: item.product.name,
                size: item.size,
              }}
              price={item.product.price}
              disableAction
            />
          ))}
          <div className="border-t border-zinc-300 my-5" />
          <div className="w-full flex flex-col items-end">
            <p className="font-medium mb-2">Your Total</p>
            <h2 className="text-4xl font-black mb-4 text-red-800">
              $
              {displayNumbers(
                order.orderItems.reduce(
                  (acc, curr) => acc + curr.product.price,
                  0
                )
              )}
            </h2>
          </div>
        </>
      </div>
      <div className="grid-cols-1">
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
    </div>
  );
};

export default CheckoutSection;
