export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">About ZenVora Electronics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A premium shopping experience with safe, unbranded studio imagery.
        </p>
      </div>

      <div className="surface p-6 space-y-4 text-sm text-muted-foreground leading-7">
        <p>
          ZenVora Electronics is built to feel flagship: clean typography, premium motion, and product pages designed for
          clarity.
        </p>
        <p>
          Product imagery is intentionally unbranded studio-style renders to avoid logos, trademarks, and manufacturer
          styling.
        </p>
        <p>
          Prices are presented as typical market estimates and may vary by region and retailer.
        </p>
      </div>
    </div>
  );
}
