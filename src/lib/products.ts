export type ProductSpec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  basePrice: number;
  images: string[];
  description: string;
  colors: string[];
  storages: string[];
  configs?: Array<{ label: string; options: string[] }>;
  specs: ProductSpec[];
  availability: "In stock" | "Limited" | "Out of stock";
  warranty: string;
  returns: string;
};

function gallery(slug: string) {
  const s = slug.toLowerCase();
  // Use real, existing assets from /public/products (category-consistent SVGs)
  // so we never render broken images or UI fallbacks.
  let base = "/products/keyboard.svg";
  if (s.includes("iphone")) base = "/products/iphone15.svg";
  else if (s.includes("lenovo") || s.includes("thinkpad") || s.includes("legion") || s.includes("laptop")) {
    base = "/products/dell-laptop.svg";
  } else if (s.includes("bravia") || s.includes("sony") || s.includes("tv")) {
    base = "/products/sony-tv.svg";
  }
  return [base, base, base];
}

const DEFAULT_WARRANTY = "1-year limited warranty";
const DEFAULT_RETURNS = "Easy returns. See Refund Policy.";

export const products: Product[] = [
  {
    slug: "iphone-13",
    name: "iPhone 13",
    basePrice: 599,
    images: gallery("iphone-13"),
    description: "6.1\" Super Retina XDR OLED • A15 Bionic • Dual 12MP (Wide + Ultra Wide)",
    colors: ["Midnight", "Starlight", "Blue", "Pink", "Green", "Red"],
    storages: ["128GB", "256GB", "512GB"],
    specs: [
      { label: "Display", value: '6.1" Super Retina XDR OLED' },
      { label: "Chip", value: "A15 Bionic" },
      { label: "Camera", value: "Dual 12MP (Wide + Ultra Wide)" },
      { label: "Battery", value: "Up to 19 hours video playback" },
      { label: "Connectivity", value: "5G, Face ID" }
    ],
    availability: "In stock",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },
  {
    slug: "iphone-14",
    name: "iPhone 14",
    basePrice: 699,
    images: gallery("iphone-14"),
    description: "6.1\" Super Retina XDR OLED • A15 Bionic • Dual 12MP + Photonic Engine",
    colors: ["Midnight", "Purple", "Starlight", "Blue", "Red", "Yellow"],
    storages: ["128GB", "256GB", "512GB"],
    specs: [
      { label: "Display", value: '6.1" Super Retina XDR OLED' },
      { label: "Chip", value: "A15 Bionic" },
      { label: "Camera", value: "Dual 12MP + Photonic Engine" },
      { label: "Storage", value: "128GB / 256GB / 512GB" },
      { label: "Safety", value: "Crash Detection, Emergency SOS" }
    ],
    availability: "In stock",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },
  {
    slug: "iphone-15",
    name: "iPhone 15",
    basePrice: 799,
    images: gallery("iphone-15"),
    description: "6.1\" Super Retina XDR OLED • A16 Bionic • 48MP Main + 12MP Ultra Wide",
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
    storages: ["128GB", "256GB", "512GB"],
    specs: [
      { label: "Display", value: '6.1" Super Retina XDR OLED' },
      { label: "Chip", value: "A16 Bionic" },
      { label: "Camera", value: "48MP Main + 12MP Ultra Wide" },
      { label: "Charging", value: "USB-C" },
      { label: "Storage", value: "128GB / 256GB / 512GB" }
    ],
    availability: "In stock",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },
  {
    slug: "iphone-16",
    name: "iPhone 16 (Expected)",
    basePrice: 899,
    images: gallery("iphone-16"),
    description: "6.1\" OLED ProMotion • A18 Bionic (Expected) • 48MP Advanced AI Camera",
    colors: ["Black", "Silver", "Blue", "Rose"],
    storages: ["128GB", "256GB", "512GB"],
    specs: [
      { label: "Display", value: '6.1" OLED ProMotion' },
      { label: "Chip", value: "A18 Bionic (Expected)" },
      { label: "Camera", value: "48MP Advanced AI Camera" },
      { label: "Storage", value: "128GB / 256GB / 512GB" }
    ],
    availability: "Limited",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },
  {
    slug: "iphone-17",
    name: "iPhone 17 (Expected)",
    basePrice: 999,
    images: gallery("iphone-17"),
    description: "6.1\" OLED ProMotion+ • A19 Neural Engine • 64MP Smart Camera",
    colors: ["Midnight", "Arctic White", "Titanium Gray", "Gold"],
    storages: ["256GB", "512GB", "1TB"],
    specs: [
      { label: "Display", value: '6.1" OLED ProMotion+' },
      { label: "Chip", value: "A19 Neural Engine" },
      { label: "Camera", value: "64MP Smart Camera" },
      { label: "Storage", value: "256GB / 512GB / 1TB" }
    ],
    availability: "Limited",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },

  {
    slug: "iphone-12-pro-max",
    name: "iPhone 12 Pro Max",
    basePrice: 649,
    images: gallery("iphone-12-pro-max"),
    description: "6.7\" Super Retina XDR • A14 Bionic • Triple 12MP + LiDAR",
    colors: ["Pacific Blue", "Gold", "Silver", "Graphite"],
    storages: ["128GB", "256GB", "512GB"],
    specs: [
      { label: "Display", value: '6.7" Super Retina XDR' },
      { label: "Chip", value: "A14 Bionic" },
      { label: "Camera", value: "Triple 12MP + LiDAR" },
      { label: "Storage", value: "128GB / 256GB / 512GB" }
    ],
    availability: "In stock",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },
  {
    slug: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    basePrice: 799,
    images: gallery("iphone-13-pro-max"),
    description: "6.7\" Super Retina XDR ProMotion • A15 Bionic • Triple 12MP + LiDAR",
    colors: ["Sierra Blue", "Gold", "Silver", "Graphite", "Alpine Green"],
    storages: ["128GB", "256GB", "512GB", "1TB"],
    specs: [
      { label: "Display", value: '6.7" Super Retina XDR ProMotion' },
      { label: "Chip", value: "A15 Bionic" },
      { label: "Camera", value: "Triple 12MP + LiDAR" },
      { label: "Storage", value: "128GB / 256GB / 512GB / 1TB" }
    ],
    availability: "In stock",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },
  {
    slug: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    basePrice: 899,
    images: gallery("iphone-14-pro-max"),
    description: "6.7\" Super Retina XDR Always-On • A16 Bionic • 48MP Main + LiDAR",
    colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
    storages: ["128GB", "256GB", "512GB", "1TB"],
    specs: [
      { label: "Display", value: '6.7" Super Retina XDR Always-On' },
      { label: "Chip", value: "A16 Bionic" },
      { label: "Camera", value: "48MP Main + LiDAR" },
      { label: "Storage", value: "128GB / 256GB / 512GB / 1TB" }
    ],
    availability: "In stock",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },
  {
    slug: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    basePrice: 1199,
    images: gallery("iphone-15-pro-max"),
    description: "6.7\" Super Retina XDR ProMotion • A17 Pro • 48MP + 5× Telephoto",
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    storages: ["256GB", "512GB", "1TB"],
    specs: [
      { label: "Display", value: '6.7" Super Retina XDR ProMotion' },
      { label: "Chip", value: "A17 Pro" },
      { label: "Camera", value: "48MP + 5× Telephoto" },
      { label: "Storage", value: "256GB / 512GB / 1TB" }
    ],
    availability: "In stock",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },
  {
    slug: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max (Expected)",
    basePrice: 1299,
    images: gallery("iphone-16-pro-max"),
    description: "6.9\" OLED ProMotion • A18 Pro • 48MP AI Camera System",
    colors: ["Titanium Black", "Titanium White", "Blue Titanium", "Desert Gold"],
    storages: ["256GB", "512GB", "1TB"],
    specs: [
      { label: "Display", value: '6.9" OLED ProMotion' },
      { label: "Chip", value: "A18 Pro" },
      { label: "Camera", value: "48MP AI Camera System" },
      { label: "Storage", value: "256GB / 512GB / 1TB" }
    ],
    availability: "Limited",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },
  {
    slug: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max (Expected)",
    basePrice: 1499,
    images: gallery("iphone-17-pro-max"),
    description: "7.0\" OLED Ultra ProMotion • A19 Pro • 64MP Smart Fusion Camera",
    colors: ["Titanium Graphite", "Titanium Gold", "Arctic Silver"],
    storages: ["512GB", "1TB", "2TB"],
    specs: [
      { label: "Display", value: '7.0" OLED Ultra ProMotion' },
      { label: "Chip", value: "A19 Pro" },
      { label: "Camera", value: "64MP Smart Fusion Camera" },
      { label: "Storage", value: "512GB / 1TB / 2TB" }
    ],
    availability: "Limited",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },

  {
    slug: "lenovo-x1-carbon",
    name: "Lenovo ThinkPad X1 Carbon",
    basePrice: 1899,
    images: gallery("lenovo-x1-carbon"),
    description: "14\" 2.8K OLED • Intel Core i7 • 1.12kg",
    colors: ["Black"],
    storages: ["512GB", "1TB"],
    configs: [{ label: "RAM", options: ["16GB", "32GB"] }],
    specs: [
      { label: "Display", value: '14" 2.8K OLED' },
      { label: "CPU", value: "Intel Core i7" },
      { label: "RAM", value: "16GB / 32GB" },
      { label: "Storage", value: "512GB / 1TB SSD" },
      { label: "Weight", value: "1.12kg" }
    ],
    availability: "In stock",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },
  {
    slug: "lenovo-legion",
    name: "Lenovo Legion",
    basePrice: 2199,
    images: gallery("lenovo-legion"),
    description: "16\" QHD 165Hz • RTX 4070 • 32GB RAM • 1TB SSD",
    colors: ["Black"],
    storages: ["1TB"],
    configs: [{ label: "CPU", options: ["Intel i9", "Ryzen 9"] }],
    specs: [
      { label: "Display", value: '16" QHD 165Hz' },
      { label: "CPU", value: "Intel i9 / Ryzen 9" },
      { label: "GPU", value: "RTX 4070" },
      { label: "RAM", value: "32GB" },
      { label: "Storage", value: "1TB SSD" }
    ],
    availability: "In stock",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  },
  {
    slug: "sony-bravia-55",
    name: 'Sony Bravia 55" LED',
    basePrice: 999,
    images: gallery("sony-bravia-55"),
    description: "4K UHD • HDR10 / Dolby Vision • Google TV • Dolby Atmos",
    colors: ["Black"],
    storages: ["N/A"],
    specs: [
      { label: "Resolution", value: "4K UHD" },
      { label: "Panel", value: "HDR10 / Dolby Vision" },
      { label: "Smart OS", value: "Google TV" },
      { label: "Audio", value: "Dolby Atmos" }
    ],
    availability: "In stock",
    warranty: DEFAULT_WARRANTY,
    returns: DEFAULT_RETURNS
  }
];
