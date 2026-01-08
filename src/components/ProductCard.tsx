"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "../lib/cart";
import type { Product } from "../lib/products";
import SelectOptionsModal, { type SelectedOptions } from "./SelectOptionsModal";
import AddedToCartModal from "./AddedToCartModal";
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
  const router = useRouter();
  const hasVariants = Boolean((product.variants?.colors?.length ?? 0) > 0 || (product.variants?.storage?.length ?? 0) > 0);
  const primary = product.images.primary;
  const secondary = product.images.secondary;

  const [showOptions, setShowOptions] = useState(false);
  const [showAddedModal, setShowAddedModal] = useState(false);

  function handleAddDirect() {
    addToCart(product.slug, undefined, 1);
    setShowAddedModal(true);
  }

  function handleConfirm(opts: SelectedOptions) {
    const v: Record<string, string> = {};
    if (opts.color) v.color = opts.color;
    if (opts.storage) v.storage = opts.storage;
    addToCart(product.slug, Object.keys(v).length ? v : undefined, 1);
    setShowOptions(false);
    setShowAddedModal(true);
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
        <SelectOptionsModal open={showOptions} product={product} onClose={() => setShowOptions(false)} onConfirm={handleConfirm} />
      ) : null}

      <AddedToCartModal
        open={showAddedModal}
        onClose={() => {
          setShowAddedModal(false);
          setShowOptions(false);
        }}
        onCheckout={() => {
          setShowAddedModal(false);
          setShowOptions(false);
          router.push("/checkout");
        }}
        productTitle={product.title}
        productImage={primary}
        price={fmt(product.price)}
      />
    </article>
  );
}
