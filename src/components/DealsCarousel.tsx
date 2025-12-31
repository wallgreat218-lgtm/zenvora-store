"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "../lib/products";
import ProductCard from "./ProductCard";

export default function DealsCarousel({ products }: { products: Product[] }) {
  const items = useMemo(() => products.slice(0, 9), [products]);
  const [page, setPage] = useState(0);

  const perPage = 3;
  const pageCount = Math.max(1, Math.ceil(items.length / perPage));
  const start = page * perPage;
  const visible = items.slice(start, start + perPage);

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">Trending deals</h2>
          <p className="mt-1 text-sm text-muted-foreground">Premium picks with fast shipping.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => (p - 1 + pageCount) % pageCount)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-background/70 backdrop-blur transition hover:bg-accent"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => (p + 1) % pageCount)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-background/70 backdrop-blur transition hover:bg-accent"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <motion.div
        key={page}
        initial={{ opacity: 0, x: 18, filter: "blur(6px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -18, filter: "blur(6px)" }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((p) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: pageCount }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setPage(idx)}
            className={
              idx === page
                ? "h-1.5 w-6 rounded-full bg-foreground/70"
                : "h-1.5 w-2.5 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
