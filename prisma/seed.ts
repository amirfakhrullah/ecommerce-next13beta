import { PrismaClient } from "@prisma/client";
import { data } from "./data";

const prisma = new PrismaClient();

const seed = async () => {
  const timeRange = {
    lte: (() => {
      const date = new Date();
      date.setMinutes(date.getMinutes() - 5);
      return date;
    })(),
  };
  const orders = await prisma.order.findMany({
    where: {
      OR: [
        {
          createdAt: timeRange,
        },
        {
          updatedAt: timeRange,
        },
      ],
    },
  });
  console.log(orders);
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
