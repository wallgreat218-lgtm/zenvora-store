"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../HomeLanding.module.css";

export default function HomeHeaderSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const nextHref = useMemo(() => {
    const v = value.trim();
    if (!v) return "/shop";
    const sp = new URLSearchParams();
    sp.set("q", v);
    return `/shop?${sp.toString()}`;
  }, [value]);

  return (
    <div className={styles.searchWrap}>
      <input
        className={styles.search}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products…"
        aria-label="Search products"
        onKeyDown={(e) => {
          if (e.key === "Enter") router.push(nextHref);
        }}
      />
    </div>
  );
}
