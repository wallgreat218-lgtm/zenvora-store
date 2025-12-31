export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Shipping & returns</h1>
        <p className="mt-1 text-sm text-muted-foreground">Clear policies, premium support.</p>
      </div>

      <div className="surface p-6 space-y-4 text-sm text-muted-foreground leading-7">
        <div>
          <div className="font-semibold text-foreground">Shipping</div>
          <p className="mt-1">
            Orders typically ship in 1–2 business days. Standard delivery time varies by destination and carrier.
          </p>
          <p className="mt-1">Free standard shipping over $75.</p>
        </div>

        <div>
          <div className="font-semibold text-foreground">Returns</div>
          <p className="mt-1">
            30-day returns for items in like-new condition. Refunds are issued to the original payment method once the
            return is received.
          </p>
        </div>

        <div className="rounded-xl border border-border/60 bg-background/70 p-4 backdrop-blur">
          Support: support@zenvoraelectronics.com • +1 (800) 778-ZEN-VORA
        </div>
      </div>
    </div>
  );
}
