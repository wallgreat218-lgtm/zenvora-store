"use client";

import { useMemo, useState } from "react";
import { cn } from "../lib/utils";
import PremiumImage from "./PremiumImage";

export default function ProductGallery({ name, images }: { name: string; images: string[] }) {
  const safeImages = useMemo(() => (images?.length ? images : []), [images]);
  const [active, setActive] = useState(0);
  const activeSrc = safeImages[active] ?? safeImages[0];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/60 bg-card">
        <PremiumImage
          src={activeSrc}
          alt={name}
          variant="generic"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {safeImages.slice(0, 5).map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(idx)}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-md border bg-card",
              idx === active ? "border-foreground/60" : "border-border/60 hover:border-foreground/30"
            )}
            aria-label={`View image ${idx + 1}`}
          >
            <PremiumImage src={src} alt="" variant="generic" fill sizes="200px" className="object-cover" />
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Images are unbranded studio renders for safe previews.
      </p>
    </div>
  );
}
