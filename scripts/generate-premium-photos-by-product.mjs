import fs from "fs";
import path from "path";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "public", "products", "premium");
fs.mkdirSync(outDir, { recursive: true });

const productsFile = path.join(process.cwd(), "src", "lib", "products.ts");
const productsSource = fs.readFileSync(productsFile, "utf8");

const WIDTH = 1800;
const HEIGHT = 1350;

function clampByte(n) {
  return Math.max(0, Math.min(255, n | 0));
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

async function makeNoisePng(width, height, seed) {
  const rand = mulberry32(seed);
  const buf = new Uint8Array(width * height * 4);

  for (let i = 0; i < buf.length; i += 4) {
    const v = clampByte(110 + (rand() - 0.5) * 90);
    buf[i + 0] = v;
    buf[i + 1] = v;
    buf[i + 2] = v;
    buf[i + 3] = clampByte(18 + rand() * 14);
  }

  return sharp(buf, { raw: { width, height, channels: 4 } })
    .blur(0.35)
    .png()
    .toBuffer();
}

function vignetteSvg(width, height) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="v" cx="50%" cy="45%" r="74%">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="70%" stop-color="#000" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.26"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#v)"/>
</svg>`;
}

function studioBackgroundSvg(width, height, seed) {
  const rand = mulberry32(seed);

  // Neutral studio tones with a soft colored cast that still stays unbranded.
  const base = clampByte(14 + rand() * 18);
  const mid = clampByte(34 + rand() * 26);
  const hi = clampByte(72 + rand() * 30);

  const tintR = clampByte(8 + rand() * 14);
  const tintB = clampByte(10 + rand() * 18);

  const spotX = Math.round((0.28 + rand() * 0.44) * 100);
  const spotY = Math.round((0.14 + rand() * 0.25) * 100);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgb(${base + tintR},${base},${base + tintB})"/>
      <stop offset="55%" stop-color="rgb(${mid},${mid},${mid})"/>
      <stop offset="100%" stop-color="rgb(${hi},${hi},${hi})"/>
    </linearGradient>
    <radialGradient id="spot" cx="${spotX}%" cy="${spotY}%" r="70%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.12"/>
      <stop offset="55%" stop-color="#fff" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.30"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#spot)"/>
  <rect y="${Math.round(height * 0.62)}" width="${width}" height="${Math.round(height * 0.38)}" fill="url(#floor)"/>
</svg>`;
}

function addProps(svg, props) {
  // very small helper to inject per-variant values into the SVG via string replace
  // (keeps the rest of the SVG template readable).
  let out = svg;
  for (const [k, v] of Object.entries(props)) {
    out = out.replaceAll(`__${k}__`, String(v));
  }
  return out;
}

