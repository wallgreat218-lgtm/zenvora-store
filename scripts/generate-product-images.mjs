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
  return category;
}

function renderPhone(rand) {
  const frameHue = Math.floor(200 + rand() * 120);
  const camLenses = Math.floor(2 + rand() * 2);
  const camBumpX = 470;
  const camBumpY = 240;
  const camBumpW = 190;
  const camBumpH = 150;
  const lensR = 20;
  const lensGap = 52;
  const lensStartX = camBumpX + 55;
  const lensStartY = camBumpY + 52;
  const tilt = Math.floor(-4 + rand() * 8);

  const lenses = Array.from({ length: camLenses }).map((_, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cx = lensStartX + col * lensGap;
    const cy = lensStartY + row * lensGap;
    return `
      <g>
        <circle cx="${cx}" cy="${cy}" r="${lensR + 8}" fill="rgba(0,0,0,0.20)" />
        <circle cx="${cx}" cy="${cy}" r="${lensR + 2}" fill="rgba(20,20,30,0.70)" />
        <circle cx="${cx}" cy="${cy}" r="${lensR}" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.20)" stroke-width="2" />
        <circle cx="${cx - 6}" cy="${cy - 6}" r="6" fill="rgba(255,255,255,0.35)" />
      </g>`;
  });

  return `
  <g filter="url(#shadow)" transform="rotate(${tilt} 600 470)">
    <rect x="448" y="190" rx="58" ry="58" width="304" height="560" fill="url(#deviceFrame)" />
    <rect x="470" y="215" rx="44" ry="44" width="260" height="512" fill="url(#screen)" />
    <path d="M490 250c120-70 240-40 310 40" stroke="rgba(255,255,255,0.16)" stroke-width="14" stroke-linecap="round" />
    <rect x="${camBumpX}" y="${camBumpY}" rx="34" ry="34" width="${camBumpW}" height="${camBumpH}" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" stroke-width="2" />
    ${lenses.join("\n")}
    <circle cx="${camBumpX + 150}" cy="${camBumpY + 42}" r="8" fill="rgba(255,255,255,0.42)" />
    <path d="M735 240c20 160 20 320 0 470" stroke="rgba(255,255,255,0.14)" stroke-width="8" stroke-linecap="round" />
  </g>
  <defs>
    <linearGradient id="deviceFrame" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsla(${frameHue}, 55%, 70%, 0.35)" />
      <stop offset="55%" stop-color="rgba(255,255,255,0.10)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.25)" />
    </linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(0,0,0,0.35)" />
      <stop offset="45%" stop-color="rgba(0,0,0,0.12)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.06)" />
    </linearGradient>
  </defs>`;
}

function renderLaptop(rand) {
  const tilt = Math.floor(-6 + rand() * 12);
  const lidHue = Math.floor(190 + rand() * 120);
  const logoX = 600 + Math.floor(-70 + rand() * 140);
  const logoY = 355 + Math.floor(-40 + rand() * 80);
  const keyLines = Math.floor(6 + rand() * 4);
  const rows = Array.from({ length: keyLines }).map((_, i) => {
    const y = 575 + i * 18;
    return `<line x1="410" y1="${y}" x2="790" y2="${y}" stroke="rgba(255,255,255,0.10)" stroke-width="2" />`;
  });

  return `
  <g filter="url(#shadow)" transform="rotate(${tilt} 600 520)">
    <rect x="360" y="250" rx="28" ry="28" width="480" height="320" fill="url(#lid)" stroke="rgba(255,255,255,0.16)" stroke-width="2" />
    <rect x="385" y="275" rx="20" ry="20" width="430" height="270" fill="rgba(0,0,0,0.25)" />
    <path d="M380 320c180-120 360-60 460 60" stroke="rgba(255,255,255,0.12)" stroke-width="14" stroke-linecap="round" />

    <path d="M320 585h560l-55 120H375z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" stroke-width="2" />
    <g>
      ${rows.join("\n")}
      <rect x="545" y="620" rx="10" ry="10" width="110" height="22" fill="rgba(255,255,255,0.10)" />
    </g>

    <circle cx="${logoX}" cy="${logoY}" r="38" fill="hsla(${lidHue}, 65%, 68%, 0.22)" />
    <circle cx="${logoX}" cy="${logoY}" r="18" fill="hsla(${lidHue}, 70%, 78%, 0.20)" />
  </g>
  <defs>
    <linearGradient id="lid" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.10)" />
      <stop offset="55%" stop-color="hsla(${lidHue}, 55%, 62%, 0.20)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.28)" />
    </linearGradient>
  </defs>`;
}

