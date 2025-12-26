"use client";
import { getCart, clearCart } from "../../lib/cart";
import { products } from "../../lib/products";

const STRIPE_ENABLED = false;

export default function CartPage() {
  const items = typeof window !== "undefined" ? getCart() : [];
  const detailed = items.map((it) => ({ ...it, product: products.find((p) => p.slug === it.slug) }));
  const total = detailed.reduce((s, it) => s + (it.product ? it.product.price * it.quantity : 0), 0);

  function checkout() {
    // placeholder for real checkout
    alert("Checkout flow not implemented in scaffold");
  }

  return (
    <div>
      <h1>Your Cart</h1>
      {detailed.length === 0 && <p>Your cart is empty.</p>}
      {detailed.map((it) => (
        <div key={it.slug} style={{ borderBottom: "1px solid #eee", padding: 8 }}>
          <strong>{it.product?.name}</strong> x {it.quantity} — ${it.product ? it.product.price * it.quantity : 0}
        </div>
      ))}
      <p style={{ marginTop: 12 }}>Total: ${total}</p>
      <button
        className="btn"
        style={{ marginTop: 14, opacity: STRIPE_ENABLED ? 1 : 0.6 }}
        onClick={() => {
          if (!STRIPE_ENABLED) {
            alert("Payments coming soon. Please check back shortly.");
            return;
          }
          checkout();
        }}
      >
        Secure Checkout (Coming Soon)
      </button>
      <button className="btn" style={{ marginLeft: 8 }} onClick={() => { clearCart(); window.location.reload(); }}>
        Clear Cart
      </button>
    </div>
  );
}
