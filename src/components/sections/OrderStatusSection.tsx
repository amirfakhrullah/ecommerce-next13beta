"use client";

import { notFound, redirect, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useCartContext } from "../../providers/CartContextProvider";
import { trpc } from "../../providers/trpcProvider";
import Loader from "../loaders/Loader";

interface OrderStatusSectionProps {
  paymentIntent: string;
  paymentIntentClientSecret: string;
}
const OrderStatusSection = ({
  paymentIntent,
  paymentIntentClientSecret,
}: OrderStatusSectionProps) => {
  const router = useRouter();
  const { cartItems, setCartItems } = useCartContext();
  const { isLoading, data } = trpc.checkStatus.useQuery(
    {
      paymentIntent,
      paymentIntentClientSecret,
    },
    {
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      onError: (err) => {
        toast.error(err.message);
        return router.push("/");
      },
      onSuccess: (res) => {
        if (res && res.id && res.status) {
          if (res.status === "Paid") {
            toast.success("Payment successful");
          } else if (res.status === "Processing") {
            toast(
              "Payment is processing. Make sure you're checking out properly"
            );
          } else {
            toast.error("Payment unsuccessful");
          }
          router.push("/user");
        }
      },
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return notFound();
  }

  return <Loader />;
};

export default OrderStatusSection;
