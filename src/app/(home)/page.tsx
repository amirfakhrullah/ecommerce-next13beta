import Hero from "../../components/heros/Hero";
import PopularProductsSection from "../../components/sections/PopularProductsSection";
import CategorySection from "../../components/sections/CategorySection";

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularProductsSection />
      <CategorySection />
    </div>
  );
}
