import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  const products = await prisma.product.updateMany({
    where: {
      quantity: 0
    },
    data: {
      quantity: 1
    }
  })
  console.log(products);
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
