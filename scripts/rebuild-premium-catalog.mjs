import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function money(n) {
  return Math.round(n);
}

function imagesFor(slug) {
  return {
    image: `/products/premium/${slug}/01.webp`,
    images: [
      `/products/premium/${slug}/01.webp`,
      `/products/premium/${slug}/02.webp`,
      `/products/premium/${slug}/03.webp`,
    ],
  };
}

function stockFor(idx) {
  if (idx % 17 === 0) return "low";
  return "in";
}

function ratingFor(idx) {
  const base = 4.3 + ((idx % 7) * 0.08);
  return Math.min(4.9, Math.round(base * 10) / 10);
}

function reviewsFor(idx) {
  return 120 + (idx % 31) * 37;
}

const warrantyDefault = "1-year limited warranty. Extended coverage available.";
const shippingDefault = "Ships in 1–2 business days. Free standard shipping over $75.";
const returnsDefault = "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.";

function buildPhoneSpecs({ display, chipset, storage, cameras, battery, charge, connectivity }) {
  return {
    Display: display,
    Chipset: chipset,
    "Storage options": storage,
    Cameras: cameras,
    Battery: battery,
    Charging: charge,
    Connectivity: connectivity,
  };
}

function buildHeadphoneSpecs({ type, anc, battery, codecs, charge, weight }) {
  return {
    Type: type,
    "Noise control": anc,
    Battery: battery,
    Codecs: codecs,
    Charging: charge,
    Weight: weight,
  };
}

function buildLaptopSpecs({ display, cpu, gpu, memory, storage, weight, ports, wireless }) {
  return {
    Display: display,
    CPU: cpu,
    GPU: gpu,
    Memory: memory,
    Storage: storage,
    Weight: weight,
    Ports: ports,
    Wireless: wireless,
  };
}

function buildTvSpecs({ size, panel, resolution, refresh, hdr, smart, ports }) {
  return {
    Size: size,
    Panel: panel,
    Resolution: resolution,
    "Refresh rate": refresh,
    HDR: hdr,
    "Smart features": smart,
    Ports: ports,
  };
}

function productBase({ slug, name, brand, category, price, shortDescription, fullDescription, highlights, specs, whatsInTheBox, tags, compareAtPrice, stock }) {
  return {
    slug,
    name,
    brand,
    category,
    price,
    compareAtPrice,
    stock,
    shortDescription,
    description: shortDescription,
    fullDescription,
    highlights,
    specs,
    whatsInTheBox,
    warranty: warrantyDefault,
    shipping: shippingDefault,
    returns: returnsDefault,
    rating: 4.6,
    reviewCount: 420,
    tags,
    ...imagesFor(slug),
  };
}

