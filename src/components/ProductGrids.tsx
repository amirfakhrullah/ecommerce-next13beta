import { FullProductClient } from "../types/types";
import ProductCard from "./cards/ProductCard";
import NotFoundText from "./NotFoundText";

interface ProductGridProps {
  products: FullProductClient[];
  handleClickAfter?: () => void;
}

const ProductGrids = ({ products, handleClickAfter }: ProductGridProps) => {
  if (!products.length) {
    return <NotFoundText>No Product Found.</NotFoundText>;
  }

  return (
    <div className="mx-auto max-w-6xl w-full grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-1">
      {products.map((product) => (
        <ProductCard
          {...product}
          handleClickAfter={handleClickAfter}
          key={product.id}
        />
      ))}
    </div>
  );
};

export default ProductGrids;