function renderEarbuds(rand) {
  const tilt = Math.floor(-6 + rand() * 12);
  const hue = Math.floor(240 + rand() * 90);
  const caseW = 330;
  const caseH = 220;
  const caseX = 435;
  const caseY = 455;

  return `
  <g filter="url(#shadow)" transform="rotate(${tilt} 600 560)">
    <rect x="${caseX}" y="${caseY}" rx="64" ry="64" width="${caseW}" height="${caseH}" fill="url(#case)" stroke="rgba(255,255,255,0.16)" stroke-width="2" />
    <path d="M460 520c120-70 240-40 280 30" stroke="rgba(255,255,255,0.16)" stroke-width="12" stroke-linecap="round" />
    <circle cx="600" cy="545" r="10" fill="rgba(255,255,255,0.18)" />

    <g>
      <path d="M430 380c0-60 50-110 110-110s110 50 110 110c0 50-35 94-84 106v80c0 18-14 32-32 32h-20c-18 0-32-14-32-32v-54c-26-18-42-47-42-82z" fill="url(#bud)" stroke="rgba(255,255,255,0.14)" stroke-width="2" />
      <path d="M770 380c0-60-50-110-110-110s-110 50-110 110c0 50 35 94 84 106v80c0 18 14 32 32 32h20c18 0 32-14 32-32v-54c26-18 42-47 42-82z" fill="url(#bud)" stroke="rgba(255,255,255,0.14)" stroke-width="2" />
    </g>
  </g>
  <defs>
    <linearGradient id="case" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsla(${hue}, 60%, 70%, 0.22)" />
      <stop offset="45%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.26)" />
    </linearGradient>
    <linearGradient id="bud" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.14)" />
      <stop offset="60%" stop-color="rgba(255,255,255,0.06)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.24)" />
    </linearGradient>
  </defs>`;
}

function renderWatch(rand) {
  const tilt = Math.floor(-8 + rand() * 16);
  const hue = Math.floor(200 + rand() * 140);
  const isRound = rand() > 0.45;
  const face = isRound
    ? `<circle cx="600" cy="460" r="150" fill="url(#face)" stroke="rgba(255,255,255,0.18)" stroke-width="3" />`
    : `<rect x="465" y="310" rx="70" ry="70" width="270" height="300" fill="url(#face)" stroke="rgba(255,255,255,0.18)" stroke-width="3" />`;

  return `
  <g filter="url(#shadow)" transform="rotate(${tilt} 600 470)">
    <rect x="515" y="120" rx="50" ry="50" width="170" height="230" fill="url(#strap)" opacity="0.85" />
    <rect x="515" y="570" rx="50" ry="50" width="170" height="240" fill="url(#strap)" opacity="0.85" />
    ${face}
    <path d="M520 350c130-95 240-65 310 45" stroke="rgba(255,255,255,0.16)" stroke-width="14" stroke-linecap="round" />
    <circle cx="750" cy="460" r="16" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" stroke-width="2" />
    <circle cx="600" cy="460" r="10" fill="rgba(255,255,255,0.18)" />
  </g>
  <defs>
    <linearGradient id="strap" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsla(${hue}, 55%, 62%, 0.26)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.28)" />
    </linearGradient>
    <linearGradient id="face" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(0,0,0,0.32)" />
      <stop offset="55%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.22)" />
    </linearGradient>
  </defs>`;
}

function renderTV(rand) {
  const tilt = Math.floor(-4 + rand() * 8);
  const hue = Math.floor(210 + rand() * 100);
  return `
  <g filter="url(#shadow)" transform="rotate(${tilt} 600 500)">
    <rect x="270" y="260" rx="36" ry="36" width="660" height="400" fill="rgba(0,0,0,0.26)" stroke="rgba(255,255,255,0.14)" stroke-width="2" />
    <rect x="290" y="280" rx="26" ry="26" width="620" height="360" fill="url(#panel)" />
    <path d="M320 320c220-160 460-80 560 80" stroke="rgba(255,255,255,0.12)" stroke-width="14" stroke-linecap="round" />
    <rect x="540" y="665" rx="10" ry="10" width="120" height="16" fill="rgba(255,255,255,0.16)" />
    <path d="M510 680h180l-35 70H545z" fill="rgba(255,255,255,0.10)" />
  </g>
  <defs>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsla(${hue}, 70%, 68%, 0.16)" />
      <stop offset="55%" stop-color="rgba(0,0,0,0.22)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.06)" />
    </linearGradient>
  </defs>`;
}

