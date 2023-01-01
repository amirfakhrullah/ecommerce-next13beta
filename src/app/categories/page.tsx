import CategorySection from "../../components/sections/CategorySection";

const CategoriesPage = () => {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <CategorySection />
    </div>
  );
};

export default CategoriesPage;
