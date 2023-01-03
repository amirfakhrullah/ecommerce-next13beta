import BackButton from "../../components/buttons/BackButton";
import CategorySection from "../../components/sections/CategorySection";

const CategoriesPage = () => {
  return (
    <div>
      <BackButton />
      <CategorySection displaySeeAllButton={false} displayTotal />
    </div>
  );
};

export default CategoriesPage;
