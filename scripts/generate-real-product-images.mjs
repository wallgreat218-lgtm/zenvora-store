import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PRODUCTS_TS = path.join(process.cwd(), "src", "data", "products.ts");

const OUT_DIR = path.join(process.cwd(), "public", "products", "real");
const REPORT_PATH = path.join(OUT_DIR, "_report.json");

const SIZE = 1200;
const FORCE = process.env.FORCE === "1" || process.env.FORCE === "true";
const LIMIT = Number(process.env.LIMIT || 0) || 0;

function extractProductsArrayJson(tsText) {
  // Find the JSON-like array literal for either `const baseProducts` or `export const products`.
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

async function loadProducts() {
  const ts = await fs.promises.readFile(PRODUCTS_TS, "utf8");
  const arrJson = extractProductsArrayJson(ts);
  const parsed = JSON.parse(arrJson);
  if (!Array.isArray(parsed)) throw new Error("Parsed products is not an array");
  // Keep only the fields needed by the renderer.
  return parsed.map((p) => ({ slug: p.slug, category: p.category }));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function fileExists(p) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function hashToSeed(str) {
  // FNV-1a-ish
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function int(rand, min, max) {
  return Math.floor(lerp(min, max + 1, rand()));
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function hsl(h, s, l, a = 1) {
  return `hsla(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%, ${a})`;
}

function baseStudioBackground(rand) {
  // Light studio background with subtle vignette + grain.
  const hue = int(rand, 0, 360);
  const tint = rand() < 0.35;
  const bg1 = tint ? hsl(hue, 10, 98, 1) : "#ffffff";
  const bg2 = tint ? hsl(hue, 10, 96, 1) : "#fbfbfb";
  const vignette = `radial-gradient(900px 720px at 50% 10%, ${bg1} 0%, ${bg2} 65%, #f3f4f6 100%)`;

  const noiseOpacity = 0.035 + rand() * 0.035;

  return {
    vignette,
    noiseOpacity,
  };
}

function softShadow({ cx, cy, rx, ry, opacity = 0.22 }) {
  return `
    <g filter="url(#shadow)">
      <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="rgba(0,0,0,${opacity})" />
    </g>
  `;
}

function renderPhone(rand) {
  const bodyHue = pick(rand, [210, 220, 230, 0, 25, 140, 260]);
  const bodySat = int(rand, 6, 18);
  const bodyL1 = int(rand, 16, 28);
  const bodyL2 = clamp(bodyL1 + int(rand, 8, 16), 18, 40);
  const frame = `url(#deviceBody)`;

  const camBump = rand() < 0.6;
  const lensCount = pick(rand, [2, 3]);

  const phoneW = 430 + int(rand, -40, 40);
  const phoneH = 860 + int(rand, -60, 40);
  const r = 64 + int(rand, -10, 12);

  const screenInset = 30 + int(rand, -6, 8);
  const notch = rand() < 0.5;

  const camX = -phoneW / 2 + 70 + int(rand, -10, 18);
  const camY = -phoneH / 2 + 85 + int(rand, -10, 16);

  const lensR = lensCount === 2 ? 34 : 30;

  const accentHue = (bodyHue + int(rand, 140, 220)) % 360;
  const reflection = hsl(accentHue, 30, 70, 0.18);

  const displayHue = (bodyHue + int(rand, 80, 160)) % 360;
  const displayGlow1 = hsl(displayHue, 80, 56, 0.9);
  const displayGlow2 = hsl((displayHue + 40) % 360, 80, 52, 0.9);

  const cameraMetal = hsl(bodyHue, bodySat, clamp(bodyL2 + 16, 32, 55), 0.85);

  const screen = `
    <g>
      <rect x="${-phoneW / 2 + screenInset}" y="${-phoneH / 2 + screenInset}" width="${phoneW - screenInset * 2}" height="${phoneH - screenInset * 2}" rx="${r - 18}" fill="url(#screen)" />
      <rect x="${-phoneW / 2 + screenInset}" y="${-phoneH / 2 + screenInset}" width="${phoneW - screenInset * 2}" height="${phoneH - screenInset * 2}" rx="${r - 18}" fill="url(#screenShine)" opacity="0.55" />
      ${notch ? `<rect x="${-68 + int(rand, -10, 10)}" y="${-phoneH / 2 + screenInset + 14}" width="${136 + int(rand, -10, 10)}" height="${26 + int(rand, -4, 4)}" rx="13" fill="rgba(0,0,0,0.45)" />` : ""}
    </g>
  `;

  const camera = `
    <g>
      ${camBump ? `<rect x="${camX}" y="${camY}" width="${lensCount === 2 ? 160 : 190}" height="${lensCount === 2 ? 160 : 190}" rx="40" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />` : ""}
      ${Array.from({ length: lensCount }).map((_, i) => {
        const off = i * (lensCount === 2 ? 72 : 58);
        const lx = camX + 52 + off;
        const ly = camY + 52 + (i === 2 ? 58 : 0);
        return `
          <g>
            <circle cx="${lx}" cy="${ly}" r="${lensR}" fill="rgba(0,0,0,0.65)" />
            <circle cx="${lx}" cy="${ly}" r="${lensR - 6}" fill="rgba(30,30,32,0.9)" />
            <circle cx="${lx - 10}" cy="${ly - 10}" r="${Math.max(8, lensR - 18)}" fill="rgba(255,255,255,0.10)" />
            <circle cx="${lx + 8}" cy="${ly + 8}" r="${Math.max(6, lensR - 22)}" fill="${cameraMetal}" opacity="0.6" />
          </g>
        `;
      }).join("")}
      <circle cx="${camX + (lensCount === 2 ? 128 : 152)}" cy="${camY + 142}" r="10" fill="rgba(255,255,255,0.5)" />
    </g>
  `;

  return {
    w: phoneW,
    h: phoneH,
    defs: `
      <linearGradient id="deviceBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${hsl(bodyHue, bodySat, bodyL2)}" />
        <stop offset="55%" stop-color="${hsl(bodyHue, bodySat, bodyL1)}" />
        <stop offset="100%" stop-color="${hsl((bodyHue + 10) % 360, bodySat + 2, clamp(bodyL1 - 4, 10, 30))}" />
      </linearGradient>
      <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${displayGlow1}" />
        <stop offset="55%" stop-color="${displayGlow2}" />
        <stop offset="100%" stop-color="rgba(0,0,0,0.8)" />
      </linearGradient>
      <linearGradient id="screenShine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${reflection}" />
        <stop offset="40%" stop-color="rgba(255,255,255,0)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
      </linearGradient>
    `,
    body: `
      <g>
        <rect x="${-phoneW / 2}" y="${-phoneH / 2}" width="${phoneW}" height="${phoneH}" rx="${r}" fill="${frame}" />
        <rect x="${-phoneW / 2}" y="${-phoneH / 2}" width="${phoneW}" height="${phoneH}" rx="${r}" fill="rgba(255,255,255,0.05)" />
        <rect x="${-phoneW / 2}" y="${-phoneH / 2}" width="${phoneW}" height="${phoneH}" rx="${r}" fill="url(#edgeLight)" opacity="0.7" />
        ${screen}
        ${camera}
      </g>
    `,
  };
}

function renderLaptop(rand) {
  const chassisHue = pick(rand, [210, 220, 0, 25, 140, 260]);
  const chassisSat = int(rand, 4, 12);
  const chassisL1 = int(rand, 18, 28);
  const chassisL2 = clamp(chassisL1 + int(rand, 10, 16), 24, 42);

  const screenHue = (chassisHue + int(rand, 90, 160)) % 360;
  const screen1 = hsl(screenHue, 85, 58, 0.95);
  const screen2 = hsl((screenHue + 45) % 360, 85, 52, 0.95);

  const w = 860 + int(rand, -60, 70);
  const h = 560 + int(rand, -30, 40);

  // Perspective-ish: use skewed quads via path.
  const baseW = w;
  const baseH = 210 + int(rand, -20, 30);
  const baseY = 250;
  const lift = 28 + int(rand, -8, 14);

  const screenW = w;
  const screenH = h;
  const screenY = -120;

  const keyRows = 5;
  const keyCols = 13;

  const body = `
    <g>
      <!-- Screen -->
      <g>
        <path d="M ${-screenW / 2} ${screenY - screenH / 2} L ${screenW / 2} ${screenY - screenH / 2} L ${screenW / 2 - 30} ${screenY + screenH / 2} L ${-screenW / 2 + 30} ${screenY + screenH / 2} Z" fill="url(#screen)" />
        <path d="M ${-screenW / 2} ${screenY - screenH / 2} L ${screenW / 2} ${screenY - screenH / 2} L ${screenW / 2 - 30} ${screenY + screenH / 2} L ${-screenW / 2 + 30} ${screenY + screenH / 2} Z" fill="url(#screenShine)" opacity="0.55" />
        <path d="M ${-screenW / 2} ${screenY - screenH / 2} L ${screenW / 2} ${screenY - screenH / 2} L ${screenW / 2 - 30} ${screenY + screenH / 2} L ${-screenW / 2 + 30} ${screenY + screenH / 2} Z" fill="none" stroke="rgba(255,255,255,0.10)" />
      </g>

      <!-- Base -->
      <g>
        <path d="M ${-baseW / 2} ${baseY} L ${baseW / 2} ${baseY} L ${baseW / 2 - 70} ${baseY + baseH} L ${-baseW / 2 + 70} ${baseY + baseH} Z" fill="url(#chassis)" />
        <path d="M ${-baseW / 2} ${baseY} L ${baseW / 2} ${baseY} L ${baseW / 2 - 70} ${baseY + baseH} L ${-baseW / 2 + 70} ${baseY + baseH} Z" fill="url(#edgeLight)" opacity="0.65" />

        <!-- Keyboard hints -->
        <g opacity="0.55">
          ${Array.from({ length: keyRows }).map((_, r) => {
            const rowY = baseY + 36 + r * 26;
            const inset = 90 + r * 8;
            const keyW = (baseW - inset * 2) / keyCols;
            return Array.from({ length: keyCols }).map((__, c) => {
              const x = -baseW / 2 + inset + c * keyW + 2;
              return `<rect x="${x}" y="${rowY}" width="${Math.max(10, keyW - 6)}" height="18" rx="4" fill="rgba(0,0,0,0.28)" />`;
            }).join("");
          }).join("")}
        </g>

        <!-- Trackpad -->
        <rect x="${-120 + int(rand, -20, 20)}" y="${baseY + baseH - 86}" width="${240 + int(rand, -20, 20)}" height="56" rx="14" fill="rgba(0,0,0,0.18)" />
      </g>

      <!-- Hinge -->
      <rect x="${-w / 2 + 70}" y="${baseY - lift}" width="${w - 140}" height="${28 + int(rand, -4, 6)}" rx="12" fill="rgba(0,0,0,0.28)" />
    </g>
  `;

  const defs = `
    <linearGradient id="chassis" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${hsl(chassisHue, chassisSat, chassisL2)}" />
      <stop offset="60%" stop-color="${hsl(chassisHue, chassisSat, chassisL1)}" />
      <stop offset="100%" stop-color="${hsl((chassisHue + 10) % 360, chassisSat + 2, clamp(chassisL1 - 4, 10, 30))}" />
    </linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${screen1}" />
      <stop offset="55%" stop-color="${screen2}" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.78)" />
    </linearGradient>
    <linearGradient id="screenShine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.18)" />
      <stop offset="45%" stop-color="rgba(255,255,255,0)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    </linearGradient>
  `;

  return { w, h: 720, defs, body };
}

function renderEarbuds(rand) {
  const colorHue = pick(rand, [210, 220, 0, 25, 140, 260]);
  const sat = int(rand, 4, 14);
  const l1 = int(rand, 18, 30);
  const l2 = clamp(l1 + int(rand, 12, 20), 26, 48);

  const caseW = 620 + int(rand, -40, 60);
  const caseH = 400 + int(rand, -30, 40);
  const r = 130 + int(rand, -15, 20);

  const budsScale = 0.9 + rand() * 0.22;

  const defs = `
    <linearGradient id="case" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${hsl(colorHue, sat, l2)}" />
      <stop offset="65%" stop-color="${hsl(colorHue, sat, l1)}" />
      <stop offset="100%" stop-color="${hsl((colorHue + 10) % 360, sat + 2, clamp(l1 - 4, 10, 28))}" />
    </linearGradient>
    <linearGradient id="plasticShine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.22)" />
      <stop offset="35%" stop-color="rgba(255,255,255,0)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    </linearGradient>
  `;

  const bud = (x, y, flip) => {
    const s = flip ? -1 : 1;
    return `
      <g transform="translate(${x} ${y}) scale(${budsScale * s} ${budsScale})">
        <path d="M -40 -30 C -80 -10 -90 40 -60 86 C -35 138 20 142 58 120 C 92 100 110 60 98 20 C 86 -18 30 -52 -10 -48 C -22 -47 -32 -42 -40 -30 Z" fill="url(#case)" />
        <path d="M 50 84 C 78 96 102 114 102 142 C 102 170 82 188 52 188 C 18 188 -10 164 -10 138 C -10 108 14 92 50 84 Z" fill="url(#case)" />
        <circle cx="10" cy="36" r="14" fill="rgba(0,0,0,0.24)" />
        <circle cx="10" cy="36" r="8" fill="rgba(0,0,0,0.32)" />
        <path d="M -32 -10 C -12 -30 12 -34 40 -26" stroke="rgba(255,255,255,0.22)" stroke-width="10" stroke-linecap="round" opacity="0.7" />
      </g>
    `;
  };

  const body = `
    <g>
      <!-- Case -->
      <g>
        <rect x="${-caseW / 2}" y="${-caseH / 2 + 80}" width="${caseW}" height="${caseH}" rx="${r}" fill="url(#case)" />
        <rect x="${-caseW / 2}" y="${-caseH / 2 + 80}" width="${caseW}" height="${caseH}" rx="${r}" fill="url(#plasticShine)" opacity="0.9" />
        <path d="M ${-caseW / 2 + 40} ${-caseH / 2 + 250} C ${-caseW / 2 + 120} ${-caseH / 2 + 190} ${caseW / 2 - 120} ${-caseH / 2 + 190} ${caseW / 2 - 40} ${-caseH / 2 + 250}" stroke="rgba(255,255,255,0.14)" stroke-width="6" stroke-linecap="round" />
      </g>

      ${bud(-220 + int(rand, -40, 40), -260 + int(rand, -30, 30), false)}
      ${bud(220 + int(rand, -40, 40), -260 + int(rand, -30, 30), true)}
    </g>
  `;

  return { w: 900, h: 900, defs, body };
}

function renderWatch(rand) {
  const strapHue = pick(rand, [210, 220, 0, 25, 140, 260]);
  const sat = int(rand, 6, 18);
  const l1 = int(rand, 16, 26);
  const l2 = clamp(l1 + int(rand, 12, 20), 24, 48);

  const faceShape = rand() < 0.55 ? "round" : "square";
  const faceSize = 430 + int(rand, -40, 40);
  const strapW = 240 + int(rand, -20, 30);
  const strapR = 90 + int(rand, -12, 14);

  const dialHue = (strapHue + int(rand, 80, 200)) % 360;
  const dial1 = hsl(dialHue, 82, 55, 0.95);
  const dial2 = hsl((dialHue + 35) % 360, 82, 50, 0.95);

  const defs = `
    <linearGradient id="strap" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${hsl(strapHue, sat, l2)}" />
      <stop offset="60%" stop-color="${hsl(strapHue, sat, l1)}" />
      <stop offset="100%" stop-color="${hsl((strapHue + 10) % 360, sat + 2, clamp(l1 - 4, 10, 24))}" />
    </linearGradient>
    <linearGradient id="dial" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${dial1}" />
      <stop offset="55%" stop-color="${dial2}" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.78)" />
    </linearGradient>
  `;

  const face =
    faceShape === "round"
      ? `<circle cx="0" cy="0" r="${faceSize / 2}" fill="url(#dial)" />`
      : `<rect x="${-faceSize / 2}" y="${-faceSize / 2}" width="${faceSize}" height="${faceSize}" rx="${110 + int(rand, -15, 20)}" fill="url(#dial)" />`;

  const glass =
    faceShape === "round"
      ? `<circle cx="0" cy="0" r="${faceSize / 2}" fill="url(#glass)" opacity="0.65" />`
      : `<rect x="${-faceSize / 2}" y="${-faceSize / 2}" width="${faceSize}" height="${faceSize}" rx="${110 + int(rand, -15, 20)}" fill="url(#glass)" opacity="0.65" />`;

  const body = `
    <g>
      <!-- Strap -->
      <rect x="${-strapW / 2}" y="${-520}" width="${strapW}" height="${1040}" rx="${strapR}" fill="url(#strap)" />
      <rect x="${-strapW / 2}" y="${-520}" width="${strapW}" height="${1040}" rx="${strapR}" fill="rgba(255,255,255,0.06)" />

      <!-- Face -->
      <g filter="url(#faceShadow)">
        ${face}
        ${glass}
      </g>

      <!-- Face details -->
      <g opacity="0.8">
        ${Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = Math.cos(a) * (faceSize / 2 - 26);
          const y1 = Math.sin(a) * (faceSize / 2 - 26);
          const x2 = Math.cos(a) * (faceSize / 2 - 10);
          const y2 = Math.sin(a) * (faceSize / 2 - 10);
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.22)" stroke-width="4" stroke-linecap="round" />`;
        }).join("")}
        <line x1="0" y1="0" x2="${Math.cos(rand() * Math.PI * 2) * (faceSize / 2 - 80)}" y2="${Math.sin(rand() * Math.PI * 2) * (faceSize / 2 - 80)}" stroke="rgba(255,255,255,0.28)" stroke-width="8" stroke-linecap="round" />
        <line x1="0" y1="0" x2="${Math.cos(rand() * Math.PI * 2) * (faceSize / 2 - 120)}" y2="${Math.sin(rand() * Math.PI * 2) * (faceSize / 2 - 120)}" stroke="rgba(255,255,255,0.22)" stroke-width="6" stroke-linecap="round" />
        <circle cx="0" cy="0" r="8" fill="rgba(255,255,255,0.26)" />
      </g>

      <!-- Crown -->
      <rect x="${faceSize / 2 - 10}" y="${-32 + int(rand, -6, 6)}" width="${36 + int(rand, -4, 8)}" height="${64 + int(rand, -8, 10)}" rx="16" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.10)" />
    </g>
  `;

  return {
    w: 820,
    h: 980,
    defs:
      defs +
      `
      <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.22)" />
        <stop offset="38%" stop-color="rgba(255,255,255,0)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
      </linearGradient>
    `,
    body,
  };
}

function renderTV(rand) {
  const w = 980 + int(rand, -60, 60);
  const h = 620 + int(rand, -40, 40);
  const bezel = 26 + int(rand, -6, 8);

  const screenHue = int(rand, 0, 360);
  const s1 = hsl(screenHue, 88, 56, 0.95);
  const s2 = hsl((screenHue + 40) % 360, 88, 52, 0.95);

  const standType = rand() < 0.5 ? "feet" : "center";

  const defs = `
    <linearGradient id="bezel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(40,40,44,0.95)" />
      <stop offset="60%" stop-color="rgba(18,18,20,0.95)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.92)" />
    </linearGradient>
    <linearGradient id="tvScreen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${s1}" />
      <stop offset="58%" stop-color="${s2}" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.82)" />
    </linearGradient>
  `;

  const stand =
    standType === "feet"
      ? `
        <g>
          <rect x="${-w / 2 + 120}" y="${h / 2 + 20}" width="160" height="26" rx="10" fill="rgba(0,0,0,0.45)" />
          <rect x="${w / 2 - 280}" y="${h / 2 + 20}" width="160" height="26" rx="10" fill="rgba(0,0,0,0.45)" />
        </g>
      `
      : `
        <g>
          <path d="M -90 ${h / 2 + 20} C -20 ${h / 2 - 10} 20 ${h / 2 - 10} 90 ${h / 2 + 20} L 160 ${h / 2 + 80} L -160 ${h / 2 + 80} Z" fill="rgba(0,0,0,0.45)" />
        </g>
      `;

  const body = `
    <g>
      <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${44 + int(rand, -6, 8)}" fill="url(#bezel)" />
      <rect x="${-w / 2 + bezel}" y="${-h / 2 + bezel}" width="${w - bezel * 2}" height="${h - bezel * 2}" rx="${38 + int(rand, -6, 8)}" fill="url(#tvScreen)" />
      <rect x="${-w / 2 + bezel}" y="${-h / 2 + bezel}" width="${w - bezel * 2}" height="${h - bezel * 2}" rx="${38 + int(rand, -6, 8)}" fill="url(#screenShine)" opacity="0.55" />
      ${stand}
    </g>
  `;

  return {
    w,
    h: h + 160,
    defs:
      defs +
      `
      <linearGradient id="screenShine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.18)" />
        <stop offset="45%" stop-color="rgba(255,255,255,0)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
      </linearGradient>
    `,
    body,
  };
}

function renderGamepad(rand) {
  const hue = pick(rand, [210, 220, 0, 25, 140, 260]);
  const sat = int(rand, 4, 14);
  const l1 = int(rand, 16, 26);
  const l2 = clamp(l1 + int(rand, 12, 20), 24, 46);

  const defs = `
    <linearGradient id="pad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${hsl(hue, sat, l2)}" />
      <stop offset="65%" stop-color="${hsl(hue, sat, l1)}" />
      <stop offset="100%" stop-color="${hsl((hue + 10) % 360, sat + 2, clamp(l1 - 4, 10, 24))}" />
    </linearGradient>
  `;

  const w = 980;
  const h = 620;
  const rx = 220;

  const body = `
    <g>
      <path d="M -420 -30 C -540 20 -560 160 -500 250 C -460 312 -380 340 -300 320 C -250 308 -208 280 -178 244 C -150 214 -130 168 -120 126 C -90 10 -40 -50 0 -50 C 40 -50 90 10 120 126 C 130 168 150 214 178 244 C 208 280 250 308 300 320 C 380 340 460 312 500 250 C 560 160 540 20 420 -30 C 320 -72 240 -40 170 10 C 120 44 60 70 0 70 C -60 70 -120 44 -170 10 C -240 -40 -320 -72 -420 -30 Z" fill="url(#pad)" />

      <!-- Buttons -->
      <circle cx="300" cy="40" r="26" fill="rgba(0,0,0,0.22)" />
      <circle cx="350" cy="0" r="26" fill="rgba(0,0,0,0.22)" />
      <circle cx="350" cy="80" r="26" fill="rgba(0,0,0,0.22)" />
      <circle cx="400" cy="40" r="26" fill="rgba(0,0,0,0.22)" />

      <!-- D-pad -->
      <rect x="${-380}" y="${10}" width="120" height="44" rx="14" fill="rgba(0,0,0,0.24)" />
      <rect x="${-342}" y="${-30}" width="44" height="120" rx="14" fill="rgba(0,0,0,0.24)" />

      <!-- Sticks -->
      <circle cx="-160" cy="120" r="52" fill="rgba(0,0,0,0.22)" />
      <circle cx="-160" cy="120" r="32" fill="rgba(0,0,0,0.30)" />
      <circle cx="120" cy="140" r="52" fill="rgba(0,0,0,0.22)" />
      <circle cx="120" cy="140" r="32" fill="rgba(0,0,0,0.30)" />

      <!-- Triggers hint -->
      <path d="M -340 -160 C -230 -210 -120 -230 0 -230 C 120 -230 230 -210 340 -160" stroke="rgba(255,255,255,0.12)" stroke-width="24" stroke-linecap="round" />
    </g>
  `;

  return { w, h, defs, body };
}

function renderAccessory(rand) {
  const kind = pick(rand, ["charger", "power-bank", "cable", "stand", "case", "hub"]);
  const hue = pick(rand, [210, 220, 0, 25, 140, 260]);
  const sat = int(rand, 4, 14);
  const l1 = int(rand, 18, 30);
  const l2 = clamp(l1 + int(rand, 12, 20), 26, 48);

  const defs = `
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${hsl(hue, sat, l2)}" />
      <stop offset="65%" stop-color="${hsl(hue, sat, l1)}" />
      <stop offset="100%" stop-color="${hsl((hue + 10) % 360, sat + 2, clamp(l1 - 4, 10, 26))}" />
    </linearGradient>
  `;

  let body = "";
  if (kind === "charger") {
    body = `
      <g>
        <rect x="-220" y="-220" width="440" height="520" rx="90" fill="url(#acc)" />
        <rect x="-150" y="-140" width="300" height="220" rx="60" fill="rgba(255,255,255,0.08)" />
        <rect x="-80" y="300" width="60" height="110" rx="12" fill="rgba(0,0,0,0.28)" />
        <rect x="20" y="300" width="60" height="110" rx="12" fill="rgba(0,0,0,0.28)" />
      </g>
    `;
  } else if (kind === "power-bank") {
    body = `
      <g>
        <rect x="-260" y="-320" width="520" height="700" rx="120" fill="url(#acc)" />
        <circle cx="-160" cy="-240" r="10" fill="rgba(255,255,255,0.45)" />
        <circle cx="-132" cy="-240" r="10" fill="rgba(255,255,255,0.28)" />
        <circle cx="-104" cy="-240" r="10" fill="rgba(255,255,255,0.18)" />
        <rect x="-80" y="300" width="160" height="44" rx="18" fill="rgba(0,0,0,0.22)" />
      </g>
    `;
  } else if (kind === "cable") {
    body = `
      <g>
        <path d="M -420 80 C -240 -120 -20 -160 160 -60 C 340 40 420 240 240 320 C 80 390 -120 320 -60 180" fill="none" stroke="url(#acc)" stroke-width="48" stroke-linecap="round" />
        <rect x="-470" y="60" width="120" height="70" rx="18" fill="rgba(0,0,0,0.25)" />
        <rect x="340" y="300" width="120" height="70" rx="18" fill="rgba(0,0,0,0.25)" />
      </g>
    `;
  } else if (kind === "stand") {
    body = `
      <g>
        <path d="M -260 260 L 260 260 L 180 360 L -180 360 Z" fill="rgba(0,0,0,0.20)" />
        <path d="M -180 260 C -140 80 -40 -40 0 -120 C 40 -40 140 80 180 260 Z" fill="url(#acc)" />
        <rect x="-120" y="-160" width="240" height="70" rx="20" fill="rgba(0,0,0,0.22)" />
      </g>
    `;
  } else if (kind === "hub") {
    body = `
      <g>
        <rect x="-320" y="-140" width="640" height="360" rx="120" fill="url(#acc)" />
        ${Array.from({ length: 4 }).map((_, i) => {
          const x = -230 + i * 150 + int(rand, -6, 6);
          return `<rect x="${x}" y="20" width="110" height="64" rx="18" fill="rgba(0,0,0,0.22)" />`;
        }).join("")}
        <rect x="-60" y="140" width="120" height="30" rx="12" fill="rgba(255,255,255,0.18)" />
      </g>
    `;
  } else {
    // case
    body = `
      <g>
        <path d="M -320 -240 C -280 -340 -160 -420 0 -420 C 160 -420 280 -340 320 -240 L 360 180 C 380 330 280 440 120 460 L -120 460 C -280 440 -380 330 -360 180 Z" fill="url(#acc)" />
        <path d="M -240 -150 C -160 -240 -40 -280 0 -280 C 40 -280 160 -240 240 -150" stroke="rgba(255,255,255,0.14)" stroke-width="10" stroke-linecap="round" />
        <rect x="-120" y="-220" width="240" height="140" rx="70" fill="rgba(0,0,0,0.16)" />
      </g>
    `;
  }

  return { w: 980, h: 900, defs, body };
}

function chooseRenderer(product, rand) {
  if (product.category === "phones") return renderPhone(rand);
  if (product.category === "laptops") return renderLaptop(rand);
  if (product.category === "tvs") return renderTV(rand);
  if (product.category === "wearables") return renderWatch(rand);
  if (product.category === "audio") return renderEarbuds(rand);

  // accessories: split out gamepads when the slug suggests it.
  const s = String(product.slug || "");
  if (/controller|gamepad|dualshock|xbox|playstation|switch/.test(s)) return renderGamepad(rand);
  return renderAccessory(rand);
}

function buildSVG(product) {
  const seed = hashToSeed(product.slug);
  const rand = mulberry32(seed);
  const { vignette, noiseOpacity } = baseStudioBackground(rand);

  const angle = lerp(-12, 12, rand());
  const scale = lerp(0.9, 1.02, rand());

  const render = chooseRenderer(product, rand);

  // Center group within viewBox.
  const gX = SIZE / 2;
  const gY = SIZE / 2 + lerp(-20, 30, rand());

  const shadow = softShadow({ cx: gX, cy: gY + 370, rx: 360 + int(rand, -40, 60), ry: 80 + int(rand, -10, 18), opacity: 0.20 + rand() * 0.08 });

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
    <defs>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="18" />
      </filter>
      <filter id="faceShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="rgba(0,0,0,0.25)" />
      </filter>
      <linearGradient id="edgeLight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(255,255,255,0.18)" />
        <stop offset="45%" stop-color="rgba(255,255,255,0)" />
        <stop offset="100%" stop-color="rgba(0,0,0,0.16)" />
      </linearGradient>

      ${render.defs}

      <filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" />
      </filter>
    </defs>

    <rect width="100%" height="100%" fill="${vignette}" />
    <rect width="100%" height="100%" filter="url(#grain)" opacity="${noiseOpacity}" />

    ${shadow}

    <g transform="translate(${gX} ${gY}) rotate(${angle}) scale(${scale})">
      ${render.body}
    </g>
  </svg>
  `.trim();

  return svg;
}

