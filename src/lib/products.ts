export type Product = {
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  compareAt?: number;
  category: string;
  images: { primary: string; secondary: string };
  variants?: {
    colors?: string[];
    storage?: string[];
  };
  inStock: boolean;
};

export const products: Product[] = [
  {
    slug: "iphone-12-pro-max",
    title: "iPhone 12 Pro Max",
    subtitle: '6.7" Super Retina XDR • A14 Bionic • Triple 12MP + LiDAR',
    price: 649,
    compareAt: 749,
    category: "PHONE",
    images: {
      primary: "/products/real/iphone-12-pro-max.webp.png",
      secondary: "/products/real/iphone-12-pro-max.webp%202.png"
    },
    variants: {
      colors: ["Graphite", "Silver", "Gold", "Pacific Blue"],
      storage: ["128GB", "256GB", "512GB"]
    },
    inStock: true
  },
  {
    slug: "iphone-13",
    title: "iPhone 13",
    subtitle: '6.1" Super Retina XDR OLED • A15 Bionic • Dual 12MP',
    price: 599,
    compareAt: 699,
    category: "PHONE",
    images: {
      primary: "/products/real/iphone-13-front.webp.png",
      secondary: "/products/real/iphone-13-back.webp.png"
    },
    variants: {
      colors: ["Midnight", "Starlight", "Blue", "Pink", "Green", "Red"],
      storage: ["128GB", "256GB", "512GB"]
    },
    inStock: true
  },
  {
    slug: "iphone-13-pro-max",
    title: "iPhone 13 Pro Max",
    subtitle: '6.7" Super Retina XDR ProMotion • A15 Bionic • Triple 12MP + LiDAR',
    price: 799,
    compareAt: 899,
    category: "PHONE",
    images: {
      primary: "/products/real/iphone-13-pro-max-front.webp.png",
      secondary: "/products/real/iphone-13-pro-max-back.webp.png"
    },
    variants: {
      colors: ["Graphite", "Silver", "Gold", "Sierra Blue", "Alpine Green"],
      storage: ["128GB", "256GB", "512GB", "1TB"]
    },
    inStock: true
  },
  {
    slug: "iphone-14",
    title: "iPhone 14",
    subtitle: '6.1" Super Retina XDR OLED • A15 Bionic • Dual 12MP',
    price: 699,
    compareAt: 799,
    category: "PHONE",
    images: {
      primary: "/products/real/iphone-14-front.webp.png",
      secondary: "/products/real/iphone-14-back.webp.png"
    },
    variants: { colors: ["Black", "White", "Blue", "Purple"], storage: ["128GB", "256GB", "512GB"] },
    inStock: true
  },
  {
    slug: "iphone-14-pro-max",
    title: "iPhone 14 Pro Max",
    subtitle: '6.7" Super Retina XDR Always-On • A16 Bionic • 48MP Main + LiDAR',
    price: 899,
    compareAt: 999,
    category: "PHONE",
    images: {
      primary: "/products/real/iphone-14-pro-max-front.webp.png",
      secondary: "/products/real/iphone-14-pro-max-back.webp.png"
    },
    variants: { colors: ["Space Black", "Silver", "Gold", "Deep Purple"], storage: ["128GB", "256GB", "512GB", "1TB"] },
    inStock: true
  },
  {
    slug: "iphone-15",
    title: "iPhone 15",
    subtitle: '6.1" Super Retina XDR OLED • A16 Bionic • 48MP Main + 12MP Ultra Wide',
    price: 799,
    compareAt: 899,
    category: "PHONE",
    images: {
      primary: "/products/real/iphone-15-front.webp.png",
      secondary: "/products/real/iphone-15-back.webp.png"
    },
    variants: { colors: ["Black", "Blue", "Green", "Yellow", "Pink"], storage: ["128GB", "256GB", "512GB"] },
    inStock: true
  },
  {
    slug: "iphone-15-pro-max",
    title: "iPhone 15 Pro Max",
    subtitle: '6.7" Super Retina XDR ProMotion • A17 Pro • 48MP + 5× Telephoto',
    price: 1199,
    compareAt: 1299,
    category: "PHONE",
    images: {
      primary: "/products/real/iphone-15-pro-max-front.webp.png",
      secondary: "/products/real/iphone-15-pro-max-back.webp.png"
    },
    variants: {
      colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
      storage: ["256GB", "512GB", "1TB"]
    },
    inStock: true
  },
  {
    slug: "iphone-16",
    title: "iPhone 16",
    subtitle: '6.1" OLED • A18 Bionic • 48MP Advanced AI Camera',
    price: 899,
    compareAt: 999,
    category: "PHONE",
    images: {
      primary: "/products/real/iphone-16-front.webp.png",
      secondary: "/products/real/iphone-16-back.webp.png"
    },
    variants: { colors: ["Black", "White", "Blue", "Orange"], storage: ["128GB", "256GB", "512GB"] },
    inStock: true
  },
  {
    slug: "iphone-16-pro-max",
    title: "iPhone 16 Pro Max",
    subtitle: '6.9" OLED ProMotion • A18 Pro • 48MP Camera System',
    price: 1299,
    compareAt: 1399,
    category: "PHONE",
    images: {
      primary: "/products/real/iphone-16-pro-max-front.webp.png",
      secondary: "/products/real/iphone-16-pro-max-back.webp.png"
    },
    variants: {
      colors: ["Titanium Black", "Titanium White", "Blue Titanium", "Desert Gold"],
      storage: ["256GB", "512GB", "1TB"]
    },
    inStock: true
  },
  {
    slug: "iphone-17",
    title: "iPhone 17",
    subtitle: '6.1" OLED ProMotion+ • A19 Neural Engine • 64MP Smart Camera',
    price: 999,
    compareAt: 1099,
    category: "PHONE",
    images: {
      primary: "/products/real/iphone-17-front.webp.png",
      secondary: "/products/real/iphone-17-back.webp.png"
    },
    variants: { colors: ["Midnight", "Arctic White", "Titanium Gray", "Gold"], storage: ["256GB", "512GB", "1TB"] },
    inStock: true
  },
  {
    slug: "iphone-17-pro-max",
    title: "iPhone 17 Pro Max",
    subtitle: '7.0" OLED Ultra ProMotion • A19 Pro • 64MP Smart Fusion Camera',
    price: 1499,
    compareAt: 1599,
    category: "PHONE",
    images: {
      primary: "/products/real/iphone-17-pro-max-1.webp.png",
      secondary: "/products/real/iphone-17-pro-max-2.webp.png"
    },
    variants: { colors: ["Titanium Graphite", "Titanium Gold", "Arctic Silver"], storage: ["512GB", "1TB", "2TB"] },
    inStock: true
  },
  {
    slug: "lenovo-legion-16",
    title: "Lenovo Legion 16",
    subtitle: '16" QHD 165Hz • RTX 4070 • 32GB RAM • 1TB SSD',
    price: 2199,
    compareAt: 2399,
    category: "LAPTOP",
    images: {
      primary: "/products/real/lenovo-legion-16-1.webp.png",
      secondary: "/products/real/lenovo-legion-16-2.webp.png"
    },
    variants: { colors: ["Black"], storage: ["1TB", "2TB"] },
    inStock: true
  },
  {
    slug: "lenovo-thinkpad-x1-carbon",
    title: "Lenovo ThinkPad X1 Carbon",
    subtitle: '14" 2.8K OLED • Intel Core i7 • 1.12kg',
    price: 1899,
    compareAt: 2099,
    category: "LAPTOP",
    images: {
      primary: "/products/real/lenovo-thinkpad-x1-carbon-1.webp.png",
      secondary: "/products/real/lenovo-thinkpad-x1-carbon-2.webp.png"
    },
    variants: { colors: ["Black"], storage: ["512GB", "1TB"] },
    inStock: true
  },
  {
    slug: "sony-bravia-55-led",
    title: 'Sony Bravia 55" LED',
    subtitle: "4K UHD • HDR10 / Dolby Vision • Google TV • Dolby Atmos",
    price: 999,
    compareAt: 1199,
    category: "TV",
    images: {
      primary: "/products/real/sony-bravia-55-led-1.webp.png",
      secondary: "/products/real/sony-bravia-55-led-2.webp.png"
    },
    inStock: true
  }
];
