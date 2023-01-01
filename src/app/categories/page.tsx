import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CategorySection from "../../components/sections/CategorySection";

const CategoriesPage = () => {
  return (
    <div>
      <Header />
      {/* @ts-expect-error Server Component */}
      <CategorySection />
      <Footer />
    </div>
  );
};

export default CategoriesPage;
