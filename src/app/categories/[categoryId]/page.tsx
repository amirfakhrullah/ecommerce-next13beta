import { notFound } from "next/navigation";
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
      <CategoryHero category={category}  />
      {/* @ts-expect-error Server Component */}
      <FilterProductsByCategory category={category} products={products} />
    </div>
  );
};

export default CategoryIdPage;
