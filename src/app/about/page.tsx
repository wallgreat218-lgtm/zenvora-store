import Link from "next/link";
import StoreShell from "../../components/store/StoreShell";

export default function AboutPage() {
  return (
    <StoreShell
      title="About Zenvora Electronics"
      subtitle="Zenvora Electronics is a US-based online electronics store focused on providing reliable devices, clear product details, and a smooth checkout experience. We prioritize secure payments, transparent policies, and responsive customer support."
    >
      <p style={{ marginTop: 0 }}>
        Zenvora Electronics curates phones, laptops, and TVs with a focus on clear pricing, fast dispatch, and a
        trust-first checkout experience.
      </p>
      <p>
        For privacy details, see <Link href="/policies/privacy">Privacy Policy</Link>.
      </p>
    </StoreShell>
  );
}
