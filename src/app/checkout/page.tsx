"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCart, clearCart } from "../../lib/cart";
import { products } from "../../data/products";

type Step = "shipping" | "payment";

function formatMoney(value: number) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function makeOrderId() {
  const a = Math.random().toString(16).slice(2, 6).toUpperCase();
  const b = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `ZV-${a}-${b}`;
}

const ORDER_KEY = "zenvora_last_order_v1";

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("shipping");

  const items = typeof window !== "undefined" ? getCart() : [];
  const detailed = useMemo(
    () => items.map((it) => ({ ...it, product: products.find((p) => p.slug === it.slug) })),
    [items]
  );
  const subtotal = useMemo(
    () => detailed.reduce((s, it) => s + (it.product ? it.product.price * it.quantity : 0), 0),
    [detailed]
  );
  const shipping = subtotal >= 75 ? 0 : detailed.length ? 9 : 0;
  const total = subtotal + shipping;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postal, setPostal] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");

  const canContinueShipping = email.trim() && name.trim() && address1.trim() && city.trim() && region.trim() && postal.trim();
  const canPay = cardName.trim() && cardNumber.trim().length >= 12 && exp.trim() && cvc.trim().length >= 3;

  function placeOrder() {
    const orderId = makeOrderId();
    const order = {
      orderId,
      email: email.trim(),
      name: name.trim(),
      address1: address1.trim(),
      city: city.trim(),
      region: region.trim(),
      postal: postal.trim(),
      items: detailed
        .filter((d) => d.product)
        .map((d) => ({ slug: d.slug, quantity: d.quantity, name: d.product!.name, price: d.product!.price })),
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    } catch {
      // ignore
    }

    clearCart();
    router.push("/checkout/success");
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Checkout</h1>
        <div className="surface p-8">
          <p className="text-sm text-muted-foreground">Your cart is empty.</p>
          <Link href="/shop" className="btn mt-5 h-11 px-5">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Checkout</h1>
          <p className="mt-1 text-sm text-muted-foreground">Secure, premium checkout (mock payments).</p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => setStep("shipping")}
            className={step === "shipping" ? "btn-secondary h-10 px-4" : "btn-ghost h-10 px-4 text-muted-foreground"}
          >
            Shipping
          </button>
          <button
            type="button"
            onClick={() => setStep("payment")}
            className={step === "payment" ? "btn-secondary h-10 px-4" : "btn-ghost h-10 px-4 text-muted-foreground"}
            disabled={!canContinueShipping}
          >
            Payment
          </button>
        </div>

        {step === "shipping" ? (
          <div className="surface p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-border/60 bg-background/70 px-3 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  placeholder="you@example.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Full name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-border/60 bg-background/70 px-3 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Address</label>
                <input
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-border/60 bg-background/70 px-3 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  placeholder="123 Market Street"
                />
              </div>
              <div>
                <label className="text-sm font-medium">City</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-border/60 bg-background/70 px-3 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  placeholder="San Francisco"
                />
              </div>
              <div>
                <label className="text-sm font-medium">State/Region</label>
                <input
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-border/60 bg-background/70 px-3 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  placeholder="CA"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Postal code</label>
                <input
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-border/60 bg-background/70 px-3 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  placeholder="00000"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link href="/cart" className="btn-ghost h-11 px-4">
                Back to cart
              </Link>
              <button
                type="button"
                className="btn h-11 px-6"
                disabled={!canContinueShipping}
                style={{ opacity: canContinueShipping ? 1 : 0.6 }}
                onClick={() => setStep("payment")}
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div className="surface p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Name on card</label>
                <input
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-border/60 bg-background/70 px-3 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  placeholder="JANE DOE"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Card number</label>
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\s+/g, " "))}
                  className="mt-2 h-11 w-full rounded-md border border-border/60 bg-background/70 px-3 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  placeholder="1234 1234 1234 1234"
                  inputMode="numeric"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Expiry</label>
                <input
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-border/60 bg-background/70 px-3 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="text-sm font-medium">CVC</label>
                <input
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-border/60 bg-background/70 px-3 outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                  placeholder="123"
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button type="button" className="btn-ghost h-11 px-4" onClick={() => setStep("shipping")}
              >
                Back
              </button>
              <button
                type="button"
                className="btn h-11 px-6"
                disabled={!canPay}
                style={{ opacity: canPay ? 1 : 0.6 }}
                onClick={placeOrder}
              >
                Place order
              </button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Payments are mocked in this scaffold. Swap to Stripe later via the API route in <code>src/app/api/checkout/route.ts</code>.
            </p>
          </div>
        )}
      </div>

      <aside className="h-fit space-y-4 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
        <div className="flex items-end justify-between">
          <div className="text-sm font-semibold">Order summary</div>
          <Link href="/cart" className="text-xs text-muted-foreground hover:text-foreground">
            Edit
          </Link>
        </div>

        <div className="space-y-3">
          {detailed.map((it) => (
            <div key={it.slug} className="flex items-start justify-between gap-3 text-sm">
              <div className="min-w-0">
                <div className="truncate font-medium">{it.product?.name ?? it.slug}</div>
                <div className="text-xs text-muted-foreground">Qty {it.quantity}</div>
              </div>
              <div className="shrink-0 font-medium">
                {formatMoney((it.product ? it.product.price : 0) * it.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 border-t border-border/60 pt-4 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatMoney(shipping)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>{formatMoney(total)}</span>
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-background/70 p-4 text-xs text-muted-foreground backdrop-blur">
          Free standard shipping over $75 • 30-day returns • Support: support@zenvoraelectronics.com
        </div>
      </aside>
    </div>
  );
}
