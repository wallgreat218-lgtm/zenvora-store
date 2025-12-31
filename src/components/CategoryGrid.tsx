"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const categories = [
  { key: "phones", label: "Phones", sub: "Flagship feel, everyday ready" },
  { key: "laptops", label: "Laptops", sub: "Quiet power for deep work" },
  { key: "audio", label: "Audio", sub: "Detail-forward listening" },
  { key: "wearables", label: "Wearables", sub: "Health + productivity" },
  { key: "accessories", label: "Accessories", sub: "Premium essentials" },
] as const;

export default function CategoryGrid() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-semibold tracking-tight">Shop by category</h2>
        <p className="mt-1 text-sm text-muted-foreground">Curated picks across the lineup.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((c, idx) => (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.04 }}
          >
            <Link
              href={`/shop?q=${encodeURIComponent(c.key)}`}
              className={cn(
                "group relative block overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 shadow-soft backdrop-blur transition",
                "hover:bg-card"
              )}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/10" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
              </div>

              <div className="relative">
                <div className="text-sm font-semibold tracking-tight">{c.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{c.sub}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
