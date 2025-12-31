import fs from "node:fs";
import path from "node:path";

const PRODUCTS_TS = path.join(process.cwd(), "src", "data", "products.ts");
const ROOT = path.join(process.cwd(), "public", "products", "real");

function extractProductsArrayJson(tsText) {
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

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

const fallback = path.join(ROOT, "fallback.webp");
if (!exists(fallback)) {
  console.log(`fallback: missing ${path.relative(process.cwd(), fallback)}`);
  process.exit(2);
}

const ts = fs.readFileSync(PRODUCTS_TS, "utf8");
const arrJson = extractProductsArrayJson(ts);
const parsed = JSON.parse(arrJson);
if (!Array.isArray(parsed)) throw new Error("Parsed products is not an array");

const slugs = parsed.map((p) => p.slug).filter(Boolean);
let missingTotal = 0;

for (const slug of slugs) {
  const expected = path.join(ROOT, `${slug}.webp`);
  if (!exists(expected)) {
    missingTotal += 1;
    console.log(`${slug}: missing ${path.basename(expected)}`);
  }
}

if (missingTotal > 0) {
  console.log(`\nMissing ${missingTotal} images total.`);
  process.exit(2);
} else {
  console.log("\nAll product images present.");
}
