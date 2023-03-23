import { Status } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import env from "../../../env";
import db from "../../../lib/servers/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const key = req.headers["x-api-key"];
  if (!key || key !== env.CRON_API_KEY) {
    return res.status(401).end();
  }

  const timeRange = {
    lte: (() => {
      const date = new Date();
      date.setMinutes(date.getMinutes() - 5);
      return date;
    })(),
  };

  const orders = await db.order.findMany({
    where: {
      status: {
        in: [Status.Created, Status.NotPaid, Status.Processing],
      },
      OR: [
        {
          createdAt: timeRange,
        },
        {
          updatedAt: timeRange,
        },
      ],
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

  if (orders.length === 0) {
    return res.status(200).end();
  }

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
            updatedAt: new Date(),
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
        status: Status.Failed,
        updatedAt: new Date(),
      },
    }),
  ]);

  return res.status(200).end();
}
