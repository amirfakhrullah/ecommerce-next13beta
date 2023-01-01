import { notFound } from "next/navigation";
import React from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import CategoryHero from "../../../components/heros/CategoryHero";
import FilterProductsByCategory from "../../../components/sections/FilterProductsByCategory";
import { fetchProductsByCategory } from "../../../server/handlers/fetchProductsByCategory";

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
      <FilterProductsByCategory category={category} products={products} />
      <Footer />
    </div>
  );
};

export default CategoryIdPage;
