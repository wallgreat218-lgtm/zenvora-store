import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PRODUCTS_TS = path.join(process.cwd(), "src", "data", "products.ts");
const OUT_DIR = path.join(process.cwd(), "public", "products", "generated");

const FORCE = process.argv.includes("--force") || process.env.FORCE_IMAGES === "1";
const LIMIT = Number(process.env.LIMIT ?? "0"); // 0 = no limit

function hashToSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function categoryLabel(category) {
  return category === "phones"
    ? "Phones"
    : category === "laptops"
      ? "Laptops"
      : category === "audio"
        ? "Audio"
        : category === "tvs"
          ? "TVs"
          : category === "wearables"
            ? "Wearables"
            : "Accessories";
}

function extractProductsArrayJson(tsText) {
  // We expect a JSON-like array literal in the file.
  // Find the first array literal after `= [` for either `export const products` or `const baseProducts`.
  const markerIdx = tsText.search(/\b(products|baseProducts)\b\s*:\s*Product\[\]\s*=\s*\[/);
  const fallbackIdx = tsText.search(/\b(products|baseProducts)\b\s*=\s*\[/);
  const idx = markerIdx !== -1 ? markerIdx : fallbackIdx;
  if (idx === -1) throw new Error("Could not find products array in src/data/products.ts");

  const eq = tsText.indexOf("=", idx);
  if (eq === -1) throw new Error("Could not locate '=' for products array");

  const startBracket = tsText.indexOf("[", eq);
  if (startBracket === -1) throw new Error("Could not locate '[' for products array");

  let i = startBracket;
  let depth = 0;
  let inString = false;
  let escape = false;

  for (; i < tsText.length; i++) {
    const ch = tsText[i];
    if (inString) {
      if (escape) {
        escape = false;
      } else if (ch === "\\") {
        escape = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      continue;
    }

    if (ch === "[") {
      depth++;
      continue;
    }
    if (ch === "]") {
      depth--;
      if (depth === 0) {
        const end = i + 1;
        return tsText.slice(startBracket, end);
      }
    }
  }

  throw new Error("Unterminated products array");
}

function iconSvg(category) {
  const common = 'fill="none" stroke="rgba(255,255,255,0.82)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"';
  if (category === "phones") {
    return `<g ${common}>
      <rect x="470" y="190" rx="44" ry="44" width="260" height="520" />
      <line x1="520" y1="250" x2="680" y2="250" />
      <circle cx="600" cy="670" r="10" fill="rgba(255,255,255,0.65)" stroke="none" />
    </g>`;
  }
  if (category === "laptops") {
    return `<g ${common}>
      <rect x="380" y="240" rx="26" ry="26" width="440" height="300" />
      <path d="M320 560h560l-40 90H360z" />
      <line x1="420" y1="285" x2="780" y2="285" />
    </g>`;
  }
  if (category === "audio") {
    return `<g ${common}>
      <path d="M430 520v-90c0-95 76-172 170-172s170 77 170 172v90" />
      <rect x="380" y="520" rx="30" ry="30" width="120" height="150" />
      <rect x="700" y="520" rx="30" ry="30" width="120" height="150" />
      <path d="M500 670c25 30 60 46 100 46s75-16 100-46" />
    </g>`;
  }
  if (category === "tvs") {
    return `<g ${common}>
      <rect x="320" y="240" rx="30" ry="30" width="560" height="360" />
      <path d="M520 640h160" />
      <path d="M560 600l-40 80" />
      <path d="M640 600l40 80" />
    </g>`;
  }
  if (category === "wearables") {
    return `<g ${common}>
      <rect x="460" y="300" rx="64" ry="64" width="280" height="300" />
      <rect x="520" y="360" rx="36" ry="36" width="160" height="180" />
      <path d="M560 300l-30-90h140l-30 90" />
      <path d="M560 600l-30 90h140l-30-90" />
    </g>`;
  }
  // accessories / generic
  return `<g ${common}>
    <path d="M600 230l90 90-90 90-90-90z" />
    <path d="M420 540c0-100 80-180 180-180s180 80 180 180-80 180-180 180-180-80-180-180z" />
  </g>`;
}

function buildSvg({ slug, name, category }) {
  const seed = hashToSeed(slug);
  const rand = mulberry32(seed);

  const hueA = Math.floor(220 + rand() * 55); // blue/purple
  const hueB = Math.floor(265 + rand() * 55); // purple/pink
  const satA = Math.floor(55 + rand() * 18);
  const satB = Math.floor(55 + rand() * 18);
  const lightA = Math.floor(18 + rand() * 10);
  const lightB = Math.floor(20 + rand() * 10);

  const accentHue = Math.floor(190 + rand() * 120);
  const accentSat = Math.floor(60 + rand() * 16);
  const accentLight = Math.floor(60 + rand() * 10);

  const x1 = Math.floor(180 + rand() * 520);
  const y1 = Math.floor(120 + rand() * 380);
  const x2 = Math.floor(520 + rand() * 420);
  const y2 = Math.floor(420 + rand() * 340);

  const blob1 = {
    cx: Math.floor(200 + rand() * 250),
    cy: Math.floor(160 + rand() * 260),
    r: Math.floor(130 + rand() * 120),
  };
  const blob2 = {
    cx: Math.floor(800 + rand() * 240),
    cy: Math.floor(520 + rand() * 240),
    r: Math.floor(140 + rand() * 120),
  };
  const pill = {
    x: Math.floor(120 + rand() * 120),
    y: Math.floor(620 + rand() * 100),
    w: Math.floor(320 + rand() * 160),
    h: Math.floor(64 + rand() * 22),
    rot: Math.floor(-12 + rand() * 24),
  };

  const safeName = String(name ?? slug);
  const label = categoryLabel(category);
  const brandMark = "ZenVora";

  // Slightly vary the silhouette scale and rotation per product.
  const silhouetteScale = clamp(0.95 + rand() * 0.14, 0.92, 1.1);
  const silhouetteRot = Math.floor(-6 + rand() * 12);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hueA}, ${satA}%, ${lightA}%)" />
      <stop offset="55%" stop-color="hsl(${hueB}, ${satB}%, ${lightB}%)" />
      <stop offset="100%" stop-color="hsl(${hueA}, ${satA}%, ${lightA - 2}%)" />
    </linearGradient>

    <radialGradient id="glowA" cx="${x1}" cy="${y1}" r="520" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="hsla(${accentHue}, ${accentSat}%, ${accentLight}%, 0.55)" />
      <stop offset="70%" stop-color="hsla(${accentHue}, ${accentSat}%, ${accentLight}%, 0.0)" />
    </radialGradient>
    <radialGradient id="glowB" cx="${x2}" cy="${y2}" r="560" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="hsla(${accentHue + 30}, ${accentSat}%, ${accentLight}%, 0.45)" />
      <stop offset="70%" stop-color="hsla(${accentHue + 30}, ${accentSat}%, ${accentLight}%, 0.0)" />
    </radialGradient>

    <filter id="noise" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" seed="${seed % 999}" />
      <feColorMatrix type="matrix" values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 0.12 0" />
    </filter>
    <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18" />
    </filter>

    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.30)" />
      <stop offset="55%" stop-color="rgba(255,255,255,0.10)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.04)" />
    </linearGradient>
    <radialGradient id="shine" cx="30%" cy="10%" r="70%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.55)" />
      <stop offset="55%" stop-color="rgba(255,255,255,0.00)" />
    </radialGradient>
  </defs>

  <rect width="1200" height="900" fill="url(#bg)" />
  <rect width="1200" height="900" fill="url(#glowA)" opacity="0.9" />
  <rect width="1200" height="900" fill="url(#glowB)" opacity="0.8" />

  <g opacity="0.70" filter="url(#softBlur)">
    <circle cx="${blob1.cx}" cy="${blob1.cy}" r="${blob1.r}" fill="hsla(${accentHue}, ${accentSat}%, ${accentLight + 6}%, 0.25)" />
    <circle cx="${blob2.cx}" cy="${blob2.cy}" r="${blob2.r}" fill="hsla(${accentHue + 35}, ${accentSat}%, ${accentLight + 8}%, 0.22)" />
  </g>

  <g transform="translate(${pill.x} ${pill.y}) rotate(${pill.rot})">
    <rect x="0" y="0" width="${pill.w}" height="${pill.h}" rx="${Math.floor(pill.h / 2)}" ry="${Math.floor(pill.h / 2)}" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
  </g>

  <rect width="1200" height="900" filter="url(#noise)" opacity="0.55" />

  <g transform="translate(0 0)">
    <rect x="120" y="120" width="960" height="660" rx="44" ry="44" fill="url(#glass)" stroke="rgba(255,255,255,0.16)" stroke-width="1" />
    <rect x="120" y="120" width="960" height="660" rx="44" ry="44" fill="url(#shine)" opacity="0.85" />
  </g>

  <g transform="translate(0 0) rotate(${silhouetteRot} 600 450) scale(${silhouetteScale})" opacity="0.95">
    ${iconSvg(category)}
  </g>

  <g font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" fill="rgba(255,255,255,0.92)">
    <text x="160" y="190" font-size="24" letter-spacing="0.14em" fill="rgba(255,255,255,0.68)">${label.toUpperCase()}</text>
    <text x="160" y="235" font-size="46" font-weight="650" letter-spacing="-0.02em">${escapeXml(safeName)}</text>
    <text x="1040" y="740" font-size="18" text-anchor="end" fill="rgba(255,255,255,0.60)" letter-spacing="0.10em">${brandMark.toUpperCase()}</text>
  </g>

  <rect x="120" y="120" width="960" height="660" rx="44" ry="44" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
</svg>`;
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function writePngFromSvg(svg, outPath) {
  await ensureDir(path.dirname(outPath));
  await sharp(Buffer.from(svg))
    .png({ quality: 92 })
    .toFile(outPath);
}

async function loadProducts() {
  const ts = await fs.promises.readFile(PRODUCTS_TS, "utf8");
  const arrJson = extractProductsArrayJson(ts);
  const parsed = JSON.parse(arrJson);
  if (!Array.isArray(parsed)) throw new Error("Parsed products is not an array");
  return parsed;
}

async function main() {
  const products = await loadProducts();
  await ensureDir(OUT_DIR);

  const failures = [];
  let wrote = 0;
  let skipped = 0;

  // Always ensure fallback exists.
  const fallbackOut = path.join(OUT_DIR, "fallback.png");
  if (FORCE || !fs.existsSync(fallbackOut)) {
    const fallbackSvg = buildSvg({ slug: "fallback", name: "Premium Tech", category: "accessories" });
    await writePngFromSvg(fallbackSvg, fallbackOut);
    console.log(`[fallback] wrote ${path.relative(process.cwd(), fallbackOut)}`);
  }

  let processed = 0;
  for (const p of products) {
    if (LIMIT > 0 && processed >= LIMIT) break;
    const outPath = path.join(OUT_DIR, `${p.slug}.png`);
    if (!FORCE && fs.existsSync(outPath)) {
      skipped++;
      processed++;
      continue;
    }

    try {
      const svg = buildSvg(p);
      await writePngFromSvg(svg, outPath);
      console.log(`[${p.slug}] wrote ${path.relative(process.cwd(), outPath)}`);
      wrote++;
    } catch (err) {
      failures.push({ slug: p.slug, error: String(err?.message ?? err) });
      console.error(`[${p.slug}] failed: ${String(err?.message ?? err)}`);
    }
    processed++;
  }

  const report = {
    total: products.length,
    wrote,
    skipped,
    failures,
  };
  await fs.promises.writeFile(
    path.join(OUT_DIR, "_report.json"),
    JSON.stringify(report, null, 2),
    "utf8"
  );

  if (failures.length > 0) {
    console.error(`\nDone with ${failures.length} failure(s). See public/products/generated/_report.json`);
    return;
  }

  console.log("\nDone.");
}

await main();
