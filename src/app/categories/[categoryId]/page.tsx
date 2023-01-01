import { notFound } from "next/navigation";
import React from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import CategoryHero from "../../../components/heros/CategoryHero";
import FilterProductsByCategory from "../../../components/sections/FilterProductsByCategory";
import db from "../../../lib/prismadb";

const fetchProductsByCategory = async (categoryId: string) => {
  const [category, products] = await db.$transaction([
    db.category.findFirst({
      where: {
        id: categoryId,
      },
    }),
    db.product.findMany({
      where: {
        categoryId,
      },
      include: {
        category: true,
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    }),
  ]);
  return {
    category,
    products: products.map((product) => ({
      ...product,
      // decimal cannot be rendered on the client side later on, so we convert it to string
      sizes: product.sizes.map((size) => size.toString()),
    })),
  };
};

interface PageProps {
  params: {
    categoryId: string;
  };
}
const CategoryIdPage = async ({ params: { categoryId } }: PageProps) => {
  const { category, products } = await fetchProductsByCategory(categoryId);

  if (!category) {
    return notFound();
  }

  return (
    <div>
      <Header />
      <CategoryHero category={category}  />
      {/* @ts-expect-error Server Component */}
      <FilterProductsByCategory products={products} />
      <Footer />
    </div>
  );
};

export default CategoryIdPage;
