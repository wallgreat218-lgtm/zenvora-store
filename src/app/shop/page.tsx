import Link from "next/link";
import { products } from "../../lib/products";
import ProductCard from "../../components/ProductCard";
import StoreShell from "../../components/store/StoreShell";
import styles from "../../components/HomeLanding.module.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse premium smartphones, laptops, TVs, and accessories with clear pricing and fast support."
};

type Category = "all" | "phones" | "laptops" | "tv";

function classifyProduct(slug: string, title: string): Exclude<Category, "all"> | "other" {
  const s = slug.toLowerCase();
  const t = title.toLowerCase();
  if (s.includes("iphone") || t.includes("iphone")) return "phones";
  if (s.includes("lenovo") || t.includes("lenovo") || t.includes("thinkpad") || t.includes("legion")) return "laptops";
  if (s.includes("tv") || t.includes("tv") || t.includes("bravia")) return "tv";
  return "other";
}

function normalizeCategory(v: unknown): Category {
  if (v === "phones" || v === "laptops" || v === "tv") return v;
  return "all";
}

export default function Shop({
  searchParams
}: {
  searchParams?: {
    q?: string;
    category?: string;
  };
}) {
  const qRaw = (searchParams?.q ?? "").trim();
  const q = qRaw.toLowerCase();
  const category = normalizeCategory(searchParams?.category);

  const filtered = q
    ? products.filter((p) => `${p.title} ${p.subtitle}`.toLowerCase().includes(q))
    : products;

  const byCategory = category === "all" ? filtered : filtered.filter((p) => classifyProduct(p.slug, p.title) === category);

  const catHref = (next: Category) => {
    const sp = new URLSearchParams();
    if (qRaw) sp.set("q", qRaw);
    if (next !== "all") sp.set("category", next);
    const qs = sp.toString();
    return qs ? `/shop?${qs}` : "/shop";
  };

  return (
    <StoreShell title="Shop" subtitle="Premium devices with clear pricing and fast support.">
      <div className={styles.filters} style={{ marginBottom: 14 }}>
        <Link className={`${styles.chip} ${category === "all" ? styles.active : ""}`} href={catHref("all")} scroll={false}>
          All
        </Link>
        <Link className={`${styles.chip} ${category === "phones" ? styles.active : ""}`} href={catHref("phones")} scroll={false}>
          iPhone
        </Link>
        <Link className={`${styles.chip} ${category === "laptops" ? styles.active : ""}`} href={catHref("laptops")} scroll={false}>
          Laptops
        </Link>
        <Link className={`${styles.chip} ${category === "tv" ? styles.active : ""}`} href={catHref("tv")} scroll={false}>
          TV
        </Link>
      </div>
      <div className={styles.grid} aria-live="polite">
        {byCategory.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </StoreShell>
  );
}
