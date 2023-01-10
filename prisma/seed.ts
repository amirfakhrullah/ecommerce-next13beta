import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Not used for seeding. I'm using this to update date :(
 */
const seed = async () => {
  const products = await prisma.product.updateMany({
    data: {
      quantity: {
        increment: 100
      }
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
