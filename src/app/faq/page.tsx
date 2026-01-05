import Link from "next/link";
import StoreShell from "../../components/store/StoreShell";

export default function FAQPage() {
  return (
    <StoreShell title="FAQ" subtitle="Quick answers to the most common questions.">
      <h3 style={{ marginTop: 0 }}>How long does shipping take?</h3>
      <p>
        Shipping times vary by destination. See <Link href="/shipping-returns">Shipping &amp; returns</Link>.
      </p>

      <h3 style={{ marginTop: 16 }}>What is your return policy?</h3>
      <p>
        See <Link href="/refund-policy">Refund policy</Link> for details.
      </p>

      <h3 style={{ marginTop: 16 }}>How do I contact support?</h3>
      <p>
        Use the info on the <Link href="/contact">Contact</Link> page.
      </p>
    </StoreShell>
  );
}
