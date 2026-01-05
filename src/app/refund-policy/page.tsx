import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <div>
      <h1>Refund policy</h1>
      <p>
        If your item arrives damaged or incorrect, please contact support as soon as possible so we can
        help.
      </p>
      <p style={{ marginTop: 12 }}>
        Questions? Visit <Link href="/contact">Contact</Link>.
      </p>
    </div>
  );
}
