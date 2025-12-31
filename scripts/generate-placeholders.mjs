import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, "src", "data", "products.ts");
const OUT_DIR = path.join(ROOT, "public", "products");
const PREMIUM_DIR = path.join(ROOT, "public", "products", "premium");
const MANIFEST_OUT = path.join(ROOT, "src", "data", "missing-premium-images.ts");

function readProductsFromTs() {
  const src = fs.readFileSync(DATA_FILE, "utf8");
  const marker = "export const products";
  const startIdx = src.indexOf(marker);
  if (startIdx === -1) throw new Error("Could not find 'export const products' in src/data/products.ts");

  // Find the array literal after the '=' (avoid the 'Product[]' type bracket).
  const eqIdx = src.indexOf("=", startIdx);
  if (eqIdx === -1) throw new Error("Could not find '=' after export const products");

  const openIdx = src.indexOf("[", eqIdx);
  if (openIdx === -1) throw new Error("Could not find products array start '['");

  // Scan to matching closing ']' while respecting strings.
  let i = openIdx;
  let depth = 0;
  let inStr = false;
  let strQuote = "\"";
  let escaped = false;

  for (; i < src.length; i++) {
    const ch = src[i];

    if (inStr) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === strQuote) {
        inStr = false;
      }
      continue;
    }

    if (ch === "\"" || ch === "'") {
      inStr = true;
      strQuote = ch;
      continue;
    }

    if (ch === "[") depth++;
    if (ch === "]") {
      depth--;
      if (depth === 0) {
        i++; // include closing bracket
        break;
      }
    }
  }

  const arrayLiteral = src.slice(openIdx, i);
  if (!arrayLiteral.startsWith("[")) throw new Error("Extraction failed (missing '[')");

  // Evaluate as JS array literal.
  const code = `(function(){ return ${arrayLiteral}; })()`;
  const products = vm.runInNewContext(code, {}, { timeout: 2000 });
  if (!Array.isArray(products)) throw new Error("Parsed products is not an array");
  return products;
}

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

function iconSvg(category) {
  // Simple, unbranded icons (stroke-based) to keep placeholders premium.
  switch (category) {
    case "phones":
      return `<rect x="438" y="210" width="148" height="348" rx="26" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="18" />
              <rect x="480" y="244" width="64" height="6" rx="3" fill="rgba(255,255,255,0.35)" />
              <circle cx="512" cy="528" r="10" fill="rgba(255,255,255,0.28)" />`;
    case "laptops":
      return `<rect x="352" y="250" width="320" height="204" rx="20" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="18" />
              <path d="M300 494h424c16 0 26 18 18 32l-18 32c-4 8-12 12-20 12H320c-8 0-16-4-20-12l-18-32c-8-14 2-32 18-32Z" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="18" />`;
    case "audio":
      return `<path d="M408 292c0-42 34-76 76-76h56c42 0 76 34 76 76v184c0 42-34 76-76 76h-56c-42 0-76-34-76-76V292Z" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="18" />
              <path d="M408 360h-42c-26 0-48 22-48 48v8c0 26 22 48 48 48h42" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="18" />
              <path d="M616 360h42c26 0 48 22 48 48v8c0 26-22 48-48 48h-42" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="18" />`;
    case "wearables":
      return `<rect x="420" y="254" width="184" height="280" rx="56" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="18" />
              <path d="M468 254l18-52c4-12 16-20 28-20h20c12 0 24 8 28 20l18 52" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="18" />
              <path d="M468 534l18 52c4 12 16 20 28 20h20c12 0 24-8 28-20l18-52" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="18" />`;
    case "tvs":
      return `<rect x="300" y="256" width="424" height="256" rx="22" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="18" />
              <path d="M448 548h128" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="18" stroke-linecap="round" />
              <path d="M512 512v36" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="18" stroke-linecap="round" />`;
    default:
      return `<path d="M512 246c86 0 156 70 156 156S598 558 512 558 356 488 356 402s70-156 156-156Z" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="18" />
              <path d="M512 310v98" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="18" stroke-linecap="round" />
              <circle cx="512" cy="464" r="12" fill="rgba(255,255,255,0.28)" />`;
  }
}

function makeSvg({ slug, name, category }) {
  const initial = (name || slug || "Z").trim().charAt(0).toUpperCase();
  const safeName = escapeXml(name || slug);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="768" viewBox="0 0 1024 768">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B1220"/>
      <stop offset="0.55" stop-color="#0F1B33"/>
      <stop offset="1" stop-color="#2B1B54"/>
    </linearGradient>
    <radialGradient id="glow" cx="35%" cy="20%" r="65%">
      <stop offset="0" stop-color="#7C3AED" stop-opacity="0.35"/>
      <stop offset="0.6" stop-color="#2563EB" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <filter id="noise" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0"/>
    </filter>
  </defs>

  <rect width="1024" height="768" fill="url(#bg)"/>
  <rect width="1024" height="768" fill="url(#glow)"/>
  <rect width="1024" height="768" filter="url(#noise)" opacity="0.9"/>

  <rect x="64" y="64" width="896" height="640" rx="44" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>

  <g>
    <text x="128" y="190" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="56" font-weight="700" fill="rgba(255,255,255,0.85)">${initial}</text>
    <text x="128" y="236" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="22" font-weight="500" fill="rgba(255,255,255,0.55)">${safeName}</text>
  </g>

  <g>
    <g opacity="0.95">
      ${iconSvg(category)}
    </g>
  </g>

  <g>
    <path d="M64 116h896" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>
    <circle cx="92" cy="90" r="6" fill="rgba(255,255,255,0.14)"/>
    <circle cx="114" cy="90" r="6" fill="rgba(255,255,255,0.10)"/>
    <circle cx="136" cy="90" r="6" fill="rgba(255,255,255,0.08)"/>
  </g>
</svg>`;
}

async function main() {
  const products = readProductsFromTs();
  await fs.promises.mkdir(OUT_DIR, { recursive: true });

  /** @type {string[]} */
  const missingPremiumSlugs = [];

  let created = 0;
  let skipped = 0;

  for (const p of products) {
    const slug = p?.slug;
    if (!slug) continue;

    const premium01 = path.join(PREMIUM_DIR, slug, "01.webp");
    const outPath = path.join(OUT_DIR, `${slug}.svg`);

    // Only generate placeholders when the premium set is missing.
    if (exists(premium01)) {
      skipped++;
      continue;
    }

    missingPremiumSlugs.push(slug);

    if (exists(outPath)) {
      skipped++;
      continue;
    }

    const svg = makeSvg({ slug, name: p.name, category: p.category });
    await fs.promises.writeFile(outPath, svg, "utf8");
    created++;
  }

  missingPremiumSlugs.sort();
  const manifest = `// This file is auto-generated by scripts/generate-placeholders.mjs\n` +
    `// It lists product slugs that do NOT have public/products/premium/<slug>/01.webp.\n` +
    `// Used by client components to select local placeholder SVGs without triggering 404s.\n\n` +
    `export const missingPremiumImageSlugs = ${JSON.stringify(missingPremiumSlugs, null, 2)} as const;\n`;
  await fs.promises.mkdir(path.dirname(MANIFEST_OUT), { recursive: true });
  await fs.promises.writeFile(MANIFEST_OUT, manifest, "utf8");

  console.log(`[placeholders] created ${created} placeholder SVG(s), skipped ${skipped}.`);
}

await main();
