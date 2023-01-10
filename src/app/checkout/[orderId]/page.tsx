import { notFound } from "next/navigation";
import { use } from "react";
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

  return (
    <div>
      <CheckoutSection paymentIntentClientSecret={paymentIntentClientSecret} />
    </div>
  );
};

export default CheckoutOrderIdPage;
