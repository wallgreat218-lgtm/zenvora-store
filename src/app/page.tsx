import DealsCarousel from "../components/DealsCarousel";
import CategoryGrid from "../components/CategoryGrid";
import Hero from "../components/Hero";
import Reveal from "../components/Reveal";
import { products } from "../lib/products";

export default function Home() {
  const pickFirst = (category: (typeof products)[number]["category"]) =>
    products.find((p) => p.category === category);

  const heroProducts = [
    pickFirst("phones"),
    pickFirst("laptops"),
    pickFirst("audio"),
    pickFirst("wearables"),
    pickFirst("tvs"),
    pickFirst("accessories"),
    products[3],
    products[7],
    products[11],
    products[15]
  ]
    .filter(Boolean)
    .slice(0, 10)
    .map((p) => ({ slug: p!.slug, name: p!.name, category: p!.category, image: p!.image }));

  return (
    <div className="space-y-10">
      <Reveal>
        <Hero products={heroProducts} />
      </Reveal>
      <CategoryGrid />
      <Reveal delay={0.05}>
        <div id="deals">
          <DealsCarousel products={products} />
        </div>
      </Reveal>
    </div>
  );
}
