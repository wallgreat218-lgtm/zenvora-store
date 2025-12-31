ZenVora scaffold

Run locally:

```bash
cd c:\Users\methew\Documents\GitHub\zenvora-store
npm install
npm run dev
```

Notes:
- Premium product images are generated from prompts in `src/data/image-prompts.md` and saved to `public/products/premium/<slug>/01.webp` etc.
	- PowerShell: `$env:REPLICATE_API_TOKEN="..." ; npm run images:generate`
	- Cross-platform: `npx cross-env REPLICATE_API_TOKEN=... npm run images:generate`
- `npm run build` automatically attempts to generate missing images if `REPLICATE_API_TOKEN` is set (via `prebuild`). If not set, the UI uses premium visual fallbacks.
- Payments are mocked via `/checkout` and can be swapped to Stripe later via `src/app/api/checkout/route.ts`.
