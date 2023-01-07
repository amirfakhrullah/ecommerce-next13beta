import { use } from "react";
import { fetchAllCategories } from "../../server/handlers/categories/fetchAllCategories";
import Border from "../Border";
import SeeAllButton from "../buttons/SeeAllButton";
import { CategoryCard } from "../cards/CategoryCard";
import NotFoundText from "../NotFoundText";

const CategorySection = ({
  displaySeeAllButton = true,
  displayTotal = false,
}: {
  displaySeeAllButton?: boolean;
  displayTotal?: boolean;
}) => {
  const categories = use(fetchAllCategories());

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
        {categories.length ? (
          <div className="mx-auto max-w-6xl w-full grid sm:grid-cols-2  grid-cols-1 gap-2">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        ) : (
          <NotFoundText>No Sneaker Types Found.</NotFoundText>
        )}
      </div>
    </>
  );
};

export default CategorySection;
