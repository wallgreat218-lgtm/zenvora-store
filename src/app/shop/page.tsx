import { products } from "../../lib/products";
import ProductCard from "../../components/ProductCard";
import Reveal from "../../components/Reveal";

export default async function Shop({ searchParams }: { searchParams?: Promise<{ q?: string }> }) {
  const resolved = (await searchParams) ?? {};
  const q = (resolved.q ?? "").trim().toLowerCase();
  const filtered = q
    ? products.filter((p) => {
        const hay = `${p.name} ${p.shortDescription} ${p.tags.join(" ")} ${p.category}`.toLowerCase();
        return hay.includes(q);
      })
    : products;

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-semibold tracking-tight">Shop</h1>
          <p className="text-sm text-muted-foreground">Premium, unbranded electronics—designed for everyday performance.</p>
          {q && <p className="text-sm text-muted-foreground">Showing results for “{resolved.q}”.</p>}
        </div>
      </Reveal>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-border/60 bg-card p-8 text-center">
          <p className="text-base font-medium">No results found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different search term.</p>
        </div>
      ) : (
        <Reveal delay={0.04}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
