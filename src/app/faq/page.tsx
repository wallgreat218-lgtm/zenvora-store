export default function FaqPage() {
  const items = [
    {
      q: "Are the product images real brand photos?",
      a: "No. Images are unbranded studio renders designed for safe previews—no logos, no trademarks, no readable text."
    },
    {
      q: "How fast do orders ship?",
      a: "Most orders ship in 1–2 business days. Delivery time varies by destination and carrier."
    },
    {
      q: "What is your return window?",
      a: "30-day returns for items in like-new condition. See Shipping & Returns for details."
    },
    {
      q: "Is payment secure?",
      a: "This scaffold uses mock payments. It’s designed to be swapped to Stripe when you’re ready."
    }
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">FAQ</h1>
        <p className="mt-1 text-sm text-muted-foreground">Quick answers to common questions.</p>
      </div>

      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.q} className="surface p-6">
            <div className="text-sm font-semibold">{it.q}</div>
            <div className="mt-2 text-sm text-muted-foreground leading-7">{it.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
