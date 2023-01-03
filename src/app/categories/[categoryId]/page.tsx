import { notFound } from "next/navigation";
import Border from "../../../components/Border";
import BackButton from "../../../components/buttons/BackButton";
import CategoryHero from "../../../components/heros/CategoryHero";
import FilterProductsByCategory from "../../../components/sections/FilterProductsByCategory";
import { fetchProductsByCategory } from "../../../handlers/fetchProductsByCategory";

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
      <BackButton />
      <Border />
      <CategoryHero category={category} />
      <FilterProductsByCategory category={category} products={products} />
    </div>
  );
};

export default CategoryIdPage;
