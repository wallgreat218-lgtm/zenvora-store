import { products } from "../../../lib/products";
import Reviews from "../../../components/Reviews";
import ProductGallery from "../../../components/ProductGallery";
import AddToCartButton from "../../../components/AddToCartButton";
import { ShieldCheck, Truck } from "lucide-react";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return <p>Product not found</p>;
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <ProductGallery name={product.name} images={product.images} />

      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
        </div>

        <div className="flex items-end justify-between gap-4 rounded-lg border border-border/60 bg-card p-4">
          <div>
            <div className="text-2xl font-semibold">
              {product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">In stock • Ships fast</div>
          </div>
          <AddToCartButton slug={product.slug} />
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-semibold">Key highlights</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {product.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/70" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-semibold">Specs</h2>
          <div className="overflow-hidden rounded-lg border border-border/60">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([k, v]) => (
                  <tr key={k} className="border-b border-border/60 last:border-b-0">
                    <td className="w-1/3 bg-muted/30 px-4 py-3 font-medium text-foreground">{k}</td>
                    <td className="px-4 py-3 text-muted-foreground">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/60 bg-card p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Truck className="h-4 w-4" />
              Shipping
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{product.shipping}</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-card p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4" />
              Warranty
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{product.warranty}</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-card p-4">
            <div className="text-sm font-semibold">What’s in the box</div>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {product.whatsInTheBox.map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-semibold">About this product</h2>
          <p className="text-sm leading-6 text-muted-foreground">{product.fullDescription}</p>
        </div>

        <div className="rounded-lg border border-border/60 bg-card p-5">
          <Reviews />
        </div>
      </div>
    </div>
  );
}
