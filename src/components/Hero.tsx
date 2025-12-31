"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 shadow-soft sm:p-12">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-accent/60 blur-3xl"
        animate={{ x: [0, -26, 0], y: [0, -14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      <div className="relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
        >
          Premium, unbranded tech — safe imagery
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Modern electronics,
          <span className="text-gradient"> designed to feel flagship.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
          className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground"
        >
          Explore phones, laptops, wearables, audio, and accessories with premium presentation, fast browsing, and smooth motion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <Link href="/shop" className="btn h-11 px-5">
            Shop new arrivals
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/policies/shipping"
            className="btn-secondary h-11 px-5"
          >
            Shipping & returns
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
