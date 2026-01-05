"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import StoreShell from "../../../components/store/StoreShell";
import styles from "./ProductPage.module.css";
import { products } from "../../../lib/products";
import { addToCart, type CartVariant } from "../../../lib/cart";

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

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  const images = useMemo(() => {
    if (!product) return [] as string[];
    return product.images;
  }, [product]);

  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState<string>(product?.colors?.[0] ?? "");
  const [storage, setStorage] = useState<string>(product?.storages?.[0] ?? "");
  const [config, setConfig] = useState<Record<string, string>>(() => {
    const first: Record<string, string> = {};
    for (const c of product?.configs ?? []) {
      first[c.label] = c.options[0] ?? "";
    }
    return first;
  });

  if (!product) {
    return (
      <StoreShell title="Product" subtitle="We couldn’t find that item.">
        <p style={{ marginTop: 0 }}>
          Product not found. Back to <Link href="/shop">Shop</Link>.
        </p>
      </StoreShell>
    );
  }

  const now = discounted(product.basePrice);
  const save = +(product.basePrice - now).toFixed(2);

  const ready = Boolean(color && storage);

  function handleAdd() {
    if (!ready) {
      alert("Please select color and storage before adding to cart.");
      return;
    }
    const variant: CartVariant = {
      color,
      storage,
      ...config
    };
    addToCart(product.slug, variant, 1);
    window.location.href = "/cart";
  }

  return (
    <StoreShell title={product.name} subtitle={product.description}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.media}>
            <img className={styles.mainImg} src={images[activeImg]} alt={product.name} />
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
            <div className={styles.kicker}>ZENVORA ELECTRONICS • 10% OFF</div>
            <div className={styles.title}>{product.name}</div>

            <div className={styles.row}>
              <select className={styles.select} value={color} onChange={(e) => setColor(e.target.value)} aria-label="Color">
                {product.colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select className={styles.select} value={storage} onChange={(e) => setStorage(e.target.value)} aria-label="Storage">
                {product.storages.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {(product.configs ?? []).length > 0 ? (
              <div className={styles.row}>
                {(product.configs ?? []).map((c) => (
                  <select
                    key={c.label}
                    className={styles.select}
                    value={config[c.label] ?? ""}
                    onChange={(e) => setConfig({ ...config, [c.label]: e.target.value })}
                    aria-label={c.label}
                  >
                    {c.options.map((o) => (
                      <option key={o} value={o}>
                        {c.label}: {o}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            ) : null}

            <div className={styles.pricing}>
              <div>
                <div className={styles.now}>{fmt(now)}</div>
                <div className={styles.was}>{fmt(product.basePrice)}</div>
                <div className={styles.save}>You save {fmt(save)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "rgba(238,242,255,.72)" }}>Availability</div>
                <div style={{ fontWeight: 900 }}>{product.availability}</div>
              </div>
            </div>

            <div className={styles.ctaRow}>
              <button className="btn" type="button" onClick={handleAdd} disabled={!ready}>
                Add to cart
              </button>
              <Link className="btn" href="/checkout">
                Buy now
              </Link>
            </div>

            <div style={{ marginTop: 16 }}>
              <table className={styles.table} aria-label="Technical specifications">
                <tbody>
                  <tr>
                    <td>Selected Color</td>
                    <td>{color}</td>
                  </tr>
                  <tr>
                    <td>Selected Storage</td>
                    <td>{storage}</td>
                  </tr>
                  {Object.entries(config).map(([k, v]) => (
                    <tr key={k}>
                      <td>{k}</td>
                      <td>{v}</td>
                    </tr>
                  ))}
                  {product.specs.map((s) => (
                    <tr key={s.label}>
                      <td>{s.label}</td>
                      <td>{s.value}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Warranty</td>
                    <td>{product.warranty}</td>
                  </tr>
                  <tr>
                    <td>Returns</td>
                    <td>
                      {product.returns} <Link href="/policies/refund">Refund Policy</Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </StoreShell>
  );
}
