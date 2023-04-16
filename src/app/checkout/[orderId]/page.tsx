import { Status } from "@prisma/client";
import { notFound } from "next/navigation";
import CheckoutSection from "../../../components/sections/CheckoutSection";
import { getCurrentUser } from "../../../lib/getCurrentUser";
import { getOrderCheckout } from "../../../server/handlers/orders/getOrderCheckout";

interface PageProps {
  params: {
    orderId?: string;
  };
  searchParams?: {
    s?: string;
  };
}

export interface OrderDetails {
  orderItems: {
    size: string;
    id: string;
    productId: string;
    orderId: string;
    product: {
      id: string;
      name: string;
      image: string;
      price: number;
    };
  }[];
  id: string;
  userId: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date | null;
  stripePaymentIntentId: string | null;
  stripePaymentClientSecret: string | null;
}

const CheckoutOrderIdPage = async ({
  params: { orderId },
  searchParams,
}: PageProps) => {
  const paymentIntentClientSecret = searchParams?.s;
  if (
    !orderId ||
    !paymentIntentClientSecret ||
    typeof paymentIntentClientSecret !== "string"
  ) {
    return notFound();
  }

  const user = await getCurrentUser();
  if (!user) {
    return notFound();
  }

  const order = await getOrderCheckout(
    orderId,
    paymentIntentClientSecret,
    user.id
  );
  if (!order) {
    return notFound();
  }

  return (
    <CheckoutSection
      paymentIntentClientSecret={paymentIntentClientSecret}
      order={order}
    />
  );
};

export default CheckoutOrderIdPage;