function phoneSvg(width, height, seed, variant) {
  const rand = mulberry32(seed + variant * 999);
  const tilt = (rand() - 0.5) * 18;
  const x = Math.round(width * (0.50 + (rand() - 0.5) * 0.10));
  const y = Math.round(height * (0.52 + (rand() - 0.5) * 0.06));
  const w = Math.round(width * (0.29 + rand() * 0.02));
  const h = Math.round(height * (0.60 + rand() * 0.03));
  const r = Math.round(Math.min(w, h) * 0.10);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="220%">
      <feDropShadow dx="0" dy="40" stdDeviation="32" flood-color="#000" flood-opacity="0.55"/>
    </filter>
    <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#222"/>
      <stop offset="55%" stop-color="#2c2c2c"/>
      <stop offset="100%" stop-color="#0f0f0f"/>
    </linearGradient>
    <radialGradient id="glass" cx="35%" cy="20%" r="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.32"/>
    </linearGradient>
  </defs>

  <g transform="translate(${x} ${y}) rotate(${tilt}) translate(${-w / 2} ${-h / 2})" filter="url(#shadow)">
    <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#body)"/>
    <rect x="10" y="10" width="${w - 20}" height="${h - 20}" rx="${Math.max(14, r - 12)}" fill="#070707"/>
    <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#edge)" opacity="0.85"/>
    <rect x="10" y="10" width="${w - 20}" height="${h - 20}" rx="${Math.max(14, r - 12)}" fill="url(#glass)"/>

    <g opacity="0.92">
      <rect x="${Math.round(w * 0.08)}" y="${Math.round(h * 0.08)}" width="${Math.round(w * 0.34)}" height="${Math.round(h * 0.16)}" rx="${Math.round(r * 0.45)}" fill="#101010"/>
      <circle cx="${Math.round(w * 0.20)}" cy="${Math.round(h * 0.14)}" r="${Math.round(w * 0.045)}" fill="#050505"/>
      <circle cx="${Math.round(w * 0.33)}" cy="${Math.round(h * 0.14)}" r="${Math.round(w * 0.045)}" fill="#050505"/>
      <circle cx="${Math.round(w * 0.20)}" cy="${Math.round(h * 0.14)}" r="${Math.round(w * 0.020)}" fill="#262626"/>
      <circle cx="${Math.round(w * 0.33)}" cy="${Math.round(h * 0.14)}" r="${Math.round(w * 0.020)}" fill="#262626"/>
    </g>

    <path d="M ${Math.round(w * 0.12)} ${Math.round(h * 0.18)} C ${Math.round(w * 0.58)} ${Math.round(h * 0.06)}, ${Math.round(w * 0.74)} ${Math.round(h * 0.56)}, ${Math.round(w * 0.42)} ${Math.round(h * 0.92)}" stroke="#fff" stroke-opacity="0.06" stroke-width="${Math.max(2, Math.round(w * 0.012))}" fill="none"/>
  </g>
</svg>`;

  return svg;
}

function laptopSvg(width, height, seed, variant) {
  const rand = mulberry32(seed + variant * 997);
  const tilt = (rand() - 0.5) * 12;
  const x = Math.round(width * (0.52 + (rand() - 0.5) * 0.08));
  const y = Math.round(height * (0.55 + (rand() - 0.5) * 0.05));

  const screenW = Math.round(width * (0.56 + rand() * 0.03));
  const screenH = Math.round(height * (0.42 + rand() * 0.03));
  const baseH = Math.round(height * 0.13);
  const radius = Math.round(Math.min(screenW, screenH) * 0.05);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="220%">
      <feDropShadow dx="0" dy="42" stdDeviation="34" flood-color="#000" flood-opacity="0.56"/>
    </filter>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#252525"/>
      <stop offset="45%" stop-color="#2f2f2f"/>
      <stop offset="100%" stop-color="#121212"/>
    </linearGradient>
    <radialGradient id="display" cx="30%" cy="20%" r="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g transform="translate(${x} ${y}) rotate(${tilt}) translate(${-screenW / 2} ${-(screenH + baseH) / 2})" filter="url(#shadow)">
    <rect x="0" y="0" width="${screenW}" height="${screenH}" rx="${radius}" fill="url(#metal)"/>
    <rect x="14" y="14" width="${screenW - 28}" height="${screenH - 28}" rx="${Math.max(16, radius - 10)}" fill="#070707"/>
    <rect x="14" y="14" width="${screenW - 28}" height="${screenH - 28}" rx="${Math.max(16, radius - 10)}" fill="url(#display)"/>

    <path d="M 40 ${screenH + 20} L ${screenW - 40} ${screenH + 20} Q ${screenW} ${screenH + 20} ${screenW - 18} ${screenH + baseH} L 18 ${screenH + baseH} Q 0 ${screenH + 20} 40 ${screenH + 20} Z" fill="url(#metal)" opacity="0.98"/>
    <rect x="${Math.round(screenW * 0.40)}" y="${screenH + Math.round(baseH * 0.33)}" width="${Math.round(screenW * 0.20)}" height="${Math.round(baseH * 0.32)}" rx="${Math.round(baseH * 0.14)}" fill="#0f0f0f" opacity="0.38"/>

    <path d="M 60 ${screenH + 14} L ${screenW - 60} ${screenH + 14}" stroke="#ffffff" stroke-opacity="0.06" stroke-width="3"/>
  </g>
</svg>`;

  return svg;
}

