import fs from "fs";

const filePath = "src/lib/products.ts";
const source = fs.readFileSync(filePath, "utf8");

const imageMap = {
  phones: {
    image: "/products/premium/phone-01.webp",
    images: [
      "/products/premium/phone-01.webp",
      "/products/premium/phone-02.webp",
      "/products/premium/phone-03.webp",
      "/products/premium/phone-04.webp",
      "/products/premium/phone-05.webp",
    ],
  },
  laptops: {
    image: "/products/premium/laptop-01.webp",
    images: [
      "/products/premium/laptop-01.webp",
      "/products/premium/laptop-02.webp",
      "/products/premium/laptop-03.webp",
      "/products/premium/laptop-04.webp",
      "/products/premium/laptop-05.webp",
    ],
  },
  audio: {
    image: "/products/premium/audio-01.webp",
    images: [
      "/products/premium/audio-01.webp",
      "/products/premium/audio-02.webp",
      "/products/premium/audio-03.webp",
      "/products/premium/audio-04.webp",
      "/products/premium/audio-05.webp",
    ],
  },
  wearables: {
    image: "/products/premium/wearable-01.webp",
    images: [
      "/products/premium/wearable-01.webp",
      "/products/premium/wearable-02.webp",
      "/products/premium/wearable-03.webp",
      "/products/premium/wearable-04.webp",
      "/products/premium/wearable-05.webp",
    ],
  },
  accessories: {
    image: "/products/premium/accessory-01.webp",
    images: [
      "/products/premium/accessory-01.webp",
      "/products/premium/accessory-02.webp",
      "/products/premium/accessory-03.webp",
      "/products/premium/accessory-04.webp",
      "/products/premium/accessory-05.webp",
    ],
  },
};

const blockRe =
  /image:\s*"[^"]*",\s*\n\s*images:\s*\[[\s\S]*?\],\s*\n\s*category:\s*"(phones|laptops|audio|wearables|accessories)"/g;

let updated = 0;
const result = source.replace(blockRe, (_match, category) => {
  const entry = imageMap[category];
  if (!entry) return _match;
  updated += 1;

  const imagesInline = entry.images.map((img) => `"${img}"`).join(", ");

  return `image: "${entry.image}",\n    images: [${imagesInline}],\n    category: "${category}"`;
});

if (updated === 0) {
  console.error(
    "No products updated. The expected pattern may have changed in src/lib/products.ts."
  );
  process.exitCode = 1;
} else {
  fs.writeFileSync(filePath, result, "utf8");
  console.log(`Updated ${updated} products in ${filePath}`);
}
