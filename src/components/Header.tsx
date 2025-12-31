"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { getCart } from "../lib/cart";
import { cn } from "../lib/utils";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "relative text-sm font-medium tracking-tight transition",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-2 left-0 h-px w-full bg-foreground/70"
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
        />
      )}
    </Link>
  );
}

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const items = getCart();
      const count = items.reduce((s, it) => s + it.quantity, 0);
      setCartCount(count);
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener("zenvora_cart", update as EventListener);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("zenvora_cart", update as EventListener);
    };
  }, []);

  const badge = useMemo(() => {
    if (cartCount <= 0) return null;
    return (
      <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[11px] font-semibold text-background">
        {cartCount > 99 ? "99+" : cartCount}
      </span>
    );
  }, [cartCount]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
      <div className="container">
        <div className="flex h-[68px] items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="group inline-flex items-center gap-2">
              <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-card shadow-sm">
                <span className="text-sm font-bold tracking-tight">Z</span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-foreground/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shine"
                />
              </span>
              <span className="font-display text-sm font-semibold tracking-tight">ZenVora</span>
              <span className="hidden text-xs text-muted-foreground sm:inline">Premium electronics</span>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/shop">Shop</NavLink>
              <NavLink href="/cart">Cart</NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <motion.div
              initial={false}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="hidden md:block"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = query.trim();
                  router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
                }}
                className={cn(
                  "flex h-10 items-center gap-2 rounded-md border border-border/60 bg-card/60 px-3",
                  "shadow-sm backdrop-blur focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background"
                )}
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="w-64 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </form>
            </motion.div>

            <ThemeToggle />

            <Link
              href="/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-background/70 text-foreground backdrop-blur transition hover:bg-accent"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {badge}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
