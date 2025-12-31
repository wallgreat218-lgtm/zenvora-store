import { spawnSync } from "node:child_process";

const token = process.env.REPLICATE_API_TOKEN;

if (!token) {
  console.log("[prebuild] REPLICATE_API_TOKEN not set; skipping image generation.");
  process.exit(0);
}

console.log("[prebuild] REPLICATE_API_TOKEN detected; generating any missing premium images...");

const res = spawnSync(process.execPath, ["scripts/generate-product-images.mjs"], {
  stdio: "inherit",
  env: process.env,
});

process.exit(res.status ?? 0);
