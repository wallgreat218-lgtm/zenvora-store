import Link from "next/link";
import StoreShell from "../../components/store/StoreShell";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Zenvora Electronics support for order questions, shipping, and policy help."
};

export default function ContactPage() {
  return (
    <StoreShell title="Contact" subtitle="Fast support, clear answers, and policy links in one place.">
      <p style={{ marginTop: 0 }}>
        Email: <a href="mailto:contact@zenvoraelectronics.store">contact@zenvoraelectronics.store</a>
      </p>
      <p>
        Phone: <a href="tel:+12193899442">+1 (219) 389-9442</a>
      </p>
      <p>
        Business Address: 2664 POPLAR ST, PORTAGE, IN 46368
      </p>
      <p>
        Looking for shipping details? See <Link href="/shipping-returns">Shipping &amp; returns</Link>.
      </p>
    </StoreShell>
  );
}
