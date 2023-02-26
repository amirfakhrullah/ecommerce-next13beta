import { notFound } from "next/navigation";
import OrderStatusSection from "../../../components/sections/OrderStatusSection";

interface PageProps {
  searchParams?: {
    payment_intent?: string;
    payment_intent_client_secret?: string;
    redirect_status?: string;
  };
}
const OrderStatusPage = ({ searchParams }: PageProps) => {
  const paymentIntent = searchParams?.payment_intent;
  const paymentIntentClientSecret = searchParams?.payment_intent_client_secret;
  const redirectStatus = searchParams?.redirect_status;

  if (
    !paymentIntent ||
    !paymentIntentClientSecret ||
    !redirectStatus ||
    typeof paymentIntent !== "string" ||
    typeof paymentIntentClientSecret !== "string" ||
    typeof redirectStatus !== "string"
  ) {
    return notFound();
  }

  return (
    <OrderStatusSection
      paymentIntent={paymentIntent}
      paymentIntentClientSecret={paymentIntentClientSecret}
    />
  );
};

export default OrderStatusPage;
