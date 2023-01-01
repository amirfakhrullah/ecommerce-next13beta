import { notFound } from "next/navigation";
import Border from "../../../components/Border";
import BackButton from "../../../components/buttons/BackButton";
import ProductSection from "../../../components/sections/ProductSection/ProductSection";
import { fetchProductById } from "../../../server/handlers/fetchProducts";

interface PageProps {
  params: {
    productId: string;
  };
}

const ProductIdPage = async ({ params: { productId } }: PageProps) => {
  const product = await fetchProductById(productId);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <BackButton />
      <Border />
      <ProductSection product={product} />
    </>
  );
};

export default ProductIdPage;
