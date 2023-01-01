import { notFound } from "next/navigation";
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
    <div>
      <h1 className="text-center font-bold text-xl">This page is in WIP</h1>
      {JSON.stringify(product)}
    </div>
  );
};

export default ProductIdPage;
