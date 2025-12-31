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
	- Optional: `LIMIT=10` generates only 10 products (useful to test the pipeline).
	- Optional: `FORCE_IMAGES=1` regenerates even if files already exist.
- Recommended production workflow: generate images locally, then **commit** `public/products/premium/**`.
	- This way production deployments do **not** need a Replicate token.

Vercel environment variables:
- If you want Vercel to generate missing images during build, add `REPLICATE_API_TOKEN` in Vercel → Project → Settings → Environment Variables.
	- (Optional) Add `LIMIT` and/or `FORCE_IMAGES` if you need to control generation.
- If you already committed `public/products/premium/**` to the repo, you can omit `REPLICATE_API_TOKEN` in Vercel.
- Payments are mocked via `/checkout` and can be swapped to Stripe later via `src/app/api/checkout/route.ts`.
