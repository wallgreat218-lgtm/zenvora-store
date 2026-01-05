import Link from "next/link";
import StoreShell from "../../components/store/StoreShell";

export default function ContactPage() {
  return (
    <StoreShell title="Contact" subtitle="Fast support, clear answers, and policy links in one place.">
      <p style={{ marginTop: 0 }}>
        Email: <a href="mailto:support@zenvoraelectronics.com">support@zenvoraelectronics.com</a>
      </p>
      <p>
        Phone: <a href="tel:+18007789368672">+1 (800) 778-ZEN-VORA</a>
      </p>
      <p>
        Looking for shipping details? See <Link href="/shipping-returns">Shipping &amp; returns</Link>.
      </p>
    </StoreShell>
  );
}
