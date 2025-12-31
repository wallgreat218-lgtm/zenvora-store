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

  const fallbackSrc = "/products/real/fallback.webp";
  const effectiveSrc = errorStage === 0 ? src : fallbackSrc;

  if (!src || errorStage >= 2) {
    return (
      <div className={cn("absolute inset-0", className)} aria-label={alt} role="img">
        <div className="absolute inset-0 bg-muted/20" />
        <div aria-hidden className="absolute inset-0 border border-border/60" />

        <div className="relative flex h-full w-full items-center justify-center p-6">
          <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-background/80 shadow-soft">
            <Icon className="h-8 w-8 text-foreground/80" />
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
