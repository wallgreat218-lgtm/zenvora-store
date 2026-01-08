"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { addToCart } from "../lib/cart";
import type { Product } from "../lib/products";
import VariantSelectorModal, { type SelectedOptions } from "./VariantSelectorModal";
import styles from "./HomeLanding.module.css";

function fmt(n: number) {
  return `$${Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}

function classify(product: Product) {
  const slug = product.slug.toLowerCase();
  const name = product.title.toLowerCase();
  if (slug.includes("iphone") || name.includes("iphone")) return "PHONE";
  if (slug.includes("lenovo") || name.includes("lenovo") || name.includes("thinkpad") || name.includes("legion")) return "LAPTOP";
  if (slug.includes("tv") || name.includes("tv") || name.includes("bravia")) return "TV";
  return "TECH";
}

export default function ProductCard({ product }: { product: Product }) {
  const hasVariants = Boolean((product.variants?.colors?.length ?? 0) > 0 || (product.variants?.storage?.length ?? 0) > 0);
  const primary = product.images.primary;
  const secondary = product.images.secondary;

  const [showOptions, setShowOptions] = useState(false);
  const [added, setAdded] = useState(false);
  const [addedTimer, setAddedTimer] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimer) window.clearTimeout(addedTimer);
    };
  }, [addedTimer]);

  function flashAdded() {
    setAdded(true);
    if (addedTimer) window.clearTimeout(addedTimer);
    const t = window.setTimeout(() => setAdded(false), 1400);
    setAddedTimer(t);
  }

  function handleAddDirect() {
    addToCart(product.slug, undefined, 1);
    flashAdded();
  }

  function handleConfirm(opts: SelectedOptions) {
    const v: Record<string, string> = {};
    if (opts.color) v.color = opts.color;
    if (opts.storage) v.storage = opts.storage;
    addToCart(product.slug, Object.keys(v).length ? v : undefined, 1);
    setShowOptions(false);
    flashAdded();
  }

  const tag = classify(product);
  return (
    <article className={styles.product}>
      <div className={styles.pTop}>
        <span className={styles.tag}>{tag}</span>
        {product.inStock ? (
          <span className={styles.stockBadge}>
            <span className={styles.stockDot} /> In stock
          </span>
        ) : (
          <span className={`${styles.stockBadge} ${styles.orange}`}>Out of stock</span>
        )}
      </div>

      <Link href={`/product/${product.slug}`} aria-label={`View ${product.title}`}>
        <div className={styles.productMedia}>
          <img className={`${styles.productImg} ${styles.productImgPrimary}`} src={primary} alt={product.title} loading="lazy" />
          <img className={`${styles.productImg} ${styles.productImgSecondary}`} src={secondary} alt={product.title} loading="lazy" />
          <div className={styles.productFallback} aria-hidden="true" />
          {added ? <div className={styles.addedToast}>Added</div> : null}
        </div>

        <div className={styles.pTitle}>{product.title}</div>
      </Link>

      {product.subtitle ? <p className={`${styles.muted} ${styles.pDesc}`}>{product.subtitle}</p> : null}

      <div className={styles.pPrices}>
        <div>
          <div className={`${styles.muted} ${styles.small}`}>Price</div>
          <div className={styles.now}>{fmt(product.price)}</div>
          {typeof product.compareAt === "number" ? <div className={styles.was}>{fmt(product.compareAt)}</div> : null}
        </div>
        {typeof product.compareAt === "number" ? (
          <div className={styles.kbd}>Save {fmt(Math.max(0, product.compareAt - product.price))}</div>
        ) : null}
      </div>

      <div className={styles.pActions}>
        {hasVariants ? (
          <button className={`${styles.btn} ${styles.primary}`} type="button" onClick={() => setShowOptions(true)}>
            Select options
          </button>
        ) : (
          <button className={`${styles.btn} ${styles.primary}`} type="button" onClick={handleAddDirect}>
            Add to cart
          </button>
        )}
      </div>

      {hasVariants ? (
        <VariantSelectorModal open={showOptions} product={product} onClose={() => setShowOptions(false)} onConfirm={handleConfirm} />
      ) : null}
    </article>
  );
}
