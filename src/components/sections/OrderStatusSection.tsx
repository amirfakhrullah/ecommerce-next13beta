"use client";

import { Status } from "@prisma/client";
import { notFound, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
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
  const { isLoading, data } = trpc.payment.checkStatus.useQuery(
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
          if (res.status === Status.Paid) {
            toast.success("Payment successful");
          } else if (res.status === Status.Processing || res.status === Status.Created) {
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
