import { products } from "../../lib/products";
import ProductCard from "../../components/ProductCard";
import StoreShell from "../../components/store/StoreShell";
import styles from "../../components/HomeLanding.module.css";

export default function Shop({ searchParams }: { searchParams?: { q?: string } }) {
  const q = (searchParams?.q ?? "").trim().toLowerCase();
  const filtered = q
    ? products.filter((p) => `${p.title} ${p.subtitle}`.toLowerCase().includes(q))
    : products;
  return (
    <StoreShell title="Shop" subtitle="Premium devices with clear pricing and fast support.">
      <div className={styles.grid} aria-live="polite">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </StoreShell>
  );
}
