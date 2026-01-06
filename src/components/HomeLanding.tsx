"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./HomeLanding.module.css";
import HeroProductSlider from "./HeroProductSlider";
import { products as storeProducts, type Product } from "../lib/products";
import { getCart } from "../lib/cart";
import ProductCard from "./ProductCard";
import HomeHeaderSearch from "./store/HomeHeaderSearch";

type Filter = "all" | "phones" | "laptops" | "tv" | "accessories";

type CatalogProduct = Product & {
  type: Exclude<Filter, "all">;
  badge: string;
};

function classifyProduct(product: Product): Exclude<Filter, "all"> {
  const slug = product.slug.toLowerCase();
  const name = product.title.toLowerCase();

  if (slug.includes("iphone") || name.includes("iphone")) return "phones";
  if (slug.includes("lenovo") || name.includes("lenovo") || name.includes("thinkpad") || name.includes("legion")) {
    return "laptops";
  }
  if (slug.includes("tv") || name.includes("tv") || name.includes("bravia")) return "tv";
  return "accessories";
}

export default function HomeLanding() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [cartCount, setCartCount] = useState(0);

  const catalog: CatalogProduct[] = useMemo(() => {
    return storeProducts.map((p) => ({
      ...p,
      type: classifyProduct(p),
      badge: "10% OFF"
    }));
  }, []);

  const filtered = useMemo(() => {
    return catalog.filter((p) => {
      const byType = activeFilter === "all" ? true : p.type === activeFilter;
      return byType;
    });
  }, [catalog, activeFilter]);

  useEffect(() => {
    const update = () => {
      const items = getCart();
      setCartCount(items.reduce((s, it) => s + (it.quantity ?? 0), 0));
    };

    update();

    const onCart = () => update();
    const onStorage = () => update();

    window.addEventListener("zenvora-cart", onCart as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("zenvora-cart", onCart as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add(styles.show);
        }
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.shell}>
      <div className={styles.bgGlow} aria-hidden="true" />

      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <Link className={styles.brand} href="/#top" aria-label="Zenvora Electronics Home">
            <Image
              className={styles.brandLogo}
              src="/brand/zenvora-logo.png"
              alt="Zenvora Electronics"
              width={180}
              height={60}
              priority
            />
          </Link>

          <nav className={styles.nav}>
            <Link href="/shop">Shop</Link>
            <Link href="/#products">Products</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className={styles.headerCta}>
            <HomeHeaderSearch />

            <Link className={`${styles.btn} ${styles.primary}`} href="/cart" aria-label="Open cart">
              <span className={styles.icon}>🛒</span>
              Cart
              <span className={styles.pill} aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main id="top" className={styles.main}>
        <section className={styles.hero}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={`${styles.heroCopy} ${styles.reveal}`} data-reveal>
              <div className={styles.badge}>
                <span className={styles.dot} />
                Secure checkout • Fast support • Premium devices
              </div>

              <h1>ZENVORA ELECTRONICS — premium tech, shipped fast.</h1>

              <p className={styles.muted}>
                Shop verified smartphones, laptops, TVs, and accessories with clear specs, secure checkout, and responsive
                support.
              </p>

              <div className={styles.heroActions}>
                <Link className={`${styles.btn} ${styles.primary}`} href="/shop">
                  Shop Now
                </Link>
                <Link className={`${styles.btn} ${styles.ghost}`} href="/#products">
                  Browse Products
                </Link>
                <Link className={`${styles.btn} ${styles.ghost}`} href="/checkout">
                  Secure Checkout
                </Link>
              </div>

              <div className={styles.trustRow}>
                <div className={styles.trust}>
                  <div className={styles.trustTop}>Buyer Protection</div>
                  <div className={styles.muted}>Clear shipping & refund policies</div>
                </div>
                <div className={styles.trust}>
                  <div className={styles.trustTop}>Secure Payments UI</div>
                  <div className={styles.muted}>Encryption notice + trust badges</div>
                </div>
                <div className={styles.trust}>
                  <div className={styles.trustTop}>Global Ready</div>
                  <div className={styles.muted}>Worldwide shipping options</div>
                </div>
              </div>
            </div>

            <div className={styles.reveal} data-reveal>
              <HeroProductSlider />
            </div>
          </div>
        </section>

        <section className={styles.section} id="products">
          <div className={styles.container}>
            <div className={`${styles.sectionHead} ${styles.reveal}`} data-reveal>
              <div>
                <h2>Featured Products</h2>
                <p className={styles.muted}>Select color and storage/config before adding to cart.</p>
              </div>

              <div className={styles.filters}>
                <button
                  className={`${styles.chip} ${activeFilter === "all" ? styles.active : ""}`}
                  type="button"
                  onClick={() => setActiveFilter("all")}
                >
                  All
                </button>
                <button
                  className={`${styles.chip} ${activeFilter === "phones" ? styles.active : ""}`}
                  type="button"
                  onClick={() => setActiveFilter("phones")}
                >
                  iPhone
                </button>
                <button
                  className={`${styles.chip} ${activeFilter === "laptops" ? styles.active : ""}`}
                  type="button"
                  onClick={() => setActiveFilter("laptops")}
                >
                  Laptops
                </button>
                <button
                  className={`${styles.chip} ${activeFilter === "tv" ? styles.active : ""}`}
                  type="button"
                  onClick={() => setActiveFilter("tv")}
                >
                  TV
                </button>
              </div>
            </div>

            <div className={styles.grid} aria-live="polite">
              {filtered.map((p) => (
                <div key={p.slug} className={styles.reveal} data-reveal>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <div className={styles.footerBrand}>
            <Image
              className={styles.footerLogo}
              src="/brand/zenvora-logo.png"
              alt="Zenvora Electronics"
              width={160}
              height={52}
            />
            <div className={`${styles.muted} ${styles.small}`}>
              © {new Date().getFullYear()} Zenvora Electronics. All rights reserved.
            </div>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/policies/privacy">Privacy</Link>
            <Link href="/policies/shipping">Shipping</Link>
            <Link href="/policies/refund">Refund</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
