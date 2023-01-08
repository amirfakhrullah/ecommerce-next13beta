import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  // const orders = await prisma.order.updateMany({
  //   where: {
  //     status: "InProgress"
  //   },
  //   data: {
  //     status: "Failed"
  //   }
  // })
  // console.log(orders);
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
