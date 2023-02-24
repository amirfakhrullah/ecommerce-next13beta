import { PrismaClient } from "@prisma/client";
import { initCategories } from "./seedData/categories";
import { initProducts } from "./seedData/products";

const prisma = new PrismaClient();

const seed = async () => {
  const [categoryOutputs, productOutputs] = await prisma.$transaction([
    prisma.category.createMany({
      data: initCategories,
      skipDuplicates: true,
    }),
    prisma.product.createMany({
      data: initProducts,
      skipDuplicates: true,
    }),
  ]);
  console.log("categoryOutputs =>", categoryOutputs);
  console.log("productOutputs =>", productOutputs);
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