async function writeWebp(svg, outPath) {
  const buffer = Buffer.from(svg);
  await sharp(buffer, { density: 220 })
    .resize(SIZE, SIZE, { fit: "cover" })
    .webp({ quality: 92, alphaQuality: 90 })
    .toFile(outPath);
}

async function main() {
  ensureDir(OUT_DIR);

  const items = await loadProducts();
  const picked = LIMIT > 0 ? items.slice(0, LIMIT) : items;

  let wrote = 0;
  let skipped = 0;
  const failures = [];

  for (const p of picked) {
    const outPath = path.join(OUT_DIR, `${p.slug}.webp`);
    if (!FORCE && fileExists(outPath)) {
      skipped++;
      continue;
    }

    try {
      const svg = buildSVG(p);
      await writeWebp(svg, outPath);
      wrote++;
      console.log(`[${p.slug}] wrote ${path.relative(process.cwd(), outPath)}`);
    } catch (err) {
      failures.push({ slug: p.slug, error: String(err?.message || err) });
      console.error(`[${p.slug}] FAILED`, err);
    }
  }

  // Fallback (generic accessory render)
  try {
    const fallbackPath = path.join(OUT_DIR, "fallback.webp");
    if (FORCE || !fileExists(fallbackPath)) {
      const svg = buildSVG({ slug: "fallback", category: "accessories" });
      await writeWebp(svg, fallbackPath);
      console.log(`[fallback] wrote ${path.relative(process.cwd(), fallbackPath)}`);
    }
  } catch (err) {
    failures.push({ slug: "fallback", error: String(err?.message || err) });
    console.error(`[fallback] FAILED`, err);
  }

  const report = { total: picked.length, wrote, skipped, failures };
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), "utf8");

  if (failures.length) {
    console.error(`\nDone with ${failures.length} failure(s). See ${path.relative(process.cwd(), REPORT_PATH)}`);
    process.exit(2);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
