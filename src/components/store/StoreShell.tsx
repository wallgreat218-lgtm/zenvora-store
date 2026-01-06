import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import styles from "../HomeLanding.module.css";
import HeaderSearch from "./HeaderSearch";

export default function StoreShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <div className={styles.bgGlow} aria-hidden="true" />

      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <Link className={styles.brand} href="/" aria-label="Zenvora Electronics Home">
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
            <Link href="/cart">Cart</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className={styles.headerCta}>
            <Suspense fallback={null}>
              <HeaderSearch />
            </Suspense>
            <Link className={`${styles.btn} ${styles.ghost}`} href="/faq">
              FAQ
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="/checkout">
              Checkout
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div>
                <h2 style={{ margin: 0 }}>{title}</h2>
                {subtitle ? <p className={styles.muted}>{subtitle}</p> : null}
              </div>
            </div>

            {children}
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
