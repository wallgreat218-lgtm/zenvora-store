ZenVora scaffold

Run locally:

```bash
cd d:\site\zenvora-store
npm install
npm run dev
```

Notes:
- Replace images in `public/` with real PNGs named as in `src/lib/products.ts`.
- Stripe is disabled by default. Edit `STRIPE_ENABLED` in `src/app/cart/page.tsx` and add environment variables when ready.
