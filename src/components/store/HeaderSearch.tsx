"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "../HomeLanding.module.css";

export default function HeaderSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentQ = searchParams.get("q") ?? "";
  const [value, setValue] = useState(currentQ);

  useEffect(() => {
    setValue(currentQ);
  }, [currentQ]);

  const nextHref = useMemo(() => {
    const v = value.trim();
    if (!v) return "/shop";
    const sp = new URLSearchParams();
    sp.set("q", v);
    return `/shop?${sp.toString()}`;
  }, [value]);

  useEffect(() => {
    if (pathname !== "/shop") return;
    // Real-time filtering on /shop via querystring updates.
    const t = window.setTimeout(() => {
      router.replace(nextHref, { scroll: false });
    }, 120);
    return () => window.clearTimeout(t);
  }, [value, pathname, nextHref, router]);

  return (
    <div className={styles.searchWrap}>
      <input
        className={styles.search}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products…"
        aria-label="Search products"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(nextHref);
          }
        }}
      />
    </div>
  );
}