function promptTriplet({ kind }) {
  if (kind === "phone") {
    return [
      {
        file: "01.webp",
        prompt:
          "Photorealistic unbranded modern smartphone product photo, edge-to-edge display with no recognizable UI (abstract blurred wallpaper only), thin bezels, matte metal frame, studio lighting with soft shadow, subtle premium gradient background (deep navy to electric blue), no logos, no text, no brand marks, 85mm lens look, ultra high detail, clean reflections, centered composition.",
      },
      {
        file: "02.webp",
        prompt:
          "Photorealistic unbranded modern smartphone, rear 3/4 view showing a generic triple-camera module (no brand styling), frosted glass back, studio softbox lighting, subtle purple-blue gradient background, no logos, no text, no UI, premium high-end product photography, realistic materials and reflections.",
      },
      {
        file: "03.webp",
        prompt:
          "Photorealistic unbranded smartphone lying at a slight angle on a clean surface, minimal props (none branded), soft shadow, high-end studio lighting, deep navy background with subtle electric accent glow, no logos, no text, no recognizable UI, premium editorial product shot.",
      },
    ];
  }

  if (kind === "headphones") {
    return [
      {
        file: "01.webp",
        prompt:
          "Photorealistic unbranded over-ear headphones product photo, premium materials (matte metal + soft leather pads), studio lighting with soft shadow, subtle deep navy to electric blue gradient background, no logos, no text, no brand marks, high-end ecommerce photography.",
      },
      {
        file: "02.webp",
        prompt:
          "Photorealistic unbranded headphones on a minimal stand, clean reflections, softbox studio lighting, subtle purple-blue gradient background, no logos, no text, premium look, 85mm lens aesthetic.",
      },
      {
        file: "03.webp",
        prompt:
          "Photorealistic unbranded headphones close-up detail shot (earcup texture + headband stitching), studio macro feel, soft shadow, deep navy background with subtle electric accent, no logos, no text.",
      },
    ];
  }

  if (kind === "laptop") {
    return [
      {
        file: "01.webp",
        prompt:
          "Photorealistic unbranded premium ultrabook laptop open at a 3/4 angle, blank/abstract screen (no OS UI), thin bezels, matte aluminum body, studio lighting with soft shadow, subtle deep navy to electric blue gradient background, no logos, no text, high-end product photography.",
      },
      {
        file: "02.webp",
        prompt:
          "Photorealistic unbranded laptop closed, top-down 3/4 view, smooth matte finish, clean reflections, studio softbox lighting, subtle purple-blue gradient background, no logos, no text.",
      },
      {
        file: "03.webp",
        prompt:
          "Photorealistic unbranded laptop keyboard + trackpad detail shot, shallow depth of field, premium materials, deep navy background with subtle electric rim light, no logos, no text, no UI.",
      },
    ];
  }

  // tv
  return [
    {
      file: "01.webp",
      prompt:
        "Photorealistic unbranded thin-bezel LED TV on a minimal stand, screen showing abstract color gradient (no OS UI, no icons), studio lighting with soft shadow, subtle deep navy to electric blue background, no logos, no text, premium ecommerce photography.",
    },
    {
      file: "02.webp",
      prompt:
        "Photorealistic unbranded TV front view, clean reflections on screen, abstract wallpaper only (no UI), studio softbox lighting, subtle purple-blue gradient background, no logos, no text.",
    },
    {
      file: "03.webp",
      prompt:
        "Photorealistic unbranded TV 3/4 angle, thin bezel highlight, minimal stand, soft shadow, deep navy background with subtle electric glow, no logos, no text, no UI.",
    },
  ];
}

