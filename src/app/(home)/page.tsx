import Hero from "../../components/Hero";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PopularProductsSection from "../../components/PopularProductsSection";
import CategorySection from "../../components/CategorySection";

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
