import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout for Zenvora Electronics orders."
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
