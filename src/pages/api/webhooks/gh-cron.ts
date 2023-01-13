import { Status } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import env from "../../../env";
import db from "../../../lib/servers/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const key = req.headers["x-api-key"];
  if (!key || typeof key !== "string") {
    return res.status(401).end();
  }

  if (key !== env.CRON_API_KEY) {
    return res.status(401).end();
  }

  const statusLists: Status[] = ["NotPaid", "Processing"];
  const orders = await db.order.findMany({
    where: {
      status: {
        in: statusLists,
      },
    },
    select: {
      id: true,
      orderItems: {
        select: {
          productId: true,
        },
      },
    },
  });

  await db.$transaction([
    ...orders.flatMap((order) =>
      order.orderItems.map((item) =>
        db.product.update({
          where: {
            id: item.productId,
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        })
      )
    ),
    db.order.updateMany({
      where: {
        id: {
          in: orders.map((order) => order.id),
        },
      },
      data: {
        status: "Failed",
      },
    }),
  ]);

  res.status(200).end();
}