function audioSvg(width, height, seed, variant) {
  const rand = mulberry32(seed + variant * 991);
  const tilt = (rand() - 0.5) * 16;
  const cx = Math.round(width * (0.50 + (rand() - 0.5) * 0.08));
  const cy = Math.round(height * (0.53 + (rand() - 0.5) * 0.06));
  const radius = Math.round(Math.min(width, height) * (0.18 + rand() * 0.02));

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="220%">
      <feDropShadow dx="0" dy="44" stdDeviation="36" flood-color="#000" flood-opacity="0.58"/>
    </filter>
    <radialGradient id="matte" cx="35%" cy="25%" r="80%">
      <stop offset="0%" stop-color="#2f2f2f"/>
      <stop offset="55%" stop-color="#191919"/>
      <stop offset="100%" stop-color="#0c0c0c"/>
    </radialGradient>
    <radialGradient id="ring" cx="40%" cy="30%" r="85%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.16"/>
      <stop offset="60%" stop-color="#fff" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g transform="translate(${cx} ${cy}) rotate(${tilt})" filter="url(#shadow)">
    <circle cx="0" cy="0" r="${radius}" fill="url(#matte)"/>
    <circle cx="0" cy="0" r="${Math.round(radius * 0.76)}" fill="#090909"/>
    <circle cx="0" cy="0" r="${Math.round(radius * 0.90)}" fill="url(#ring)"/>

    <circle cx="0" cy="0" r="${Math.round(radius * 0.34)}" fill="#070707" opacity="0.86"/>
    <circle cx="${Math.round(radius * -0.18)}" cy="${Math.round(radius * -0.18)}" r="${Math.round(radius * 0.12)}" fill="#ffffff" opacity="0.06"/>
  </g>
</svg>`;

  return svg;
}

function wearableSvg(width, height, seed, variant) {
  const rand = mulberry32(seed + variant * 983);
  const tilt = (rand() - 0.5) * 14;
  const cx = Math.round(width * (0.50 + (rand() - 0.5) * 0.08));
  const cy = Math.round(height * (0.52 + (rand() - 0.5) * 0.06));
  const w = Math.round(width * (0.32 + rand() * 0.02));
  const h = Math.round(height * (0.54 + rand() * 0.02));

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="220%">
      <feDropShadow dx="0" dy="44" stdDeviation="36" flood-color="#000" flood-opacity="0.56"/>
    </filter>
    <linearGradient id="strap" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#202020"/>
      <stop offset="55%" stop-color="#111"/>
      <stop offset="100%" stop-color="#070707"/>
    </linearGradient>
    <linearGradient id="case" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2f2f2f"/>
      <stop offset="45%" stop-color="#171717"/>
      <stop offset="100%" stop-color="#0b0b0b"/>
    </linearGradient>
    <radialGradient id="glass" cx="35%" cy="20%" r="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g transform="translate(${cx} ${cy}) rotate(${tilt}) translate(${-w / 2} ${-h / 2})" filter="url(#shadow)">
    <rect x="${Math.round(w * 0.34)}" y="0" width="${Math.round(w * 0.32)}" height="${h}" rx="${Math.round(w * 0.16)}" fill="url(#strap)" opacity="0.92"/>

    <rect x="${Math.round(w * 0.16)}" y="${Math.round(h * 0.30)}" width="${Math.round(w * 0.68)}" height="${Math.round(h * 0.34)}" rx="${Math.round(w * 0.16)}" fill="url(#case)"/>
    <rect x="${Math.round(w * 0.20)}" y="${Math.round(h * 0.34)}" width="${Math.round(w * 0.60)}" height="${Math.round(h * 0.26)}" rx="${Math.round(w * 0.14)}" fill="#080808"/>
    <rect x="${Math.round(w * 0.20)}" y="${Math.round(h * 0.34)}" width="${Math.round(w * 0.60)}" height="${Math.round(h * 0.26)}" rx="${Math.round(w * 0.14)}" fill="url(#glass)"/>

    <path d="M ${Math.round(w * 0.24)} ${Math.round(h * 0.42)} C ${Math.round(w * 0.54)} ${Math.round(h * 0.34)}, ${Math.round(w * 0.62)} ${Math.round(h * 0.52)}, ${Math.round(w * 0.44)} ${Math.round(h * 0.62)}" stroke="#fff" stroke-opacity="0.06" stroke-width="${Math.max(2, Math.round(w * 0.03))}" fill="none"/>
  </g>
</svg>`;

  return svg;
}

