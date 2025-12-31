import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "products", "premium");

function listDirs(p) {
  return fs
    .readdirSync(p, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

const slugs = listDirs(ROOT);
let missingTotal = 0;

for (const slug of slugs) {
  const base = path.join(ROOT, slug);
  const expected = ["01.webp", "02.webp", "03.webp"].map((f) => path.join(base, f));
  const missing = expected.filter((p) => !exists(p));
  if (missing.length > 0) {
    missingTotal += missing.length;
    console.log(`${slug}: missing ${missing.map((p) => path.basename(p)).join(", ")}`);
  }
}

if (missingTotal > 0) {
  console.log(`\nMissing ${missingTotal} images total.`);
  process.exit(2);
} else {
  console.log("\nAll product images present.");
}
