"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./ProductPage.module.css";
import type { Product } from "../../../lib/products";
import { addToCart } from "../../../lib/cart";

function fmt(n: number) {
  return `$${Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const images = useMemo(() => [product.images.primary, product.images.secondary], [product.images.primary, product.images.secondary]);
  const [activeImg, setActiveImg] = useState(0);

  const colors = product.variants?.colors ?? [];
  const storageOptions = product.variants?.storage ?? [];
  const needsColor = colors.length > 0;
  const needsStorage = storageOptions.length > 0;

  const [color, setColor] = useState<string>("");
  const [storage, setStorage] = useState<string>("");
  const [added, setAdded] = useState(false);

  const ready = (!needsColor || Boolean(color)) && (!needsStorage || Boolean(storage));

  function handleAdd() {
    if (!ready) return;
    const v: Record<string, string> = {};
    if (needsColor && color) v.color = color;
    if (needsStorage && storage) v.storage = storage;
    addToCart(product.slug, Object.keys(v).length ? v : undefined, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.media}>
          <img className={styles.mainImg} src={images[activeImg]} alt={product.title} />
          <div className={styles.thumbs} aria-label="Product gallery">
            {images.map((src, idx) => (
              <button
                key={`${product.slug}-${idx}`}
                type="button"
                className={`${styles.thumbBtn} ${idx === activeImg ? styles.thumbBtnActive : ""}`}
                onClick={() => setActiveImg(idx)}
                aria-label={`View image ${idx + 1}`}
              >
                <img className={styles.thumbImg} src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.body}>
          <div className={styles.kicker}>ZENVORA ELECTRONICS</div>
          <div className={styles.title}>{product.title}</div>

          {product.inStock ? (
            <div className={styles.stockBadge}>
              <span className={styles.stockDot} /> In stock
            </div>
          ) : null}

          {product.subtitle ? <p style={{ marginTop: 12, color: "rgba(238,242,255,.75)" }}>{product.subtitle}</p> : null}

          {needsColor ? (
            <div className={styles.row}>
              <select className={styles.select} value={color} onChange={(e) => setColor(e.target.value)} aria-label="Color">
                <option value="" disabled>
                  Select color
                </option>
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {needsStorage ? (
            <div className={styles.row}>
              <select className={styles.select} value={storage} onChange={(e) => setStorage(e.target.value)} aria-label="Storage">
                <option value="" disabled>
                  Select storage
                </option>
                {storageOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className={styles.pricing}>
            <div>
              <div className={styles.now}>{fmt(product.price)}</div>
              {typeof product.compareAt === "number" ? <div className={styles.was}>{fmt(product.compareAt)}</div> : null}
              {typeof product.compareAt === "number" ? (
                <div className={styles.save}>You save {fmt(Math.max(0, product.compareAt - product.price))}</div>
              ) : null}
            </div>
          </div>

          <div className={styles.ctaRow}>
            <button className="btn" type="button" onClick={handleAdd} disabled={!ready}>
              Add to cart
            </button>
            <Link className="btn" href="/cart">
              View cart
            </Link>
          </div>

          {added ? <div className={styles.addedNote}>Added to cart</div> : null}

          <div style={{ marginTop: 16 }}>
            <table className={styles.table} aria-label="Product details">
              <tbody>
                <tr>
                  <td>Category</td>
                  <td>{product.category}</td>
                </tr>
                {needsColor ? (
                  <tr>
                    <td>Selected Color</td>
                    <td>{color || "—"}</td>
                  </tr>
                ) : null}
                {needsStorage ? (
                  <tr>
                    <td>Selected Storage</td>
                    <td>{storage || "—"}</td>
                  </tr>
                ) : null}
                <tr>
                  <td>Policies</td>
                  <td>
                    <Link href="/policies/shipping">Shipping</Link> • <Link href="/policies/refund">Refunds</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
