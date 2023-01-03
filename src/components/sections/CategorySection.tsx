import { fetchAllCategories } from "../../handlers/fetchAllCategories";
import Border from "../Border";
import SeeAllButton from "../buttons/SeeAllButton";
import { CategoryCard } from "../cards/CategoryCard";

const CategorySection = async ({
  displaySeeAllButton = true,
  displayTotal = false,
}: {
  displaySeeAllButton?: boolean;
  displayTotal?: boolean;
}) => {
  const categories = await fetchAllCategories();

  return (
    <>
      <Border />
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <div className="mx-auto max-w-6xl flex flex-row items-center justify-between mb-4">
          <h2 className="text-2xl font-black">
            Sneaker Types {displayTotal && `(${categories.length})`} 🚀
          </h2>
          {displaySeeAllButton && <SeeAllButton route="/categories" />}
        </div>
        <div className="mx-auto max-w-6xl w-full grid sm:grid-cols-2  grid-cols-1 gap-2">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategorySection;
