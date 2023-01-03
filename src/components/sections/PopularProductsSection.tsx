import { fetchPopularProducts } from "../../handlers/fetchProducts";
import Border from "../Border";
import SeeAllButton from "../buttons/SeeAllButton";
import ProductCard from "../cards/ProductCard";

const PopularProductsSection = async () => {
  const products = await fetchPopularProducts(12);

  return (
    <>
      <Border />
      <div className="sm:mx-3 px-2 sm:py-10 py-5">
        <div className="mx-auto max-w-6xl flex flex-row items-center justify-between mb-4">
          <h2 className="text-2xl font-black">
            Heat Sneakers 🔥
          </h2>
          <SeeAllButton route="/products" />
        </div>
        <div className="mx-auto max-w-6xl w-full grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-1">
          {products.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularProductsSection;
