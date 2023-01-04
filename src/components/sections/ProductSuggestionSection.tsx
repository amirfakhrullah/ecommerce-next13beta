"use client";

import { toast } from "react-hot-toast";
import { trpc } from "../../providers/trpcProvider";
import { FullProductClient } from "../../types/types";
import Border from "../Border";
import SeeAllButton from "../buttons/SeeAllButton";
import Loader from "../Loader";
import ProductGrids from "../ProductGrids";

interface ProductSuggestionSectionProps {
  product: FullProductClient;
}

const ProductSuggestionSection = ({
  product,
}: ProductSuggestionSectionProps) => {
  const { id: skipProductId, categoryId, category } = product;
  const { isLoading, data: productSuggestions } = trpc.suggestProducts.useQuery(
    {
      categoryId,
      skipProductId,
      limit: 6,
    },
    {
      onError: (err) => toast(err.message),
    }
  );

  return (
    <>
      <Border />
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <div className="mx-auto max-w-6xl flex flex-row items-center justify-between mb-4">
          <h2 className="text-2xl font-black">More {category.name}:</h2>
          <SeeAllButton route="/products" />
        </div>
        {isLoading || typeof productSuggestions === "undefined" ? (
          <Loader />
        ) : (
          <ProductGrids products={productSuggestions} />
        )}
      </div>
    </>
  );
};

export default ProductSuggestionSection;
