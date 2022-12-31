import Hero from "../../components/Hero";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PopularProducts from "../../components/PopularProducts";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      {/* @ts-expect-error Server Component */}
      <PopularProducts />
      <Footer />
    </div>
  );
}
