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
  const [errored, setErrored] = useState(false);

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

  if (!src || errored) {
    return (
      <div className={cn("absolute inset-0", className)} aria-label={alt} role="img">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-background/40 to-accent/18" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(700px 420px at 35% 10%, hsl(var(--accent) / 0.22), transparent 60%), radial-gradient(720px 520px at 80% 90%, hsl(var(--primary) / 0.18), transparent 60%)",
          }}
        />
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-background/30 shadow-soft backdrop-blur">
            <Icon className="h-7 w-7 text-foreground/80" />
          </div>
          <div className="mt-4 text-sm font-semibold tracking-tight">AI image coming soon</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Photorealistic, unbranded studio render in progress.
          </div>
        </div>
      </div>
    );
  }

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        setErrored(true);
        props.onError?.(e);
      }}
    />
  );
}
