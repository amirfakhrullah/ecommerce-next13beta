"use client";

import { useRouter } from "next/navigation";
import cn from "../../helpers/cn";
import { getDateCompare } from "../../helpers/date";
import { OrdersInfoResponse } from "../../server/routers/subRouters/admin.router";
import UserAvatar from "../Avatar";
import SeeAllButton from "../buttons/SeeAllButton";
import StatusBox from "../StatusBox";

const AdminOrderCard = ({
  order,
}: {
  order: OrdersInfoResponse["orders"][number];
}) => {
  const router = useRouter();
  const navigatePath = `/admin/orders/${order.id}`;

  return (
    <div className="p-4 md:mx-0 mx-2 border border-zinc-300 mt-2 rounded-md shadow-md grid md:grid-cols-4 grid-cols-2">
      <div className="grid-cols-1 flex flex-row gap-1">
        <div
          className={cn(
            "rounded-full h-8 w-8 md:flex hidden flex-row items-center justify-center overflow-hidden mr-2",
            !order.user.image && "bg-purple-400"
          )}
        >
          <UserAvatar
            user={order.user}
            fallbackProps={{
              delayMs: 600,
            }}
          />
        </div>
        <div>
          <p className="text-sm">{order.user.name} ordered</p>
          <p className="text-[16px] font-bold">
            {order._count.orderItems} Item(s)
          </p>
          <p
            onClick={() => router.push(navigatePath)}
            className="text-sm mb-2 cursor-pointer hover:underline hover:text-red-800 ease-in duration-150"
          >
            {order.id}
          </p>
        </div>
      </div>
      <div className="md:flex hidden flex-row items-center justify-center">
        <p className="text-sm">
          {order.updatedAt ? "Updated " : "Created "}
          {getDateCompare(
            new Date(order.updatedAt ? order.updatedAt : order.createdAt)
          )}
        </p>
      </div>
      <div className="grid-cols-1 flex flex-row items-center md:justify-center justify-end">
        <StatusBox status={order.status} />
      </div>
      <div className="grid-cols-1 md:flex hidden items-center justify-end">
        <SeeAllButton route={navigatePath}>View</SeeAllButton>
      </div>
    </div>
  );
};

export default AdminOrderCard;
