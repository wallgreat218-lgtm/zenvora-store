import { Suspense } from "react";
import StoreShell from "../../components/store/StoreShell";
import ShopClient from "./ShopClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse premium smartphones, laptops, TVs, and accessories with clear pricing and fast support."
};
export default function Shop() {
  return (
    <StoreShell title="Shop" subtitle="Premium devices with clear pricing and fast support.">
      <Suspense fallback={null}>
        <ShopClient />
      </Suspense>
    </StoreShell>
  );
}
