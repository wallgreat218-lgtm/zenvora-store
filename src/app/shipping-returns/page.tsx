import Link from "next/link";

export default function ShippingReturnsPage() {
  return (
    <div>
      <h1>Shipping &amp; returns</h1>
      <p>
        Shipping options and delivery windows are shown at checkout. If you need help with an order,
        contact support.
      </p>
      <p style={{ marginTop: 12 }}>
        Returns are subject to our <Link href="/refund-policy">Refund policy</Link>.
      </p>
    </div>
  );
}