function makeCatalog() {
  const products = [];

  // A) Realme phones (24+)
  const realmeModels = [
    "realme 12",
    "realme 12+",
    "realme 12 Pro",
    "realme 12 Pro+",
    "realme 11",
    "realme 11 Pro",
    "realme 11 Pro+",
    "realme 10",
    "realme 10 Pro",
    "realme 10 Pro+",
    "realme 9",
    "realme 9 Pro",
    "realme 9 Pro+",
    "realme GT 5",
    "realme GT 5 Pro",
    "realme GT 6",
    "realme GT Neo 5",
    "realme GT Neo 5 SE",
    "realme C55",
    "realme C67",
    "realme C53",
    "realme C51",
    "realme Narzo 60",
    "realme Narzo 60 Pro",
  ];

  realmeModels.forEach((model, idx) => {
    const slug = slugify(`${model}`);
    const price = model.includes("Pro+") || model.includes("Pro") || model.includes("GT") ? 649 + (idx % 5) * 40 : 249 + (idx % 7) * 35;

    products.push(
      productBase({
        slug,
        name: model,
        brand: "realme",
        category: "phones",
        price: money(price),
        compareAtPrice: money(price * 1.15),
        stock: stockFor(idx),
        shortDescription: "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
        fullDescription:
          "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
        highlights: [
          "Smooth high-refresh display",
          "Fast charging for quick top-ups",
          "Modern multi-camera system (unbranded)",
          "5G-ready connectivity (where supported)",
        ],
        specs: buildPhoneSpecs({
          display: "6.6\" AMOLED-class, 120Hz class",
          chipset: "Modern 5G-capable mobile chipset",
          storage: "128GB / 256GB",
          cameras: "Triple camera (wide + ultra-wide + macro/tele)",
          battery: "5000mAh class",
          charge: "Fast charge (67W–120W class, varies by model)",
          connectivity: "5G + Wi‑Fi 6 + Bluetooth 5.3",
        }),
        whatsInTheBox: ["Phone", "USB‑C cable", "Quick start guide"],
        tags: ["realme", "android", "5g", "phone", "fast-charge", slug],
      })
    );
  });

  // B) iPhones X through 17 Pro Max (17 is placeholder/speculative)
  const iphones = [
    "Apple iPhone X",
    "Apple iPhone XS",
    "Apple iPhone XS Max",
    "Apple iPhone XR",
    "Apple iPhone 11",
    "Apple iPhone 11 Pro",
    "Apple iPhone 11 Pro Max",
    "Apple iPhone 12 mini",
    "Apple iPhone 12",
    "Apple iPhone 12 Pro",
    "Apple iPhone 12 Pro Max",
    "Apple iPhone 13 mini",
    "Apple iPhone 13",
    "Apple iPhone 13 Pro",
    "Apple iPhone 13 Pro Max",
    "Apple iPhone 14",
    "Apple iPhone 14 Plus",
    "Apple iPhone 14 Pro",
    "Apple iPhone 14 Pro Max",
    "Apple iPhone 15",
    "Apple iPhone 15 Plus",
    "Apple iPhone 15 Pro",
    "Apple iPhone 15 Pro Max",
    "Apple iPhone 16",
    "Apple iPhone 16 Plus",
    "Apple iPhone 16 Pro",
    "Apple iPhone 16 Pro Max",
    "Apple iPhone 17 Pro Max (Placeholder)",
  ];

  iphones.forEach((name, idx) => {
    const slug = slugify(name);
    const isPlaceholder = name.includes("Placeholder");
    const base = 399 + idx * 25;
    const price = isPlaceholder ? 1399 : Math.min(1299, base + (idx % 4) * 50);

    const placeholderNote = isPlaceholder
      ? "\n\nNOTE: This model name/spec is placeholder/speculative and provided for catalog completeness only."
      : "";

    products.push(
      productBase({
        slug,
        name,
        brand: "Apple",
        category: "phones",
        price: money(price),
        compareAtPrice: money(price * 1.1),
        stock: stockFor(100 + idx),
        shortDescription:
          "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
        fullDescription:
          "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer." +
          placeholderNote,
        highlights: [
          "Premium camera system and computational photography",
          "Fast everyday performance",
          "High-quality OLED-class display",
          "Secure device features and long-term usability",
        ],
        specs: buildPhoneSpecs({
          display: "OLED-class display (size varies by model)",
          chipset: "Generation-appropriate Apple A-series chipset",
          storage: "64GB / 128GB / 256GB / 512GB (varies)",
          cameras: "Dual or triple camera system (varies)",
          battery: "All-day battery class (varies)",
          charge: "Fast charging + wireless charging (varies)",
          connectivity: "5G (newer models) + Wi‑Fi + Bluetooth",
        }),
        whatsInTheBox: ["Phone", "USB‑C/Lightning cable (varies)", "Quick start guide"],
        tags: ["iphone", "apple", "ios", "phone", slug],
      })
    );
  });

  // C) Headphones (20+)
  const headphones = [
    { brand: "Sony", model: "WH-1000XM5", type: "Over‑ear" },
    { brand: "Sony", model: "WH-1000XM4", type: "Over‑ear" },
    { brand: "Bose", model: "QuietComfort Ultra", type: "Over‑ear" },
    { brand: "Bose", model: "QuietComfort 45", type: "Over‑ear" },
    { brand: "Sennheiser", model: "Momentum 4", type: "Over‑ear" },
    { brand: "Sennheiser", model: "HD 450BT", type: "Over‑ear" },
    { brand: "JBL", model: "Tour One M2", type: "Over‑ear" },
    { brand: "JBL", model: "Live 660NC", type: "Over‑ear" },
    { brand: "Beats", model: "Studio Pro", type: "Over‑ear" },
    { brand: "Beats", model: "Solo 4", type: "On‑ear" },
    { brand: "Audio-Technica", model: "ATH-M50xBT2", type: "Over‑ear" },
    { brand: "Anker", model: "Soundcore Space One", type: "Over‑ear" },
    { brand: "Anker", model: "Soundcore Liberty 4", type: "True wireless" },
    { brand: "Jabra", model: "Elite 10", type: "True wireless" },
    { brand: "Nothing", model: "Ear (2)", type: "True wireless" },
    { brand: "Shure", model: "AONIC 50 Gen 2", type: "Over‑ear" },
    { brand: "Bowers & Wilkins", model: "PX7 S2e", type: "Over‑ear" },
    { brand: "Marshall", model: "Monitor II ANC", type: "Over‑ear" },
    { brand: "Skullcandy", model: "Crusher ANC 2", type: "Over‑ear" },
    { brand: "Samsung", model: "Galaxy Buds2 Pro", type: "True wireless" },
  ];

  headphones.forEach((h, idx) => {
    const name = `${h.brand} ${h.model}`;
    const slug = slugify(name);
    const price = 89 + (idx % 10) * 35 + (h.type === "Over‑ear" ? 120 : 60);

    products.push(
      productBase({
        slug,
        name,
        brand: h.brand,
        category: "audio",
        price: money(price),
        compareAtPrice: money(price * 1.18),
        stock: stockFor(200 + idx),
        shortDescription: "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
        fullDescription:
          "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
        highlights: [
          "High-quality wireless audio",
          "Comfort-focused fit for long sessions",
          "ANC/transparency features (varies by model)",
          "Clear call microphones",
        ],
        specs: buildHeadphoneSpecs({
          type: h.type,
          anc: "ANC + transparency (model dependent)",
          battery: "Up to 24–50 hours class (varies)",
          codecs: "SBC/AAC + optional higher-quality codecs (varies)",
          charge: "USB‑C fast charging",
          weight: "Lightweight comfort class",
        }),
        whatsInTheBox: ["Headphones/earbuds", "Charging cable", "Quick start guide"],
        tags: ["audio", "headphones", "earbuds", h.brand.toLowerCase(), slug],
      })
    );
  });

  // D) Laptops (20+)
  const laptops = [
    { brand: "Dell", model: "XPS 13", segment: "Ultrabook" },
    { brand: "Dell", model: "XPS 15", segment: "Creator" },
    { brand: "Apple", model: "MacBook Air 13", segment: "Ultrabook" },
    { brand: "Apple", model: "MacBook Pro 14", segment: "Creator" },
    { brand: "Lenovo", model: "ThinkPad X1 Carbon", segment: "Ultrabook" },
    { brand: "Lenovo", model: "Legion 5", segment: "Gaming" },
    { brand: "ASUS", model: "ROG Zephyrus G14", segment: "Gaming" },
    { brand: "ASUS", model: "Zenbook 14", segment: "Ultrabook" },
    { brand: "HP", model: "Spectre x360 14", segment: "2-in-1" },
    { brand: "HP", model: "Omen 16", segment: "Gaming" },
    { brand: "Acer", model: "Swift 3", segment: "Ultrabook" },
    { brand: "Acer", model: "Predator Helios 16", segment: "Gaming" },
    { brand: "MSI", model: "Stealth 14", segment: "Gaming" },
    { brand: "MSI", model: "Creator Z16", segment: "Creator" },
    { brand: "Razer", model: "Blade 15", segment: "Gaming" },
    { brand: "Samsung", model: "Galaxy Book4 Pro", segment: "Ultrabook" },
    { brand: "LG", model: "Gram 16", segment: "Ultrabook" },
    { brand: "Microsoft", model: "Surface Laptop 5", segment: "Ultrabook" },
    { brand: "Framework", model: "Laptop 13", segment: "Ultrabook" },
    { brand: "Gigabyte", model: "Aero 16", segment: "Creator" },
  ];

  laptops.forEach((l, idx) => {
    const name = `${l.brand} ${l.model}`;
    const slug = slugify(name);
    const price =
      l.segment === "Gaming" ? 1399 + (idx % 5) * 150 : l.segment === "Creator" ? 1599 + (idx % 4) * 180 : 899 + (idx % 6) * 90;

    products.push(
      productBase({
        slug,
        name,
        brand: l.brand,
        category: "laptops",
        price: money(price),
        compareAtPrice: money(price * 1.14),
        stock: stockFor(300 + idx),
        shortDescription: `${l.segment} laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.`,
        fullDescription:
          "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
        highlights: [
          "Fast SSD storage for quick launches",
          "Comfortable keyboard and large trackpad",
          "Modern wireless performance",
          "Premium chassis and clean design",
        ],
        specs: buildLaptopSpecs({
          display: l.segment === "Gaming" ? "16\" high-refresh display" : "14–16\" high-resolution display",
          cpu: "Modern multi-core CPU",
          gpu: l.segment === "Gaming" ? "Gaming-class GPU" : l.segment === "Creator" ? "Creator-class GPU" : "Integrated graphics",
          memory: "16GB (up to 32GB class)",
          storage: "512GB–1TB SSD (varies)",
          weight: "~2.7–5.5 lb class (varies)",
          ports: "USB‑C + USB‑A + HDMI (varies)",
          wireless: "Wi‑Fi 6/6E + Bluetooth 5",
        }),
        whatsInTheBox: ["Laptop", "Power adapter", "Quick start guide"],
        tags: ["laptop", l.segment.toLowerCase(), l.brand.toLowerCase(), slug],
      })
    );
  });

  // E) LED TVs (20+)
  const tvs = [
    { brand: "Samsung", model: "QLED Q80", size: "55\"" },
    { brand: "Samsung", model: "QLED Q90", size: "65\"" },
    { brand: "LG", model: "OLED C-Series", size: "55\"" },
    { brand: "LG", model: "OLED G-Series", size: "65\"" },
    { brand: "Sony", model: "BRAVIA XR", size: "65\"" },
    { brand: "Sony", model: "BRAVIA X90", size: "75\"" },
    { brand: "TCL", model: "QLED 6-Series", size: "55\"" },
    { brand: "TCL", model: "QLED 7-Series", size: "65\"" },
    { brand: "Hisense", model: "U8 Series", size: "55\"" },
    { brand: "Hisense", model: "U7 Series", size: "65\"" },
    { brand: "VIZIO", model: "Quantum Pro", size: "55\"" },
    { brand: "VIZIO", model: "OLED", size: "65\"" },
    { brand: "Philips", model: "4K Ambilight", size: "55\"" },
    { brand: "Panasonic", model: "4K OLED", size: "65\"" },
    { brand: "Sharp", model: "4K Aquos", size: "50\"" },
    { brand: "Toshiba", model: "4K LED", size: "43\"" },
    { brand: "Xiaomi", model: "4K QLED", size: "55\"" },
    { brand: "OnePlus", model: "4K QLED", size: "65\"" },
    { brand: "Samsung", model: "Neo QLED", size: "75\"" },
    { brand: "LG", model: "NanoCell", size: "50\"" },
  ];

  tvs.forEach((t, idx) => {
    const name = `${t.brand} ${t.model} ${t.size} 4K TV`;
    const slug = slugify(name);
    const price = 399 + (idx % 7) * 150 + (t.size.includes("75") ? 600 : t.size.includes("65") ? 350 : t.size.includes("55") ? 200 : 0);

    products.push(
      productBase({
        slug,
        name,
        brand: t.brand,
        category: "tvs",
        price: money(price),
        compareAtPrice: money(price * 1.2),
        stock: stockFor(400 + idx),
        shortDescription: "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
        fullDescription:
          "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
        highlights: [
          "4K resolution with upscaling",
          "HDR support (varies by model)",
          "Low-latency gaming mode (varies)",
          "Thin-bezel premium design",
        ],
        specs: buildTvSpecs({
          size: t.size,
          panel: t.model.includes("OLED") ? "OLED" : t.model.includes("QLED") ? "QLED" : "LED",
          resolution: "3840×2160 (4K)",
          refresh: "60–120Hz class (varies)",
          hdr: "HDR10/HLG + optional Dolby Vision (varies)",
          smart: "Built-in streaming apps (varies)",
          ports: "HDMI (ARC/eARC varies) + USB",
        }),
        whatsInTheBox: ["TV", "Remote", "Stand", "Power cable", "Quick start guide"],
        tags: ["tv", "4k", t.brand.toLowerCase(), t.size.replace(/\"/g, "in"), slug],
      })
    );
  });

  // normalize ratings/reviews per index
  products.forEach((p, idx) => {
    p.rating = ratingFor(idx);
    p.reviewCount = reviewsFor(idx);
  });

  return products;
}

function writeProductsTs(products) {
  const outPath = path.join(repoRoot, "src", "data", "products.ts");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const content = `export type Product = {\n` +
    `  slug: string;\n` +
    `  name: string;\n` +
    `  brand: string;\n` +
    `  category: "phones" | "laptops" | "audio" | "tvs" | "wearables" | "accessories";\n` +
    `  price: number;\n` +
    `  compareAtPrice?: number;\n` +
    `  stock?: "in" | "low" | "out";\n` +
    `  image: string;\n` +
    `  images: string[];\n` +
    `  shortDescription: string;\n` +
    `  description?: string;\n` +
    `  fullDescription: string;\n` +
    `  highlights: string[];\n` +
    `  specs: Record<string, string>;\n` +
    `  whatsInTheBox: string[];\n` +
    `  warranty: string;\n` +
    `  shipping: string;\n` +
    `  returns?: string;\n` +
    `  rating: number;\n` +
    `  reviewCount: number;\n` +
    `  tags: string[];\n` +
    `};\n\n` +
    `export const products: Product[] = ${JSON.stringify(products, null, 2)};\n\n` +
    `export function getProductBySlug(slug: string) {\n` +
    `  return products.find((p) => p.slug === slug);\n` +
    `}\n`;

  fs.writeFileSync(outPath, content, "utf8");
}

function writePromptPack(products) {
  const outPath = path.join(repoRoot, "src", "data", "image-prompts.md");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const lines = [];
  lines.push("# ZenVora Electronics — AI Image Prompt Pack");
  lines.push("");
  lines.push("All prompts below must generate photorealistic *unbranded* studio product photography.");
  lines.push("Rules: no logos, no brand marks, no readable text, no recognizable OS UI, no manufacturer styling.");
  lines.push("Output format: WebP, high resolution, studio lighting, soft shadows, subtle premium gradient background (deep navy + electric blue/purple accents).");
  lines.push("");

  for (const p of products) {
    const kind = p.category === "phones" ? "phone" : p.category === "laptops" ? "laptop" : p.category === "audio" ? "headphones" : "tv";
    const prompts = promptTriplet({ kind });

    lines.push(`## ${p.name}`);
    lines.push("");
    lines.push(`- slug: \`${p.slug}\``);
    lines.push(`- target folder: \`public/products/premium/${p.slug}/\``);
    lines.push("");
    prompts.forEach((pr, idx) => {
      lines.push(`### Image ${idx + 1}: ${pr.file}`);
      lines.push("");
      lines.push(`**Filename:** \`${pr.file}\``);
      lines.push("");
      lines.push("**Prompt:**");
      lines.push("");
      lines.push(pr.prompt);
      lines.push("");
    });
  }

  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
}

function ensureImageFolders(products) {
  const base = path.join(repoRoot, "public", "products", "premium");
  fs.mkdirSync(base, { recursive: true });

  for (const p of products) {
    const dir = path.join(base, p.slug);
    fs.mkdirSync(dir, { recursive: true });
    const keep = path.join(dir, ".gitkeep");
    if (!fs.existsSync(keep)) fs.writeFileSync(keep, "", "utf8");
  }
}

const products = makeCatalog();

const counts = {
  realme: products.filter((p) => p.brand.toLowerCase() === "realme").length,
  iphones: products.filter((p) => p.tags.includes("iphone")).length,
  headphones: products.filter((p) => p.category === "audio").length,
  laptops: products.filter((p) => p.category === "laptops").length,
  tvs: products.filter((p) => p.category === "tvs").length,
};

if (counts.realme < 24) throw new Error(`Realme count too low: ${counts.realme}`);
if (counts.iphones < 1) throw new Error("iPhone set missing");
if (counts.headphones < 20) throw new Error(`Headphones count too low: ${counts.headphones}`);
if (counts.laptops < 20) throw new Error(`Laptops count too low: ${counts.laptops}`);
if (counts.tvs < 20) throw new Error(`TV count too low: ${counts.tvs}`);

writeProductsTs(products);
writePromptPack(products);
ensureImageFolders(products);

console.log("Catalog rebuilt:", counts);
