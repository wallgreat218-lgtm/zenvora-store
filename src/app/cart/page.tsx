"use client";
import { getCart, clearCart } from "../../lib/cart";
import { products } from "../../lib/products";
import Link from "next/link";
import PremiumImage from "../../components/PremiumImage";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const items = typeof window !== "undefined" ? getCart() : [];
  const detailed = items.map((it) => ({ ...it, product: products.find((p) => p.slug === it.slug) }));
  const total = detailed.reduce((s, it) => s + (it.product ? it.product.price * it.quantity : 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Your cart</h1>
          <p className="mt-1 text-sm text-muted-foreground">Fast shipping, easy returns, premium experience.</p>
        </div>
        <Link
          href="/shop"
          className="hidden rounded-md border border-border/60 bg-background/70 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-accent sm:inline-flex"
        >
          Continue shopping
        </Link>
      </div>

      {detailed.length === 0 ? (
        <div className="rounded-lg border border-border/60 bg-card p-10 text-center shadow-soft">
          <p className="text-base font-medium">Your cart is empty</p>
          <p className="mt-1 text-sm text-muted-foreground">Explore trending deals and premium essentials.</p>
          <Link href="/shop" className="btn mt-5 h-11 px-5">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {detailed.map((it) => (
              <div key={it.slug} className="flex gap-4 rounded-lg border border-border/60 bg-card p-4">
                <div className="relative h-24 w-32 overflow-hidden rounded-md border border-border/60 bg-background">
                  <PremiumImage
                    src={it.product?.image}
                    alt={it.product?.name ?? it.slug}
                    variant={
                      it.product?.category === "phones"
                        ? "phone"
                        : it.product?.category === "laptops"
                          ? "laptop"
                          : it.product?.category === "audio"
                            ? "headphones"
                            : it.product?.category === "tvs"
                              ? "tv"
                              : "generic"
                    }
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{it.product?.name ?? it.slug}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Qty: {it.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold">
                      {(it.product ? it.product.price * it.quantity : 0).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                      })}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-1">{it.product?.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-lg border border-border/60 bg-card p-5 shadow-soft">
            <p className="text-sm font-semibold">Order summary</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                  })}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between border-t border-border/60 pt-3 text-base font-semibold">
                <span>Total</span>
                <span>
                  {total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                  })}
                </span>
              </div>
            </div>

            <button
              className="btn mt-5 h-11 w-full"
              onClick={() => {
                router.push("/checkout");
              }}
            >
              Secure checkout
            </button>

            <button
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-md border border-border/60 bg-background/70 text-sm font-medium backdrop-blur transition hover:bg-accent"
              onClick={() => {
                clearCart();
                window.location.reload();
              }}
            >
              Clear cart
            </button>

            <p className="mt-4 text-xs text-muted-foreground">
              Free standard shipping over $75 • 30-day returns • Secure checkout coming soon
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
