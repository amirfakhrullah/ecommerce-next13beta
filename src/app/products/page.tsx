import Border from "../../components/Border";
import BackButton from "../../components/buttons/BackButton";
import AllProductsSection from "../../components/sections/AllProductsSection";

interface PageProps {
  searchParams: {
    page: any;
  };
}

const ProductsPage = ({ searchParams: { page } }: PageProps) => {
  const pageNum = typeof page === "string" ? parseInt(page) : 1;
  return (
    <>
      <BackButton routeTo={page ? "/" : undefined} />
      <Border />
      <AllProductsSection page={pageNum || 1} />
    </>
  );
};

export default ProductsPage;
