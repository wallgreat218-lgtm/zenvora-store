"use client";

import Image, { type ImageProps } from "next/image";
import { Headphones, Laptop, Sparkles, Smartphone, Tv } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "../lib/utils";

type Variant = "phone" | "headphones" | "laptop" | "tv" | "generic";

export default function PremiumImage(
  props: Omit<ImageProps, "src"> & {
    src?: string | null;
    variant?: Variant;
  }
) {
  const { src, alt, variant = "generic", className, ...rest } = props;
  const [errorStage, setErrorStage] = useState<0 | 1 | 2>(0);

  const Icon = useMemo(() => {
    switch (variant) {
      case "phone":
        return Smartphone;
      case "headphones":
        return Headphones;
      case "laptop":
        return Laptop;
      case "tv":
        return Tv;
      default:
        return Sparkles;
    }
  }, [variant]);

  const fallbackSrc = "/products/generated/fallback.png";
  const effectiveSrc = errorStage === 0 ? src : fallbackSrc;

  if (!src || errorStage >= 2) {
    return (
      <div className={cn("absolute inset-0", className)} aria-label={alt} role="img">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-background/40 to-accent/18" />
        <div
          className="absolute inset-0 animate-gradient-drift opacity-80 motion-reduce:animate-none"
          style={{
            background:
              "radial-gradient(700px 420px at 35% 10%, hsl(var(--accent) / 0.22), transparent 60%), radial-gradient(720px 520px at 80% 90%, hsl(var(--primary) / 0.18), transparent 60%)",
            backgroundSize: "140% 140%",
          }}
        />
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />

        <div className="absolute inset-0 opacity-70" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.08), transparent)" }} />
        <div className="absolute inset-0 -translate-x-[120%] animate-shine" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.10), transparent)" }} />

        <div className="relative flex h-full w-full items-center justify-center p-6">
          <div className="relative animate-parallax-float motion-reduce:animate-none">
            <div className="absolute -inset-10 rounded-[32px] bg-primary/10 blur-2xl" />
            <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-background/30 shadow-soft backdrop-blur">
              <Icon className="h-8 w-8 text-foreground/80" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Image
      {...rest}
      src={effectiveSrc}
      alt={alt}
      className={className}
      onError={(e) => {
        setErrorStage((s) => (s === 0 ? 1 : 2));
        props.onError?.(e);
      }}
    />
  );
}
