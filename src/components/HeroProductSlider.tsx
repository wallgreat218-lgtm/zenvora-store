"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import styles from "./HeroProductSlider.module.css";
import { products } from "../lib/products";

const DISCOUNT = 0.1;

type Slide = {
  slug: string;
  badge?: string;
};

function fmt(n: number) {
  return `$${Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })}`;
}

function discounted(price: number) {
  return +(price * (1 - DISCOUNT)).toFixed(2);
}

export default function HeroProductSlider() {
  const slides: Slide[] = useMemo(
    () => [
      { slug: "iphone-15-pro-max", badge: "Featured Smartphone" },
      { slug: "lenovo-x1-carbon", badge: "Featured Laptop" }
    ],
    []
  );

  const items = useMemo(() => {
    return slides
      .map((s) => {
        const p = products.find((x) => x.slug === s.slug);
        if (!p) return null;
        return {
          slug: p.slug,
          title: p.name,
          specs: p.description,
          imageSrc: p.images?.[0] ?? "/products/keyboard.svg",
          imageAlt: p.name,
          price: fmt(discounted(p.basePrice)),
          badge: s.badge ?? "10% OFF"
        };
      })
      .filter(Boolean) as Array<{
      slug: string;
      title: string;
      specs: string;
      imageSrc: string;
      imageAlt: string;
      price: string;
      badge: string;
    }>;
  }, [slides]);

  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(Boolean(mq?.matches));
    apply();

    if (!mq) return;
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }

    mq.addListener(apply);
    return () => mq.removeListener(apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    if (items.length <= 1) return;

    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 4200);

    return () => window.clearInterval(t);
  }, [items.length, reducedMotion]);

  const active = items[index] ?? items[0];

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.meta}>
          <div className={styles.badge}>{active?.badge ?? "Featured"}</div>
          <h3 className={styles.title}>{active?.title ?? "Featured"}</h3>
          <div className={styles.specs}>{active?.specs ?? ""}</div>
          <div className={styles.priceRow}>
            <div className={styles.price}>{active?.price ?? "$0"}</div>
            <div className={styles.micro}>Secure checkout • Clear specs • Fast support</div>
          </div>
        </div>

        <div className={styles.dots} aria-label="Hero slides">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className={styles.media} aria-hidden="true">
        <div
          className={`${styles.track} ${reducedMotion ? styles.noMotion : ""}`}
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {items.map((s) => (
            <div key={s.slug} className={styles.slide}>
              <img className={styles.image} src={s.imageSrc} alt={s.imageAlt} loading="eager" />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <Link className={styles.primary} href={active ? `/product/${active.slug}` : "/shop"}>
          View Details
        </Link>
        <Link className={styles.secondary} href="/shop">
          Shop All
        </Link>
      </div>

      <div className={styles.shine} aria-hidden="true" />
    </div>
  );
}
