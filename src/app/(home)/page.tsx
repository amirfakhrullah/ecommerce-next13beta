import Hero from "../../components/Hero";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PopularProductsSection from "../../components/sections/PopularProductsSection";
import CategorySection from "../../components/sections/CategorySection";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      {/* @ts-expect-error Server Component */}
      <PopularProductsSection />
      {/* @ts-expect-error Server Component */}
      <CategorySection />
      <Footer />
    </div>
  );
}
