import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const outDir = path.join(process.cwd(), "public", "products", "generated");
const fallback = path.join(outDir, "fallback.png");

// Keep builds deterministic and fast: only generate if missing.
if (fs.existsSync(fallback)) {
  console.log("[prebuild] generated product images already present; skipping generation.");
  process.exit(0);
}

console.log("[prebuild] generating local premium product images...");
const res = spawnSync(process.execPath, ["scripts/generate-product-images.mjs"], {
  stdio: "inherit",
  env: process.env,
});

process.exit(res.status ?? 0);