function accessorySvg(width, height, seed, variant) {
  const rand = mulberry32(seed + variant * 977);
  const tilt = (rand() - 0.5) * 12;
  const cx = Math.round(width * (0.50 + (rand() - 0.5) * 0.08));
  const cy = Math.round(height * (0.56 + (rand() - 0.5) * 0.05));
  const w = Math.round(width * (0.54 + rand() * 0.03));
  const h = Math.round(height * (0.18 + rand() * 0.02));
  const r = Math.round(h * 0.32);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="220%">
      <feDropShadow dx="0" dy="44" stdDeviation="36" flood-color="#000" flood-opacity="0.58"/>
    </filter>
    <linearGradient id="mat" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2b2b2b"/>
      <stop offset="45%" stop-color="#161616"/>
      <stop offset="100%" stop-color="#0b0b0b"/>
    </linearGradient>
    <radialGradient id="shine" cx="35%" cy="20%" r="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g transform="translate(${cx} ${cy}) rotate(${tilt}) translate(${-w / 2} ${-h / 2})" filter="url(#shadow)">
    <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#mat)"/>
    <rect x="${Math.round(w * 0.03)}" y="${Math.round(h * 0.18)}" width="${Math.round(w * 0.94)}" height="${Math.round(h * 0.58)}" rx="${Math.round(r * 0.8)}" fill="#0b0b0b" opacity="0.35"/>
    <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#shine)"/>

    <g opacity="0.14">
      ${Array.from({ length: 12 })
        .map((_, i) => {
          const keyW = Math.round((w * 0.92) / 12);
          const keyH = Math.round(h * 0.36);
          const startX = Math.round(w * 0.04);
          const startY = Math.round(h * 0.30);
          return `<rect x="${startX + i * keyW}" y="${startY}" width="${Math.max(10, keyW - 8)}" height="${keyH}" rx="${Math.round(keyH * 0.2)}" fill="#fff"/>`;
        })
        .join("\n")}
    </g>
  </g>
</svg>`;

  return svg;
}

const renderers = {
  phones: phoneSvg,
  laptops: laptopSvg,
  audio: audioSvg,
  wearables: wearableSvg,
  accessories: accessorySvg,
};

function parseProducts(source) {
  const found = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?category:\s*"(phones|laptops|audio|wearables|accessories)"/g;
  let m;
  while ((m = re.exec(source))) {
    found.push({ slug: m[1], category: m[2] });
  }
  return found;
}

async function renderOne({ slug, category }, index) {
  const seed = hashString(`${slug}:${category}`) + index * 1337;
  const bg = Buffer.from(studioBackgroundSvg(WIDTH, HEIGHT, seed));
  const fg = Buffer.from(renderers[category](WIDTH, HEIGHT, seed + 7, index));
  const noise = await makeNoisePng(WIDTH, HEIGHT, seed + 999);
  const vignette = Buffer.from(vignetteSvg(WIDTH, HEIGHT));

  const fileName = `${slug}-${String(index).padStart(2, "0")}.webp`;
  const filePath = path.join(outDir, fileName);

  const pipeline = sharp(bg)
    .composite([
      { input: await sharp(fg).png().toBuffer(), blend: "over" },
      { input: noise, blend: "overlay" },
      { input: vignette, blend: "multiply" },
    ])
    .webp({ quality: 92, effort: 5 });

  await pipeline.toFile(filePath);
  return fileName;
}

const products = parseProducts(productsSource);
if (!products.length) {
  console.error("No products found in src/lib/products.ts (slug/category parse failed).");
  process.exit(1);
}

const IMAGES_PER_PRODUCT = 4; // requirement: 3–5

let count = 0;
for (const p of products) {
  for (let i = 1; i <= IMAGES_PER_PRODUCT; i++) {
    // eslint-disable-next-line no-await-in-loop
    await renderOne(p, i);
    count += 1;
  }
}

console.log(`Generated ${count} per-product WebP images (${IMAGES_PER_PRODUCT} each) in public/products/premium`);
