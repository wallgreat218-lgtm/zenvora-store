"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "../../components/HomeLanding.module.css";
import ProductCard from "../../components/ProductCard";
import { products } from "../../lib/products";

type Category = "all" | "phones" | "laptops" | "tv";

type ProductKind = Exclude<Category, "all"> | "other";

function classifyProduct(slug: string, title: string): ProductKind {
  const s = slug.toLowerCase();
  const t = title.toLowerCase();
  if (s.includes("iphone") || t.includes("iphone")) return "phones";
  if (s.includes("lenovo") || t.includes("lenovo") || t.includes("thinkpad") || t.includes("legion")) return "laptops";
  if (s.includes("tv") || t.includes("tv") || t.includes("bravia")) return "tv";
  return "other";
}

function normalizeCategory(v: string | null): Category {
  const s = (v ?? "").trim().toLowerCase();
  if (s === "phones" || s === "laptops" || s === "tv") return s;
  return "all";
}

export default function ShopClient() {
  const pathname = usePathname();
  const params = useSearchParams();

  const qRaw = (params.get("q") ?? "").trim();
  const q = qRaw.toLowerCase();
  const category = normalizeCategory(params.get("category"));

  const filtered = useMemo(() => {
    const byQuery = q
      ? products.filter((p) => `${p.title} ${p.subtitle}`.toLowerCase().includes(q))
      : products;

    if (category === "all") return byQuery;
    return byQuery.filter((p) => classifyProduct(p.slug, p.title) === category);
  }, [q, category]);

  const catHref = (next: Category) => {
    const sp = new URLSearchParams(params.toString());
    if (next === "all") sp.delete("category");
    else sp.set("category", next);

    if (!qRaw) sp.delete("q");

    const qs = sp.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <>
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

      <div className={styles.grid} aria-live="polite" key={`${pathname}?${params.toString()}`}>
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
