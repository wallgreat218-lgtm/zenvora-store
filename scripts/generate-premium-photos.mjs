import fs from "fs";
import path from "path";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "public", "products", "premium");
fs.mkdirSync(outDir, { recursive: true });

const WIDTH = 1600;
const HEIGHT = 1200;

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

async function makeNoisePng(width, height, seed) {
  const rand = mulberry32(seed);
  const buf = new Uint8Array(width * height * 4);

  for (let i = 0; i < buf.length; i += 4) {
    const v = clampByte(110 + (rand() - 0.5) * 80);
    buf[i + 0] = v;
    buf[i + 1] = v;
    buf[i + 2] = v;
    buf[i + 3] = clampByte(14 + rand() * 12);
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
    <radialGradient id="v" cx="50%" cy="45%" r="72%">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="65%" stop-color="#000" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.22"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#v)"/>
</svg>`;
}

function studioBackgroundSvg(width, height, seed) {
  const rand = mulberry32(seed);
  const a = clampByte(18 + rand() * 18);
  const b = clampByte(38 + rand() * 22);
  const c = clampByte(70 + rand() * 28);

  // Neutral studio tones (unbranded), with subtle highlight sweep.
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgb(${a},${a},${a})"/>
      <stop offset="55%" stop-color="rgb(${b},${b},${b})"/>
      <stop offset="100%" stop-color="rgb(${c},${c},${c})"/>
    </linearGradient>
    <radialGradient id="spot" cx="35%" cy="22%" r="70%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.10"/>
      <stop offset="55%" stop-color="#fff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.28"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#spot)"/>
  <rect y="${Math.round(height * 0.62)}" width="${width}" height="${Math.round(height * 0.38)}" fill="url(#floor)"/>
</svg>`;
}

function phoneSvg(width, height, seed) {
  const rand = mulberry32(seed);
  const tilt = (rand() - 0.5) * 10;
  const x = Math.round(width * (0.49 + (rand() - 0.5) * 0.06));
  const y = Math.round(height * (0.50 + (rand() - 0.5) * 0.03));
  const w = Math.round(width * 0.30);
  const h = Math.round(height * 0.62);
  const r = Math.round(Math.min(w, h) * 0.09);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="32" stdDeviation="26" flood-color="#000" flood-opacity="0.45"/>
    </filter>
    <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="55%" stop-color="#2a2a2a"/>
      <stop offset="100%" stop-color="#0f0f0f"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.20"/>
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.25"/>
    </linearGradient>
    <radialGradient id="glass" cx="35%" cy="20%" r="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g transform="translate(${x} ${y}) rotate(${tilt}) translate(${-w / 2} ${-h / 2})" filter="url(#shadow)">
    <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#body)"/>
    <rect x="10" y="10" width="${w - 20}" height="${h - 20}" rx="${Math.max(14, r - 10)}" fill="#0b0b0b"/>
    <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#edge)" opacity="0.8"/>
    <rect x="10" y="10" width="${w - 20}" height="${h - 20}" rx="${Math.max(14, r - 10)}" fill="url(#glass)"/>

    <!-- subtle camera bump (unbranded) -->
    <g opacity="0.9">
      <rect x="${Math.round(w * 0.08)}" y="${Math.round(h * 0.08)}" width="${Math.round(w * 0.34)}" height="${Math.round(h * 0.16)}" rx="${Math.round(r * 0.45)}" fill="#111"/>
      <circle cx="${Math.round(w * 0.20)}" cy="${Math.round(h * 0.14)}" r="${Math.round(w * 0.045)}" fill="#050505"/>
      <circle cx="${Math.round(w * 0.33)}" cy="${Math.round(h * 0.14)}" r="${Math.round(w * 0.045)}" fill="#050505"/>
      <circle cx="${Math.round(w * 0.20)}" cy="${Math.round(h * 0.14)}" r="${Math.round(w * 0.020)}" fill="#222"/>
      <circle cx="${Math.round(w * 0.33)}" cy="${Math.round(h * 0.14)}" r="${Math.round(w * 0.020)}" fill="#222"/>
    </g>

    <!-- highlight sweep -->
    <path d="M ${Math.round(w * 0.10)} ${Math.round(h * 0.18)} C ${Math.round(w * 0.55)} ${Math.round(h * 0.05)}, ${Math.round(w * 0.70)} ${Math.round(h * 0.55)}, ${Math.round(w * 0.40)} ${Math.round(h * 0.90)}" stroke="#fff" stroke-opacity="0.06" stroke-width="${Math.max(2, Math.round(w * 0.012))}" fill="none"/>
  </g>
</svg>`;
}

function laptopSvg(width, height, seed) {
  const rand = mulberry32(seed);
  const tilt = (rand() - 0.5) * 6;
  const x = Math.round(width * (0.52 + (rand() - 0.5) * 0.05));
  const y = Math.round(height * (0.54 + (rand() - 0.5) * 0.02));

  const screenW = Math.round(width * 0.56);
  const screenH = Math.round(height * 0.44);
  const baseH = Math.round(height * 0.12);
  const radius = Math.round(Math.min(screenW, screenH) * 0.04);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="34" stdDeviation="28" flood-color="#000" flood-opacity="0.50"/>
    </filter>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#202020"/>
      <stop offset="40%" stop-color="#2d2d2d"/>
      <stop offset="100%" stop-color="#101010"/>
    </linearGradient>
    <radialGradient id="display" cx="30%" cy="20%" r="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.14"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g transform="translate(${x} ${y}) rotate(${tilt}) translate(${-screenW / 2} ${-(screenH + baseH) / 2})" filter="url(#shadow)">
    <rect x="0" y="0" width="${screenW}" height="${screenH}" rx="${radius}" fill="url(#metal)"/>
    <rect x="14" y="14" width="${screenW - 28}" height="${screenH - 28}" rx="${Math.max(16, radius - 10)}" fill="#0a0a0a"/>
    <rect x="14" y="14" width="${screenW - 28}" height="${screenH - 28}" rx="${Math.max(16, radius - 10)}" fill="url(#display)"/>

    <path d="M 40 ${screenH + 22} L ${screenW - 40} ${screenH + 22} Q ${screenW} ${screenH + 22} ${screenW - 18} ${screenH + baseH} L 18 ${screenH + baseH} Q 0 ${screenH + 22} 40 ${screenH + 22} Z" fill="url(#metal)" opacity="0.98"/>
    <rect x="${Math.round(screenW * 0.42)}" y="${screenH + Math.round(baseH * 0.32)}" width="${Math.round(screenW * 0.16)}" height="${Math.round(baseH * 0.34)}" rx="${Math.round(baseH * 0.14)}" fill="#0f0f0f" opacity="0.35"/>

    <path d="M 60 ${screenH + 16} L ${screenW - 60} ${screenH + 16}" stroke="#ffffff" stroke-opacity="0.06" stroke-width="3"/>
  </g>
</svg>`;
}

function audioSvg(width, height, seed) {
  const rand = mulberry32(seed);
  const tilt = (rand() - 0.5) * 8;
  const cx = Math.round(width * (0.50 + (rand() - 0.5) * 0.05));
  const cy = Math.round(height * (0.52 + (rand() - 0.5) * 0.03));
  const radius = Math.round(Math.min(width, height) * 0.19);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="34" stdDeviation="28" flood-color="#000" flood-opacity="0.52"/>
    </filter>
    <radialGradient id="matte" cx="35%" cy="25%" r="80%">
      <stop offset="0%" stop-color="#2c2c2c"/>
      <stop offset="55%" stop-color="#171717"/>
      <stop offset="100%" stop-color="#0d0d0d"/>
    </radialGradient>
    <radialGradient id="ring" cx="40%" cy="30%" r="85%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.14"/>
      <stop offset="60%" stop-color="#fff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g transform="translate(${cx} ${cy}) rotate(${tilt})" filter="url(#shadow)">
    <circle cx="0" cy="0" r="${radius}" fill="url(#matte)"/>
    <circle cx="0" cy="0" r="${Math.round(radius * 0.76)}" fill="#0b0b0b"/>
    <circle cx="0" cy="0" r="${Math.round(radius * 0.88)}" fill="url(#ring)"/>

    <circle cx="0" cy="0" r="${Math.round(radius * 0.34)}" fill="#070707" opacity="0.85"/>
    <circle cx="${Math.round(radius * -0.18)}" cy="${Math.round(radius * -0.18)}" r="${Math.round(radius * 0.12)}" fill="#ffffff" opacity="0.06"/>
  </g>
</svg>`;
}

function wearableSvg(width, height, seed) {
  const rand = mulberry32(seed);
  const tilt = (rand() - 0.5) * 8;
  const cx = Math.round(width * (0.50 + (rand() - 0.5) * 0.05));
  const cy = Math.round(height * (0.50 + (rand() - 0.5) * 0.03));
  const w = Math.round(width * 0.32);
  const h = Math.round(height * 0.54);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="34" stdDeviation="28" flood-color="#000" flood-opacity="0.50"/>
    </filter>
    <linearGradient id="strap" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1b1b1b"/>
      <stop offset="55%" stop-color="#0f0f0f"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>
    <linearGradient id="case" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2a2a2a"/>
      <stop offset="45%" stop-color="#151515"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <radialGradient id="glass" cx="35%" cy="20%" r="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="55%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g transform="translate(${cx} ${cy}) rotate(${tilt}) translate(${-w / 2} ${-h / 2})" filter="url(#shadow)">
    <rect x="${Math.round(w * 0.34)}" y="0" width="${Math.round(w * 0.32)}" height="${h}" rx="${Math.round(w * 0.16)}" fill="url(#strap)" opacity="0.92"/>

    <rect x="${Math.round(w * 0.16)}" y="${Math.round(h * 0.30)}" width="${Math.round(w * 0.68)}" height="${Math.round(h * 0.34)}" rx="${Math.round(w * 0.16)}" fill="url(#case)"/>
    <rect x="${Math.round(w * 0.20)}" y="${Math.round(h * 0.34)}" width="${Math.round(w * 0.60)}" height="${Math.round(h * 0.26)}" rx="${Math.round(w * 0.14)}" fill="#0b0b0b"/>
    <rect x="${Math.round(w * 0.20)}" y="${Math.round(h * 0.34)}" width="${Math.round(w * 0.60)}" height="${Math.round(h * 0.26)}" rx="${Math.round(w * 0.14)}" fill="url(#glass)"/>

    <path d="M ${Math.round(w * 0.24)} ${Math.round(h * 0.42)} C ${Math.round(w * 0.54)} ${Math.round(h * 0.34)}, ${Math.round(w * 0.62)} ${Math.round(h * 0.52)}, ${Math.round(w * 0.44)} ${Math.round(h * 0.62)}" stroke="#fff" stroke-opacity="0.06" stroke-width="${Math.max(2, Math.round(w * 0.03))}" fill="none"/>
  </g>
</svg>`;
}

function accessorySvg(width, height, seed) {
  const rand = mulberry32(seed);
  const tilt = (rand() - 0.5) * 6;
  const cx = Math.round(width * (0.50 + (rand() - 0.5) * 0.05));
  const cy = Math.round(height * (0.54 + (rand() - 0.5) * 0.02));
  const w = Math.round(width * 0.54);
  const h = Math.round(height * 0.18);
  const r = Math.round(h * 0.32);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="34" stdDeviation="28" flood-color="#000" flood-opacity="0.52"/>
    </filter>
    <linearGradient id="mat" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#242424"/>
      <stop offset="45%" stop-color="#141414"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <radialGradient id="shine" cx="35%" cy="20%" r="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.10"/>
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g transform="translate(${cx} ${cy}) rotate(${tilt}) translate(${-w / 2} ${-h / 2})" filter="url(#shadow)">
    <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#mat)"/>
    <rect x="${Math.round(w * 0.03)}" y="${Math.round(h * 0.18)}" width="${Math.round(w * 0.94)}" height="${Math.round(h * 0.58)}" rx="${Math.round(r * 0.8)}" fill="#0b0b0b" opacity="0.35"/>
    <rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#shine)"/>

    <!-- subtle key caps suggestion -->
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
}

async function writeVariant(kind, idx, svgFn) {
  const seed = 1000 + kind.split("").reduce((s, c) => s + c.charCodeAt(0), 0) * 17 + idx * 133;

  const bg = studioBackgroundSvg(WIDTH, HEIGHT, seed);
  const fg = svgFn(WIDTH, HEIGHT, seed + 7);

  const bgPng = Buffer.from(bg);
  const fgPng = Buffer.from(fg);

  const noise = await makeNoisePng(WIDTH, HEIGHT, seed + 99);
  const vignette = Buffer.from(vignetteSvg(WIDTH, HEIGHT));

  const outputName = `${kind}-${String(idx).padStart(2, "0")}.webp`;
  const outputPath = path.join(outDir, outputName);

  const composed = sharp(bgPng)
    .composite([
      { input: await sharp(fgPng).png().toBuffer(), blend: "over" },
      { input: noise, blend: "overlay" },
      { input: vignette, blend: "multiply" },
    ])
    .webp({ quality: 92, effort: 5 });

  await composed.toFile(outputPath);
  return outputName;
}

const kinds = [
  { kind: "phone", svg: phoneSvg },
  { kind: "laptop", svg: laptopSvg },
  { kind: "audio", svg: audioSvg },
  { kind: "wearable", svg: wearableSvg },
  { kind: "accessory", svg: accessorySvg },
];

const generated = [];
for (const k of kinds) {
  for (let i = 1; i <= 5; i++) {
    // eslint-disable-next-line no-await-in-loop
    const name = await writeVariant(k.kind, i, k.svg);
    generated.push(name);
  }
}

console.log(`Generated ${generated.length} premium WebP images in ${path.relative(process.cwd(), outDir)}`);
