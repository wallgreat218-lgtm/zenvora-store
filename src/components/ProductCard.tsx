"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ShoppingBag, Star } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "../data/products";
import { addToCart } from "../lib/cart";
import { cn } from "../lib/utils";
import QuickViewModal from "./QuickViewModal";
import PremiumImage from "./PremiumImage";

function formatPrice(price: number) {
  return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function deriveCompareAt(product: Product) {
  if (product.compareAtPrice && product.compareAtPrice > product.price) return product.compareAtPrice;
  // Deterministic “list price” fallback for premium ecommerce presentation.
  const bump = product.price >= 1200 ? 0.12 : product.price >= 800 ? 0.14 : 0.16;
  return Math.round(product.price * (1 + bump));
}

function deriveStock(product: Product): Product["stock"] {
  if (product.stock) return product.stock;
  // Deterministic stock state (keeps UI consistent without editing all items).
  const hash = Array.from(product.slug).reduce((s, ch) => s + ch.charCodeAt(0), 0);
  const v = hash % 10;
  return v <= 1 ? "low" : "in";
}

function CategoryPill({ category }: { category: Product["category"] }) {
  const label =
    category === "phones"
      ? "Phones"
      : category === "laptops"
        ? "Laptops"
        : category === "audio"
          ? "Audio"
          : category === "wearables"
            ? "Wearables"
            : "Accessories";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-[11px] font-medium",
        "backdrop-blur"
      )}
    >
      {label}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const total = 5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, idx) => {
        const isFull = idx < full;
        const isHalf = !isFull && half && idx === full;
        return (
          <Star
            key={idx}
            className={cn(
              "h-4 w-4",
              isFull || isHalf ? "fill-foreground text-foreground" : "text-muted-foreground/40"
            )}
          />
        );
      })}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const compareAt = useMemo(() => deriveCompareAt(product), [product]);
  const stock = useMemo(() => deriveStock(product), [product]);
  const hasDiscount = compareAt > product.price;
  const discountPct = hasDiscount ? Math.round(((compareAt - product.price) / compareAt) * 100) : null;

  return (
    <>
      <QuickViewModal
        product={{ ...product, compareAtPrice: compareAt, stock }}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />

      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-border/60",
          "bg-card shadow-soft transition-shadow duration-300 will-change-transform",
          "group-hover:shadow-glow"
        )}
      >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      </div>

      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full max-h-[260px] overflow-hidden lg:max-h-[240px]">
          <PremiumImage
            src={product.image}
            alt={product.name}
            variant={
              product.category === "phones"
                ? "phone"
                : product.category === "laptops"
                  ? "laptop"
                  : product.category === "audio"
                    ? "headphones"
                    : "generic"
            }
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.06]"
            priority={false}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(700px 320px at 50% 0%, hsl(var(--accent) / 0.18), transparent 55%), radial-gradient(700px 420px at 50% 110%, hsl(var(--primary) / 0.14), transparent 60%)",
            }}
          />

          <div className="absolute left-3 top-3 flex items-center gap-2">
            <CategoryPill category={product.category} />
            {stock === "low" ? (
              <span className="inline-flex items-center rounded-full bg-foreground/90 px-2.5 py-1 text-[11px] font-semibold text-background">
                Low stock
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-foreground/90 px-2.5 py-1 text-[11px] font-semibold text-background">
                In stock
              </span>
            )}

            {discountPct ? (
              <span className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                {discountPct}% off
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-background/70 p-2 backdrop-blur">
              <button
                className="btn h-9 flex-1 px-3"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product.slug);
                }}
              >
                <ShoppingBag className="h-4 w-4" />
                Quick add
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-md border border-border/60 bg-card px-3 text-sm font-medium text-foreground transition hover:bg-accent"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickViewOpen(true);
                }}
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 font-display text-base font-semibold tracking-tight">
              {product.name}
            </h3>
            <div className="shrink-0 text-right">
              <div className="text-base font-semibold">{formatPrice(product.price)}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {hasDiscount ? (
                  <span>
                    <span className="line-through">{formatPrice(compareAt)}</span>
                    <span className="mx-1">·</span>
                    Free returns
                  </span>
                ) : (
                  "Free returns"
                )}
              </div>
            </div>
          </div>

          <ul className="space-y-1 text-sm text-muted-foreground">
            {product.highlights.slice(0, 2).map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">Ships fast</span>
          </div>
        </div>
      </Link>
      </motion.article>
    </>
  );
}
