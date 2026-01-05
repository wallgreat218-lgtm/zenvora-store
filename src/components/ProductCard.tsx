import Link from "next/link";
import { Product } from "../lib/products";
import styles from "./HomeLanding.module.css";

const DISCOUNT = 0.1;

function fmt(n: number) {
  return `$${Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}

function discounted(price: number) {
  return +(price * (1 - DISCOUNT)).toFixed(2);
}

function classify(product: Product) {
  const slug = product.slug.toLowerCase();
  const name = product.name.toLowerCase();
  if (slug.includes("iphone") || name.includes("iphone")) return "PHONE";
  if (slug.includes("lenovo") || name.includes("lenovo") || name.includes("thinkpad") || name.includes("legion")) return "LAPTOP";
  if (slug.includes("tv") || name.includes("tv") || name.includes("bravia")) return "TV";
  return "TECH";
}

export default function ProductCard({ product }: { product: Product }) {
  const imageSrc = product.images?.[0] ?? "/products/keyboard.svg";
  const now = discounted(product.basePrice);
  const tag = classify(product);
  return (
    <article className={styles.product}>
      <div className={styles.pTop}>
        <span className={styles.tag}>{tag}</span>
        <span className={`${styles.tag} ${styles.orange}`}>10% OFF</span>
      </div>

      <Link href={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
        <div className={styles.productMedia}>
          <img
            className={styles.productImg}
            src={imageSrc}
            alt={product.name}
            loading="lazy"
          />
          <div className={styles.productFallback} aria-hidden="true" />
        </div>

        <div className={styles.pTitle}>{product.name}</div>
      </Link>

      {product.description ? <p className={`${styles.muted} ${styles.pDesc}`}>{product.description}</p> : null}

      <div className={styles.pPrices}>
        <div>
          <div className={`${styles.muted} ${styles.small}`}>Now</div>
          <div className={styles.now}>{fmt(now)}</div>
          <div className={styles.was}>{fmt(product.basePrice)}</div>
        </div>
        <div className={styles.kbd}>-10%</div>
      </div>

      <div className={styles.pActions}>
        <Link className={`${styles.btn} ${styles.primary}`} href={`/product/${product.slug}`}>
          Select options
        </Link>
        <Link className={`${styles.btn} ${styles.ghost}`} href={`/product/${product.slug}`}>
          Details
        </Link>
      </div>
    </article>
  );
}
