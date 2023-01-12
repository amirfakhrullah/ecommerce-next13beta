import { notFound } from "next/navigation";
import Border from "../../../components/Border";
import BackButton from "../../../components/buttons/BackButton";
import CartCard from "../../../components/cards/CartCard";
import StatusBox from "../../../components/StatusBox";
import { getDateCompare } from "../../../helpers/date";
import { displayNumbers } from "../../../helpers/numbers";
import { getCurrentUser } from "../../../lib/servers/session";
import { getOrder } from "../../../server/handlers/orders/getOrder";

interface PageProps {
  params: {
    orderId: string;
  };
}

const OrderIdPage = async ({ params: { orderId } }: PageProps) => {
  const user = await getCurrentUser();
  if (!orderId || !user) {
    return notFound();
  }

  const order = await getOrder(orderId, user.id);
  if (!order) {
    return notFound();
  }

  return (
    <div>
      <BackButton />
      <Border />
      <div className="mx-auto max-w-6xl w-full my-10 px-4">
        <div className="flex flex-row items-center justify-between pb-4 mb-4 border-b border-zinc-300">
          <div>
            <p className="text-sm">Order {order.id}</p>
            <h2 className="text-4xl font-black my-4 text-red-800">
              $
              {displayNumbers(
                order.orderItems.reduce(
                  (acc, curr) => acc + curr.product.price,
                  0
                )
              )}
            </h2>
            <p className="text-14px font-bold">
              {order.orderItems.length} Item(s)
            </p>
            <p className="text-sm">
              {order.updatedAt ? "Updated " : "Created "}
              {getDateCompare(
                new Date(order.updatedAt ? order.updatedAt : order.createdAt)
              )}
            </p>
          </div>
          <StatusBox status={order.status} />
        </div>
        {order.orderItems.map((item, idx) => (
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
      </div>
    </div>
  );
};

export default OrderIdPage;
