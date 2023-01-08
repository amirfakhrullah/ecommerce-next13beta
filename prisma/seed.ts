import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ids = [""];
const seed = async () => {
  const products = await prisma.product.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      sizes: [
        3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5,
        12, 12.5, 13, 13.5, 14, 14.5, 15, 16, 17, 18,
      ],
    },
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
