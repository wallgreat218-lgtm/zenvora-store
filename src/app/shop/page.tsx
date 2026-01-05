import { products } from "../../lib/products";
import ProductCard from "../../components/ProductCard";
import StoreShell from "../../components/store/StoreShell";
import styles from "../../components/HomeLanding.module.css";

export default function Shop() {
  return (
    <StoreShell title="Shop" subtitle="Premium devices with clear pricing and fast support.">
      <div className={styles.grid} aria-live="polite">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </StoreShell>
  );
}
