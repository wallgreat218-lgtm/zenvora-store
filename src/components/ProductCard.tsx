"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, ShoppingBag, Star } from "lucide-react";
import { Product } from "../lib/products";
import { addToCart } from "../lib/cart";
import { cn } from "../lib/utils";

function formatPrice(price: number) {
  return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
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
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border/60",
        "bg-card shadow-soft"
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
      </div>

      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.07]"
            priority={false}
          />

          <div className="absolute left-3 top-3 flex items-center gap-2">
            <CategoryPill category={product.category} />
            <span className="inline-flex items-center rounded-full bg-foreground/90 px-2.5 py-1 text-[11px] font-semibold text-background">
              New
            </span>
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
              <span className="inline-flex h-9 items-center justify-center rounded-md border border-border/60 bg-card px-3 text-sm font-medium text-foreground">
                <Eye className="h-4 w-4" />
              </span>
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
              <div className="text-xs text-muted-foreground">Free returns</div>
            </div>
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>

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
  );
}
