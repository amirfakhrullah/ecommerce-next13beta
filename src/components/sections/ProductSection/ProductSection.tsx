import Image from "next/image";
import { displayNumbers } from "../../../helpers/numbers";
import { FullProductClient } from "../../../types/types";
import ProductCart from "./ProductCart";

interface ProductSectionProps {
  product: FullProductClient;
}

const ProductSection = ({ product }: ProductSectionProps) => {
  const { id, image, name, price, description } = product;

  return (
    <div className="mx-auto max-w-6xl sm:p-5 px-2 py-5">
      <div className="flex md:flex-row flex-col justify-around">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={image}
            alt={id}
            priority={true}
            height={350}
            width={350}
            className="w-auto"
          />
        </div>

        <div className="md:flex-[0.6]">
          <h2 className="md:text-3xl text-2xl font-black">{name}</h2>
          <h3 className="text-xl font-black pt-5 text-red-800">
            ${displayNumbers(price)}
          </h3>
          <ProductCart product={product} />
        </div>
      </div>
      <div className="pt-5 border-t border-zinc-300">
        <h2 className="text-2xl font-black mb-2">About The Sneaker:</h2>
        <p className="text-[16px]">{description}</p>
      </div>
    </div>
  );
};

export default ProductSection;
