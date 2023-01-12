import { PrismaClient } from "@prisma/client";
import { data } from "./data";

const prisma = new PrismaClient();

/**
 * Not used for seeding. I'm using this to update date :(
 */
const seed = async () => {
  const products = await prisma.product.createMany({
    data,
  });
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
