"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PremiumImage from "./PremiumImage";

type HeroProduct = {
  slug: string;
  name: string;
  category: "phones" | "laptops" | "audio" | "tvs" | "wearables" | "accessories";
  image: string;
};

export default function Hero({ products }: { products: HeroProduct[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="surface-hero relative overflow-hidden px-8 py-10 sm:px-10 sm:py-12">
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

      <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            Fast delivery • Easy returns • Premium picks
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Shop the latest tech — <span className="text-gradient">premium picks</span>, great prices.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Phones, laptops, wearables & accessories. Fresh arrivals every week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/shop" className="btn h-11 px-6">
              Shop now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/#categories" className="btn-secondary h-11 px-6">
              Browse categories
            </Link>
          </motion.div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-soft backdrop-blur">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(900px 420px at 30% 10%, hsl(var(--accent) / 0.16), transparent 60%), radial-gradient(900px 520px at 80% 90%, hsl(var(--primary) / 0.12), transparent 60%)",
            }}
          />
          <div className="relative px-4 py-4 sm:px-5 sm:py-5">
            <div
              className="overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
              }}
            >
              <div
                className={
                  reduceMotion
                    ? "flex w-max gap-4"
                    : "flex w-max animate-marquee gap-4 motion-reduce:animate-none"
                }
              >
                <div className="flex gap-4 pr-4">
                  {products.slice(0, 10).map((p) => (
                    <div
                      key={p.slug}
                      className="relative h-[96px] w-[128px] overflow-hidden rounded-xl border border-border/60 bg-background/40 sm:h-[110px] sm:w-[148px]"
                    >
                      <PremiumImage
                        src={p.image}
                        alt={p.name}
                        variant={
                          p.category === "phones"
                            ? "phone"
                            : p.category === "laptops"
                              ? "laptop"
                              : p.category === "audio"
                                ? "headphones"
                                : p.category === "tvs"
                                  ? "tv"
                                  : "generic"
                        }
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {!reduceMotion ? (
                  <div aria-hidden className="flex gap-4 pr-4">
                    {products.slice(0, 10).map((p) => (
                      <div
                        key={`${p.slug}-dup`}
                        className="relative h-[96px] w-[128px] overflow-hidden rounded-xl border border-border/60 bg-background/40 sm:h-[110px] sm:w-[148px]"
                      >
                        <PremiumImage
                          src={p.image}
                          alt=""
                          variant={
                            p.category === "phones"
                              ? "phone"
                              : p.category === "laptops"
                                ? "laptop"
                                : p.category === "audio"
                                  ? "headphones"
                                  : p.category === "tvs"
                                    ? "tv"
                                    : "generic"
                          }
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Unbranded studio imagery</span>
              <span>{reduceMotion ? "Motion reduced" : "Live carousel"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
