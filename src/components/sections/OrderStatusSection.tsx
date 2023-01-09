"use client";

import { notFound, useRouter } from "next/navigation";
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
          if (res.orderItems.length !== cartItems.length) {
            return;
          }
          const checkCarts = new Map<string, string[]>();
          res.orderItems.forEach((item) => {
            const prev = checkCarts.get(item.productId) ?? [];
            checkCarts.set(item.productId, [...prev, item.size]);
          });
          let isSame = true;
          cartItems.forEach((item) => {
            if (!isSame) return;
            let prev = checkCarts.get(item.id) ?? [];
            const index = prev.findIndex((size) => size === item.size);
            if (index < 0) {
              isSame = false;
              return;
            }
            prev.splice(index, index + 1);
            checkCarts.set(item.id, prev);
          });
          if (!isSame) return;
          const isEmpty = !!Array.from(checkCarts.values())
            .flatMap((val) => val)
            .find((val) => !!val);
          if (!isEmpty) {
            return setCartItems([]);
          }
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

  return (
    <div>
      <h1>{data.id}</h1>
      <h1>{data.status}</h1>
    </div>
  );
};

export default OrderStatusSection;
