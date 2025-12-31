import fs from "fs";

const filePath = "src/lib/products.ts";
const source = fs.readFileSync(filePath, "utf8");

const IMAGES_PER_PRODUCT = 4; // requirement: 3–5

const re =
  /slug:\s*"([^"]+)"([\s\S]*?)image:\s*"[^"]*",\s*\n\s*images:\s*\[[\s\S]*?\],\s*\n\s*category:\s*"(phones|laptops|audio|wearables|accessories)"/g;

let updated = 0;
const result = source.replace(re, (match, slug, between, category) => {
  // Preserve everything between slug and image (name/price/etc), but rewrite image + images.
  const images = Array.from({ length: IMAGES_PER_PRODUCT }).map((_, idx) =>
    `"/products/premium/${slug}-${String(idx + 1).padStart(2, "0")}.webp"`
  );

  updated += 1;

  return `slug: "${slug}"${between}image: "/products/premium/${slug}-01.webp",\n    images: [${images.join(", ")}],\n    category: "${category}"`;
});

if (updated === 0) {
  console.error("No products updated. Pattern may have changed in src/lib/products.ts");
  process.exitCode = 1;
} else {
  fs.writeFileSync(filePath, result, "utf8");
  console.log(`Updated ${updated} products to per-product WebP galleries (${IMAGES_PER_PRODUCT} each).`);
}
