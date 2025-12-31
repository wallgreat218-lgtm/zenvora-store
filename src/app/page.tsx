import DealsCarousel from "../components/DealsCarousel";
import CategoryGrid from "../components/CategoryGrid";
import Hero from "../components/Hero";
import Reveal from "../components/Reveal";
import { products } from "../lib/products";

export default function Home() {
  return (
    <div className="space-y-10">
      <Reveal>
        <Hero />
      </Reveal>
      <CategoryGrid />
      <Reveal delay={0.05}>
        <DealsCarousel products={products} />
      </Reveal>
    </div>
  );
}
