"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./HomeLanding.module.css";
import HeroProductSlider from "./HeroProductSlider";
import { products as storeProducts, type Product } from "../lib/products";
import { getCart } from "../lib/cart";

const DISCOUNT = 0.1;

type Filter = "all" | "phones" | "laptops" | "tv" | "accessories";

type CatalogProduct = Product & {
  type: Exclude<Filter, "all">;
  badge: string;
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

function classifyProduct(product: Product): Exclude<Filter, "all"> {
  const slug = product.slug.toLowerCase();
  const name = product.name.toLowerCase();

  if (slug.includes("iphone") || name.includes("iphone")) return "phones";
  if (slug.includes("lenovo") || name.includes("lenovo") || name.includes("thinkpad") || name.includes("legion")) {
    return "laptops";
  }
  if (slug.includes("tv") || name.includes("tv") || name.includes("bravia")) return "tv";
  return "accessories";
}

export default function HomeLanding() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const catalog: CatalogProduct[] = useMemo(() => {
    return storeProducts.map((p) => ({
      ...p,
      type: classifyProduct(p),
      badge: "10% OFF"
    }));
  }, []);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return catalog.filter((p) => {
      const byType = activeFilter === "all" ? true : p.type === activeFilter;
      const bySearch = q ? p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) : true;
      return byType && bySearch;
    });
  }, [catalog, activeFilter, searchTerm]);

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
            <button
              className={`${styles.btn} ${styles.ghost}`}
              type="button"
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
            >
              <span className={styles.icon}>⌕</span>
              Search
            </button>

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
              {filtered.map((p) => {
                const now = discounted(p.basePrice);
                return (
                  <article key={p.slug} className={`${styles.product} ${styles.reveal}`} data-reveal>
                    <div className={styles.pTop}>
                      <span className={styles.tag}>{p.type.toUpperCase()}</span>
                      <span className={`${styles.tag} ${styles.orange}`}>{p.badge}</span>
                    </div>

                    <div className={styles.productMedia}>
                      <img
                        className={styles.productImg}
                        src={p.images?.[0] ?? "/products/keyboard.svg"}
                        alt={p.name}
                        loading="lazy"
                      />
                      <div className={styles.productFallback} aria-hidden="true" />
                    </div>

                    <div className={styles.pTitle}>{p.name}</div>
                    <p className={`${styles.muted} ${styles.pDesc}`}>{p.description}</p>

                    <div className={styles.pPrices}>
                      <div>
                        <div className={`${styles.muted} ${styles.small}`}>Now</div>
                        <div className={styles.now}>{fmt(now)}</div>
                        <div className={styles.was}>{fmt(p.basePrice)}</div>
                      </div>
                      <div className={styles.kbd}>-10%</div>
                    </div>

                    <div className={styles.pActions}>
                      <Link className={`${styles.btn} ${styles.primary}`} href={`/product/${p.slug}`}>
                        Select options
                      </Link>
                      <Link className={`${styles.btn} ${styles.ghost}`} href={`/product/${p.slug}`}>
                        Details
                      </Link>
                    </div>
                  </article>
                );
              })}
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

      <div className={`${styles.modal} ${searchOpen ? styles.showModal : ""}`} aria-hidden={!searchOpen}>
        <div className={styles.modalBackdrop} onClick={() => setSearchOpen(false)} />
        <div className={styles.modalCard} role="dialog" aria-modal="true" aria-label="Search products">
          <div className={styles.modalHead}>
            <div className={styles.modalTitle}>Search</div>
            <button className={styles.x} type="button" onClick={() => setSearchOpen(false)}>
              ✕
            </button>
          </div>
          <div className={styles.modalBody}>
            <input
              className={styles.search}
              placeholder="Search iPhone, Lenovo, TV..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus={searchOpen}
            />
            <div className={`${styles.muted} ${styles.small}`} style={{ marginTop: 10 }}>
              Tip: Try “iPhone”, “Lenovo”, “Bravia”.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
