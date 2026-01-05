"use client";
import Link from "next/link";
import StoreShell from "../../components/store/StoreShell";
import styles from "../../components/HomeLanding.module.css";
import { getCart, clearCart } from "../../lib/cart";
import { products } from "../../lib/products";

const DISCOUNT = 0.1;

export default function CartPage() {
  const items = typeof window !== "undefined" ? getCart() : [];
  const detailed = items.map((it) => ({ ...it, product: products.find((p) => p.slug === it.slug) }));
  const total = detailed.reduce((s, it) => s + (it.product ? it.product.basePrice * (1 - DISCOUNT) * it.quantity : 0), 0);

  return (
    <StoreShell
      title="Your Cart"
      subtitle="Review items, then complete checkout with address, shipping, payment, and confirmation."
    >
      {detailed.length === 0 ? (
        <p className={styles.muted} style={{ marginTop: 0 }}>
          Your cart is empty. Browse <Link href="/shop">Shop</Link>.
        </p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {detailed.map((it) => (
            <div key={`${it.slug}-${JSON.stringify((it as any).variant ?? {})}`} className={styles.infoCard}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline" }}>
                <div>
                  <div style={{ fontWeight: 900 }}>{it.product?.name}</div>
                  <div className={styles.muted}>
                    {(it as any).variant
                      ? `Color: ${(it as any).variant.color} • Storage: ${(it as any).variant.storage}`
                      : null}
                  </div>
                  {(it as any).variant ? (
                    <div className={`${styles.muted} ${styles.small}`}>
                      {Object.entries((it as any).variant)
                        .filter(([k]) => k !== "color" && k !== "storage")
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(" • ")}
                    </div>
                  ) : null}
                  <div className={styles.muted}>
                    Qty: {it.quantity} • Line: $
                    {it.product ? (it.product.basePrice * (1 - DISCOUNT) * it.quantity).toFixed(2) : "0.00"}
                  </div>
                </div>
                <Link className={`${styles.btn} ${styles.ghost}`} href={`/product/${it.slug}`}>
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.sectionHead} style={{ marginTop: 18 }}>
        <div>
          <div className={styles.muted}>Subtotal (after 10% off)</div>
          <div style={{ fontWeight: 1000, fontSize: "1.4rem" }}>${total.toFixed(2)}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className={`${styles.btn} ${styles.ghost}`}
            type="button"
            onClick={() => {
              clearCart();
              window.location.reload();
            }}
          >
            Clear Cart
          </button>
          <Link className={`${styles.btn} ${styles.primary}`} href="/checkout">
            Secure Checkout
          </Link>
        </div>
      </div>

      <div className={`${styles.muted} ${styles.small}`} style={{ marginTop: 10 }}>
        Taxes and shipping are calculated at checkout. See <Link href="/policies/refund">Refund</Link> and{" "}
        <Link href="/policies/shipping">Shipping</Link> policies.
      </div>
    </StoreShell>
  );
}
