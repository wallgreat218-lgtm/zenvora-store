"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="surface-hero relative min-h-[560px] overflow-hidden p-10 sm:p-14 lg:min-h-[640px]">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(120deg, hsl(var(--primary) / 0.10), transparent 35%, hsl(var(--accent) / 0.22), transparent 70%, hsl(var(--primary) / 0.10))",
          backgroundSize: "220% 220%",
          mixBlendMode: "normal",
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                backgroundPosition: ["0% 0%", "100% 60%", "0% 0%"],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 30, 0], y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-accent/60 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, -26, 0], y: [0, -14, 0] }}
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
          className="mt-5 max-w-3xl font-display text-5xl font-semibold tracking-tight sm:text-6xl"
        >
          Modern electronics,
          <span className="text-gradient"> designed to feel flagship.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
          className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground"
        >
          Explore phones, laptops, wearables, audio, and accessories with premium presentation, fast browsing, and smooth motion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
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
