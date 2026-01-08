"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./HomeLanding.module.css";
import ZenvoraLogo from "./ZenvoraLogo";

export default function Header() {
  const pathname = usePathname();

  // The landing page renders its own header.
  if (pathname === "/") return null;

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <Link className={styles.brand} href="/" aria-label="Zenvora Electronics Home">
          <ZenvoraLogo className={styles.brandLogo} />
        </Link>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/checkout">Checkout</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
