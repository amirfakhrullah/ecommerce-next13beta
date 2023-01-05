import { notFound } from "next/navigation";
import { use } from "react";
import Border from "../../../components/Border";
import BackButton from "../../../components/buttons/BackButton";
import ProductSection from "../../../components/sections/ProductSection";
import ProductSuggestionSection from "../../../components/sections/ProductSuggestionSection";
import { fetchProductById } from "../../../handlers/fetchProducts";

interface PageProps {
  params: {
    productId: string;
  };
}

const ProductIdPage = ({ params: { productId } }: PageProps) => {
  const product = use(fetchProductById(productId));

  if (!product) {
    return notFound();
  }

  return (
    <>
      <BackButton />
      <Border />
      <ProductSection product={product} />
      <ProductSuggestionSection product={product} />
    </>
  );
};

export default ProductIdPage;
