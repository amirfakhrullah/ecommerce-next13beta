import { fetchProductSuggestions } from "../../handlers/fetchProductsByCategory";
import { FullProductClient } from "../../types/types";
import Border from "../Border";
import SeeAllButton from "../buttons/SeeAllButton";
import ProductGrids from "../ProductGrids";

interface ProductSuggestionSectionProps {
  product: FullProductClient;
}

const ProductSuggestionSection = async ({
  product,
}: ProductSuggestionSectionProps) => {
  const { id: skipProductId, categoryId, category } = product;
  const productSuggestions = await fetchProductSuggestions({
    categoryId,
    skipProductId,
    limit: 6,
  });

  return (
    <>
      <Border />
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <div className="mx-auto max-w-6xl flex flex-row items-center justify-between mb-4">
          <h2 className="text-2xl font-black">More {category.name}:</h2>
          <SeeAllButton route="/products" />
        </div>
        <ProductGrids products={productSuggestions} />
      </div>
    </>
  );
};

export default ProductSuggestionSection;
