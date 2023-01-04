import Border from "../../components/Border";
import BackButton from "../../components/buttons/BackButton";
import AllProductsSection from "../../components/sections/AllProductsSection";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

const ProductsPage = ({ searchParams: { page } }: PageProps) => {
  const pageNum = page ? parseInt(page) : 1;
  return (
    <>
      <BackButton routeTo={page ? "/" : undefined} />
      <Border />
      <AllProductsSection page={pageNum || 1} />
    </>
  );
};

export default ProductsPage;
