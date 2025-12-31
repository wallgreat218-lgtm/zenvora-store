"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { Product } from "../lib/products";
import { cn } from "../lib/utils";
import AddToCartButton from "./AddToCartButton";
import PremiumImage from "./PremiumImage";

function formatPrice(price: number) {
  return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function QuickViewModal({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const category = product.category as string;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const images = product.images?.length ? product.images.slice(0, 5) : [product.image];
  const compareAt = product.compareAtPrice;
  const discountPct = compareAt && compareAt > product.price ? Math.round(((compareAt - product.price) / compareAt) * 100) : null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-background/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className={cn(
              "absolute left-1/2 top-1/2 w-[min(980px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2",
              "surface overflow-hidden"
            )}
            initial={{ opacity: 0, y: 18, scale: 0.985, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 18, scale: 0.985, filter: "blur(10px)" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <div className="min-w-0">
                <div className="truncate font-display text-base font-semibold tracking-tight">{product.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">Quick view</div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-background/70 backdrop-blur transition hover:bg-accent"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-2">
              <div className="space-y-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card">
                  <PremiumImage
                    src={images[0]}
                    alt={product.name}
                    variant={
                      category === "phones"
                        ? "phone"
                        : category === "laptops"
                          ? "laptop"
                          : category === "audio"
                            ? "headphones"
                            : category === "tvs"
                              ? "tv"
                              : "generic"
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {images.slice(0, 4).map((src) => (
                    <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-card">
                      <PremiumImage src={src} alt="" variant="generic" fill sizes="160px" className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-2xl font-semibold tracking-tight">{formatPrice(product.price)}</div>
                      {compareAt && compareAt > product.price ? (
                        <div className="mt-1 flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground line-through">{formatPrice(compareAt)}</span>
                          {discountPct ? (
                            <span className="inline-flex items-center rounded-full bg-foreground px-2 py-0.5 text-[11px] font-semibold text-background">
                              {discountPct}% off
                            </span>
                          ) : null}
                        </div>
                      ) : (
                        <div className="mt-1 text-sm text-muted-foreground">Premium pricing, fast shipping.</div>
                      )}
                    </div>

                    <AddToCartButton slug={product.slug} />
                  </div>

                  <p className="text-sm leading-6 text-muted-foreground">{product.shortDescription}</p>
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-semibold">Key highlights</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {product.highlights.slice(0, 4).map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/70" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <Link href={`/product/${product.slug}`} className="btn-secondary h-11 px-5" onClick={onClose}>
                    View full details
                  </Link>
                  <button type="button" className="btn h-11 px-5" onClick={() => onClose()}>
                    Continue shopping
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
