import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PROMPT_PACK = path.join(process.cwd(), "src", "data", "image-prompts.md");

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
// A known-good SDXL version hash from Replicate docs.
const REPLICATE_VERSION =
  process.env.REPLICATE_VERSION ??
  "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";

const FORCE = process.argv.includes("--force") || process.env.FORCE_IMAGES === "1";
const LIMIT = Number(process.env.LIMIT ?? "0"); // 0 = no limit

function failAuthOnce() {
  // Single URL for one-time approval/setup.
  console.error("\nMissing REPLICATE_API_TOKEN.");
  console.error("One-time setup: create a Replicate API token here:");
  console.error("https://replicate.com/account/api-tokens\n");
  console.error(
    "Then rerun: REPLICATE_API_TOKEN=... node scripts/generate-product-images.mjs"
  );
  process.exit(1);
}

function parsePromptPack(markdown) {
  const lines = markdown.split(/\r?\n/);

  /** @type {Array<{name:string, slug:string, folder:string, images:Array<{filename:string, prompt:string}>}>} */
  const products = [];

  let current = null;
  let currentImage = null;
  let inPrompt = false;
  let promptBuf = [];

  function flushPrompt() {
    if (!current || !currentImage) return;
    const prompt = promptBuf.join("\n").trim();
    if (prompt) currentImage.prompt = prompt;
    promptBuf = [];
    inPrompt = false;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const h2 = line.match(/^##\s+(.*)\s*$/);
    if (h2) {
      flushPrompt();
      if (current && current.slug && current.folder) products.push(current);
      current = { name: h2[1].trim(), slug: "", folder: "", images: [] };
      currentImage = null;
      continue;
    }

    if (!current) continue;

    const slug = line.match(/^\-\s+slug:\s+`([^`]+)`\s*$/);
    if (slug) {
      current.slug = slug[1].trim();
      continue;
    }

    const folder = line.match(/^\-\s+target folder:\s+`([^`]+)`\s*$/);
    if (folder) {
      current.folder = folder[1].trim();
      continue;
    }

    const imgH3 = line.match(/^###\s+Image\s+\d+:\s+(\d\d\.webp)\s*$/);
    if (imgH3) {
      flushPrompt();
      currentImage = { filename: imgH3[1], prompt: "" };
      current.images.push(currentImage);
      continue;
    }

    if (line.trim() === "**Prompt:**") {
      // prompts start after the next blank line (which exists in our generator)
      inPrompt = true;
      promptBuf = [];
      continue;
    }

    if (inPrompt) {
      // Stop prompt when we hit an empty line followed by a heading-ish marker.
      // We'll just keep collecting; higher-level parsing flushes on next heading.
      promptBuf.push(line);
    }
  }

  flushPrompt();
  if (current && current.slug && current.folder) products.push(current);

  // Normalize: we want exactly 3 images per product.
  for (const p of products) {
    p.images = p.images.filter((img) => /^(01|02|03)\.webp$/.test(img.filename));
  }

  return products.filter((p) => p.images.length === 3);
}

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function replicatePrediction(prompt) {
  const negative_prompt =
    "logo, brand, trademark, text, watermark, label, letters, numbers, UI, app icons, screenshots, manufacturer styling";

  const res = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: REPLICATE_VERSION,
      input: {
        prompt,
        negative_prompt,
        width: 1024,
        height: 1024,
        num_outputs: 1,
        guidance_scale: 7.5,
        num_inference_steps: 30,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Replicate create failed (${res.status}): ${text}`);
  }

  /** @type {{id:string, status:string, urls?:{get:string}}} */
  const created = await res.json();
  if (!created?.id) throw new Error("Replicate response missing id");

  while (true) {
    const getRes = await fetch(`https://api.replicate.com/v1/predictions/${created.id}`, {
      headers: { Authorization: `Token ${REPLICATE_API_TOKEN}` },
    });
    if (!getRes.ok) {
      const text = await getRes.text().catch(() => "");
      throw new Error(`Replicate poll failed (${getRes.status}): ${text}`);
    }

    /** @type {{status:string, output:any, error?:any}} */
    const pred = await getRes.json();
    if (pred.status === "succeeded") return pred.output;
    if (pred.status === "failed" || pred.status === "canceled") {
      throw new Error(`Replicate prediction ${pred.status}: ${JSON.stringify(pred.error ?? pred.output)}`);
    }
    await sleep(1000);
  }
}

async function downloadToBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}) for ${url}`);
  const arr = await res.arrayBuffer();
  return Buffer.from(arr);
}

async function writeWebpFromRemote({ url, outPath }) {
  const buf = await downloadToBuffer(url);
  await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
  await sharp(buf)
    .resize(1024, 1024, { fit: "cover" })
    .webp({ quality: 86 })
    .toFile(outPath);
}

async function main() {
  if (!REPLICATE_API_TOKEN) failAuthOnce();

  const md = await fs.promises.readFile(PROMPT_PACK, "utf8");
  const products = parsePromptPack(md);

  if (products.length === 0) {
    console.error("No products parsed from src/data/image-prompts.md");
    process.exit(1);
  }

  console.log(`Loaded ${products.length} products from prompt pack.`);
  console.log(`Using Replicate version: ${REPLICATE_VERSION}`);

  let processed = 0;
  for (const product of products) {
    if (LIMIT > 0 && processed >= LIMIT) break;

    for (const img of product.images) {
      const outPath = path.join(process.cwd(), product.folder, img.filename);
      const exists = fs.existsSync(outPath);
      if (exists && !FORCE) continue;

      console.log(`\n[${product.slug}] generating ${img.filename}...`);
      const output = await replicatePrediction(img.prompt);

      // Replicate outputs can be a string URL or an array of URLs.
      const url = Array.isArray(output) ? output[0] : output;
      if (typeof url !== "string") {
        throw new Error(`Unexpected Replicate output shape: ${JSON.stringify(output).slice(0, 400)}`);
      }

      await writeWebpFromRemote({ url, outPath });
      console.log(`[${product.slug}] wrote ${path.relative(process.cwd(), outPath)}`);
    }

    processed++;
  }

  console.log("\nDone.");
}

await main();
