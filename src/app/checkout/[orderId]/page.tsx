import { Status } from "@prisma/client";
import { notFound } from "next/navigation";
import CheckoutSection from "../../../components/sections/CheckoutSection";
import { getCurrentUser } from "../../../lib/servers/session";
import { getOrder } from "../../../server/handlers/orders/getOrder";

interface PageProps {
  params: {
    orderId?: string;
  };
  searchParams?: {
    user_checkout_session?: string;
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
  const paymentIntentClientSecret = searchParams?.user_checkout_session;

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

  const order = await getOrder(orderId, paymentIntentClientSecret, user.id);

  if (!order) {
    return notFound();
  }

  return (
    <div>
      <CheckoutSection
        paymentIntentClientSecret={paymentIntentClientSecret}
        order={order}
      />
    </div>
  );
};

export default CheckoutOrderIdPage;