function renderAccessory(rand) {
  const tilt = Math.floor(-8 + rand() * 16);
  const hue = Math.floor(210 + rand() * 120);
  const isCable = rand() > 0.55;

  return isCable
    ? `
  <g filter="url(#shadow)" transform="rotate(${tilt} 600 520)">
    <path d="M360 610c120-160 360-160 480 0" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="18" stroke-linecap="round" />
    <rect x="340" y="585" rx="18" ry="18" width="72" height="95" fill="url(#acc)" stroke="rgba(255,255,255,0.18)" stroke-width="2" />
    <rect x="788" y="585" rx="18" ry="18" width="72" height="95" fill="url(#acc)" stroke="rgba(255,255,255,0.18)" stroke-width="2" />
    <path d="M380 595v-30" stroke="rgba(255,255,255,0.28)" stroke-width="10" stroke-linecap="round" />
    <path d="M820 595v-30" stroke="rgba(255,255,255,0.28)" stroke-width="10" stroke-linecap="round" />
  </g>
  <defs>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsla(${hue}, 60%, 70%, 0.22)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.26)" />
    </linearGradient>
  </defs>`
    : `
  <g filter="url(#shadow)" transform="rotate(${tilt} 600 520)">
    <rect x="410" y="300" rx="46" ry="46" width="380" height="440" fill="url(#acc)" stroke="rgba(255,255,255,0.16)" stroke-width="2" />
    <rect x="450" y="345" rx="36" ry="36" width="300" height="310" fill="rgba(0,0,0,0.18)" />
    <path d="M460 370c160-110 310-60 390 60" stroke="rgba(255,255,255,0.12)" stroke-width="14" stroke-linecap="round" />
    <rect x="520" y="670" rx="18" ry="18" width="160" height="26" fill="rgba(255,255,255,0.10)" />
  </g>
  <defs>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsla(${hue}, 60%, 70%, 0.20)" />
      <stop offset="55%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.28)" />
    </linearGradient>
  </defs>`;
}

function buildSvg({ slug, name, category }) {
  const seed = hashToSeed(slug);
  const rand = mulberry32(seed);

  // Category-tuned palette ranges (still seeded per product).
  const baseHue =
    category === "phones"
      ? 225
      : category === "laptops"
        ? 210
        : category === "audio"
          ? 255
          : category === "wearables"
            ? 235
            : category === "tvs"
              ? 220
              : 240;
  const hueA = Math.floor(baseHue + rand() * 40);
  const hueB = Math.floor(baseHue + 40 + rand() * 45);
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

  const bokehCount = Math.floor(6 + rand() * 8);
  const bokeh = Array.from({ length: bokehCount }).map(() => {
    const cx = Math.floor(80 + rand() * 1040);
    const cy = Math.floor(80 + rand() * 740);
    const r = Math.floor(18 + rand() * 90);
    const o = (0.05 + rand() * 0.10).toFixed(3);
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(255,255,255,${o})" />`;
  });

  const productRender =
    category === "phones"
      ? renderPhone(rand)
      : category === "laptops"
        ? renderLaptop(rand)
        : category === "audio"
          ? renderEarbuds(rand)
          : category === "wearables"
            ? renderWatch(rand)
            : category === "tvs"
              ? renderTV(rand)
              : renderAccessory(rand);

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
        0 0 0 ${0.10 + rand() * 0.10} 0" />
    </filter>
    <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18" />
    </filter>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="18" result="blur" />
      <feOffset in="blur" dx="0" dy="18" result="off" />
      <feColorMatrix
        in="off"
        type="matrix"
        values="0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0.35 0"
        result="shadow"
      />
      <feMerge>
        <feMergeNode in="shadow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
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

  <g filter="url(#softBlur)">
    ${bokeh.join("\n")}
  </g>

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

  ${productRender}

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
