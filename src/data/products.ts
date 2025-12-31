export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: "phones" | "laptops" | "audio" | "tvs" | "wearables" | "accessories";
  price: number;
  compareAtPrice?: number;
  stock?: "in" | "low" | "out";
  image: string;
  images: string[];
  shortDescription: string;
  description?: string;
  fullDescription: string;
  highlights: string[];
  specs: Record<string, string>;
  whatsInTheBox: string[];
  warranty: string;
  shipping: string;
  returns?: string;
  rating: number;
  reviewCount: number;
  tags: string[];
};

const baseProducts: Product[] = [
  {
    "slug": "realme-12",
    "name": "realme 12",
    "brand": "realme",
    "category": "phones",
    "price": 249,
    "compareAtPrice": 286,
    "stock": "low",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 120,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-12"
    ],
    "image": "/products/premium/realme-12/01.webp",
    "images": [
      "/products/premium/realme-12/01.webp",
      "/products/premium/realme-12/02.webp",
      "/products/premium/realme-12/03.webp"
    ]
  },
  {
    "slug": "realme-12-plus",
    "name": "realme 12+",
    "brand": "realme",
    "category": "phones",
    "price": 284,
    "compareAtPrice": 327,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 157,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-12-plus"
    ],
    "image": "/products/premium/realme-12-plus/01.webp",
    "images": [
      "/products/premium/realme-12-plus/01.webp",
      "/products/premium/realme-12-plus/02.webp",
      "/products/premium/realme-12-plus/03.webp"
    ]
  },
  {
    "slug": "realme-12-pro",
    "name": "realme 12 Pro",
    "brand": "realme",
    "category": "phones",
    "price": 729,
    "compareAtPrice": 838,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 194,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-12-pro"
    ],
    "image": "/products/premium/realme-12-pro/01.webp",
    "images": [
      "/products/premium/realme-12-pro/01.webp",
      "/products/premium/realme-12-pro/02.webp",
      "/products/premium/realme-12-pro/03.webp"
    ]
  },
  {
    "slug": "realme-12-pro-plus",
    "name": "realme 12 Pro+",
    "brand": "realme",
    "category": "phones",
    "price": 769,
    "compareAtPrice": 884,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 231,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-12-pro-plus"
    ],
    "image": "/products/premium/realme-12-pro-plus/01.webp",
    "images": [
      "/products/premium/realme-12-pro-plus/01.webp",
      "/products/premium/realme-12-pro-plus/02.webp",
      "/products/premium/realme-12-pro-plus/03.webp"
    ]
  },
  {
    "slug": "realme-11",
    "name": "realme 11",
    "brand": "realme",
    "category": "phones",
    "price": 389,
    "compareAtPrice": 447,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 268,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-11"
    ],
    "image": "/products/premium/realme-11/01.webp",
    "images": [
      "/products/premium/realme-11/01.webp",
      "/products/premium/realme-11/02.webp",
      "/products/premium/realme-11/03.webp"
    ]
  },
  {
    "slug": "realme-11-pro",
    "name": "realme 11 Pro",
    "brand": "realme",
    "category": "phones",
    "price": 649,
    "compareAtPrice": 746,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 305,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-11-pro"
    ],
    "image": "/products/premium/realme-11-pro/01.webp",
    "images": [
      "/products/premium/realme-11-pro/01.webp",
      "/products/premium/realme-11-pro/02.webp",
      "/products/premium/realme-11-pro/03.webp"
    ]
  },
  {
    "slug": "realme-11-pro-plus",
    "name": "realme 11 Pro+",
    "brand": "realme",
    "category": "phones",
    "price": 689,
    "compareAtPrice": 792,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 342,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-11-pro-plus"
    ],
    "image": "/products/premium/realme-11-pro-plus/01.webp",
    "images": [
      "/products/premium/realme-11-pro-plus/01.webp",
      "/products/premium/realme-11-pro-plus/02.webp",
      "/products/premium/realme-11-pro-plus/03.webp"
    ]
  },
  {
    "slug": "realme-10",
    "name": "realme 10",
    "brand": "realme",
    "category": "phones",
    "price": 249,
    "compareAtPrice": 286,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 379,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-10"
    ],
    "image": "/products/premium/realme-10/01.webp",
    "images": [
      "/products/premium/realme-10/01.webp",
      "/products/premium/realme-10/02.webp",
      "/products/premium/realme-10/03.webp"
    ]
  },
  {
    "slug": "realme-10-pro",
    "name": "realme 10 Pro",
    "brand": "realme",
    "category": "phones",
    "price": 769,
    "compareAtPrice": 884,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 416,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-10-pro"
    ],
    "image": "/products/premium/realme-10-pro/01.webp",
    "images": [
      "/products/premium/realme-10-pro/01.webp",
      "/products/premium/realme-10-pro/02.webp",
      "/products/premium/realme-10-pro/03.webp"
    ]
  },
  {
    "slug": "realme-10-pro-plus",
    "name": "realme 10 Pro+",
    "brand": "realme",
    "category": "phones",
    "price": 809,
    "compareAtPrice": 930,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 453,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-10-pro-plus"
    ],
    "image": "/products/premium/realme-10-pro-plus/01.webp",
    "images": [
      "/products/premium/realme-10-pro-plus/01.webp",
      "/products/premium/realme-10-pro-plus/02.webp",
      "/products/premium/realme-10-pro-plus/03.webp"
    ]
  },
  {
    "slug": "realme-9",
    "name": "realme 9",
    "brand": "realme",
    "category": "phones",
    "price": 354,
    "compareAtPrice": 407,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 490,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-9"
    ],
    "image": "/products/premium/realme-9/01.webp",
    "images": [
      "/products/premium/realme-9/01.webp",
      "/products/premium/realme-9/02.webp",
      "/products/premium/realme-9/03.webp"
    ]
  },
  {
    "slug": "realme-9-pro",
    "name": "realme 9 Pro",
    "brand": "realme",
    "category": "phones",
    "price": 689,
    "compareAtPrice": 792,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 527,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-9-pro"
    ],
    "image": "/products/premium/realme-9-pro/01.webp",
    "images": [
      "/products/premium/realme-9-pro/01.webp",
      "/products/premium/realme-9-pro/02.webp",
      "/products/premium/realme-9-pro/03.webp"
    ]
  },
  {
    "slug": "realme-9-pro-plus",
    "name": "realme 9 Pro+",
    "brand": "realme",
    "category": "phones",
    "price": 729,
    "compareAtPrice": 838,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 564,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-9-pro-plus"
    ],
    "image": "/products/premium/realme-9-pro-plus/01.webp",
    "images": [
      "/products/premium/realme-9-pro-plus/01.webp",
      "/products/premium/realme-9-pro-plus/02.webp",
      "/products/premium/realme-9-pro-plus/03.webp"
    ]
  },
  {
    "slug": "realme-gt-5",
    "name": "realme GT 5",
    "brand": "realme",
    "category": "phones",
    "price": 769,
    "compareAtPrice": 884,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 601,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-gt-5"
    ],
    "image": "/products/premium/realme-gt-5/01.webp",
    "images": [
      "/products/premium/realme-gt-5/01.webp",
      "/products/premium/realme-gt-5/02.webp",
      "/products/premium/realme-gt-5/03.webp"
    ]
  },
  {
    "slug": "realme-gt-5-pro",
    "name": "realme GT 5 Pro",
    "brand": "realme",
    "category": "phones",
    "price": 809,
    "compareAtPrice": 930,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 638,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-gt-5-pro"
    ],
    "image": "/products/premium/realme-gt-5-pro/01.webp",
    "images": [
      "/products/premium/realme-gt-5-pro/01.webp",
      "/products/premium/realme-gt-5-pro/02.webp",
      "/products/premium/realme-gt-5-pro/03.webp"
    ]
  },
  {
    "slug": "realme-gt-6",
    "name": "realme GT 6",
    "brand": "realme",
    "category": "phones",
    "price": 649,
    "compareAtPrice": 746,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 675,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-gt-6"
    ],
    "image": "/products/premium/realme-gt-6/01.webp",
    "images": [
      "/products/premium/realme-gt-6/01.webp",
      "/products/premium/realme-gt-6/02.webp",
      "/products/premium/realme-gt-6/03.webp"
    ]
  },
  {
    "slug": "realme-gt-neo-5",
    "name": "realme GT Neo 5",
    "brand": "realme",
    "category": "phones",
    "price": 689,
    "compareAtPrice": 792,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 712,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-gt-neo-5"
    ],
    "image": "/products/premium/realme-gt-neo-5/01.webp",
    "images": [
      "/products/premium/realme-gt-neo-5/01.webp",
      "/products/premium/realme-gt-neo-5/02.webp",
      "/products/premium/realme-gt-neo-5/03.webp"
    ]
  },
  {
    "slug": "realme-gt-neo-5-se",
    "name": "realme GT Neo 5 SE",
    "brand": "realme",
    "category": "phones",
    "price": 729,
    "compareAtPrice": 838,
    "stock": "low",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 749,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-gt-neo-5-se"
    ],
    "image": "/products/premium/realme-gt-neo-5-se/01.webp",
    "images": [
      "/products/premium/realme-gt-neo-5-se/01.webp",
      "/products/premium/realme-gt-neo-5-se/02.webp",
      "/products/premium/realme-gt-neo-5-se/03.webp"
    ]
  },
  {
    "slug": "realme-c55",
    "name": "realme C55",
    "brand": "realme",
    "category": "phones",
    "price": 389,
    "compareAtPrice": 447,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 786,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-c55"
    ],
    "image": "/products/premium/realme-c55/01.webp",
    "images": [
      "/products/premium/realme-c55/01.webp",
      "/products/premium/realme-c55/02.webp",
      "/products/premium/realme-c55/03.webp"
    ]
  },
  {
    "slug": "realme-c67",
    "name": "realme C67",
    "brand": "realme",
    "category": "phones",
    "price": 424,
    "compareAtPrice": 488,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 823,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-c67"
    ],
    "image": "/products/premium/realme-c67/01.webp",
    "images": [
      "/products/premium/realme-c67/01.webp",
      "/products/premium/realme-c67/02.webp",
      "/products/premium/realme-c67/03.webp"
    ]
  },
  {
    "slug": "realme-c53",
    "name": "realme C53",
    "brand": "realme",
    "category": "phones",
    "price": 459,
    "compareAtPrice": 528,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 860,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-c53"
    ],
    "image": "/products/premium/realme-c53/01.webp",
    "images": [
      "/products/premium/realme-c53/01.webp",
      "/products/premium/realme-c53/02.webp",
      "/products/premium/realme-c53/03.webp"
    ]
  },
  {
    "slug": "realme-c51",
    "name": "realme C51",
    "brand": "realme",
    "category": "phones",
    "price": 249,
    "compareAtPrice": 286,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 897,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-c51"
    ],
    "image": "/products/premium/realme-c51/01.webp",
    "images": [
      "/products/premium/realme-c51/01.webp",
      "/products/premium/realme-c51/02.webp",
      "/products/premium/realme-c51/03.webp"
    ]
  },
  {
    "slug": "realme-narzo-60",
    "name": "realme Narzo 60",
    "brand": "realme",
    "category": "phones",
    "price": 284,
    "compareAtPrice": 327,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 934,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-narzo-60"
    ],
    "image": "/products/premium/realme-narzo-60/01.webp",
    "images": [
      "/products/premium/realme-narzo-60/01.webp",
      "/products/premium/realme-narzo-60/02.webp",
      "/products/premium/realme-narzo-60/03.webp"
    ]
  },
  {
    "slug": "realme-narzo-60-pro",
    "name": "realme Narzo 60 Pro",
    "brand": "realme",
    "category": "phones",
    "price": 769,
    "compareAtPrice": 884,
    "stock": "in",
    "shortDescription": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "description": "High-refresh display, fast charging, and a versatile camera setup—built for premium daily performance.",
    "fullDescription": "A premium-focused realme smartphone with a fast, smooth display and modern camera processing. Designed for everyday speed, clean photos, and reliable battery life. Prices may vary by region and retailer.",
    "highlights": [
      "Smooth high-refresh display",
      "Fast charging for quick top-ups",
      "Modern multi-camera system (unbranded)",
      "5G-ready connectivity (where supported)"
    ],
    "specs": {
      "Display": "6.6\" AMOLED-class, 120Hz class",
      "Chipset": "Modern 5G-capable mobile chipset",
      "Storage options": "128GB / 256GB",
      "Cameras": "Triple camera (wide + ultra-wide + macro/tele)",
      "Battery": "5000mAh class",
      "Charging": "Fast charge (67W–120W class, varies by model)",
      "Connectivity": "5G + Wi‑Fi 6 + Bluetooth 5.3"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 971,
    "tags": [
      "realme",
      "android",
      "5g",
      "phone",
      "fast-charge",
      "realme-narzo-60-pro"
    ],
    "image": "/products/premium/realme-narzo-60-pro/01.webp",
    "images": [
      "/products/premium/realme-narzo-60-pro/01.webp",
      "/products/premium/realme-narzo-60-pro/02.webp",
      "/products/premium/realme-narzo-60-pro/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-x",
    "name": "Apple iPhone X",
    "brand": "Apple",
    "category": "phones",
    "price": 399,
    "compareAtPrice": 439,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 1008,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-x"
    ],
    "image": "/products/premium/apple-iphone-x/01.webp",
    "images": [
      "/products/premium/apple-iphone-x/01.webp",
      "/products/premium/apple-iphone-x/02.webp",
      "/products/premium/apple-iphone-x/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-xs",
    "name": "Apple iPhone XS",
    "brand": "Apple",
    "category": "phones",
    "price": 474,
    "compareAtPrice": 521,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 1045,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-xs"
    ],
    "image": "/products/premium/apple-iphone-xs/01.webp",
    "images": [
      "/products/premium/apple-iphone-xs/01.webp",
      "/products/premium/apple-iphone-xs/02.webp",
      "/products/premium/apple-iphone-xs/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-xs-max",
    "name": "Apple iPhone XS Max",
    "brand": "Apple",
    "category": "phones",
    "price": 549,
    "compareAtPrice": 604,
    "stock": "low",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 1082,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-xs-max"
    ],
    "image": "/products/premium/apple-iphone-xs-max/01.webp",
    "images": [
      "/products/premium/apple-iphone-xs-max/01.webp",
      "/products/premium/apple-iphone-xs-max/02.webp",
      "/products/premium/apple-iphone-xs-max/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-xr",
    "name": "Apple iPhone XR",
    "brand": "Apple",
    "category": "phones",
    "price": 624,
    "compareAtPrice": 686,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 1119,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-xr"
    ],
    "image": "/products/premium/apple-iphone-xr/01.webp",
    "images": [
      "/products/premium/apple-iphone-xr/01.webp",
      "/products/premium/apple-iphone-xr/02.webp",
      "/products/premium/apple-iphone-xr/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-11",
    "name": "Apple iPhone 11",
    "brand": "Apple",
    "category": "phones",
    "price": 499,
    "compareAtPrice": 549,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 1156,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-11"
    ],
    "image": "/products/premium/apple-iphone-11/01.webp",
    "images": [
      "/products/premium/apple-iphone-11/01.webp",
      "/products/premium/apple-iphone-11/02.webp",
      "/products/premium/apple-iphone-11/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-11-pro",
    "name": "Apple iPhone 11 Pro",
    "brand": "Apple",
    "category": "phones",
    "price": 574,
    "compareAtPrice": 631,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 1193,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-11-pro"
    ],
    "image": "/products/premium/apple-iphone-11-pro/01.webp",
    "images": [
      "/products/premium/apple-iphone-11-pro/01.webp",
      "/products/premium/apple-iphone-11-pro/02.webp",
      "/products/premium/apple-iphone-11-pro/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-11-pro-max",
    "name": "Apple iPhone 11 Pro Max",
    "brand": "Apple",
    "category": "phones",
    "price": 649,
    "compareAtPrice": 714,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 1230,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-11-pro-max"
    ],
    "image": "/products/premium/apple-iphone-11-pro-max/01.webp",
    "images": [
      "/products/premium/apple-iphone-11-pro-max/01.webp",
      "/products/premium/apple-iphone-11-pro-max/02.webp",
      "/products/premium/apple-iphone-11-pro-max/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-12-mini",
    "name": "Apple iPhone 12 mini",
    "brand": "Apple",
    "category": "phones",
    "price": 724,
    "compareAtPrice": 796,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 120,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-12-mini"
    ],
    "image": "/products/premium/apple-iphone-12-mini/01.webp",
    "images": [
      "/products/premium/apple-iphone-12-mini/01.webp",
      "/products/premium/apple-iphone-12-mini/02.webp",
      "/products/premium/apple-iphone-12-mini/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-12",
    "name": "Apple iPhone 12",
    "brand": "Apple",
    "category": "phones",
    "price": 599,
    "compareAtPrice": 659,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 157,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-12"
    ],
    "image": "/products/premium/apple-iphone-12/01.webp",
    "images": [
      "/products/premium/apple-iphone-12/01.webp",
      "/products/premium/apple-iphone-12/02.webp",
      "/products/premium/apple-iphone-12/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-12-pro",
    "name": "Apple iPhone 12 Pro",
    "brand": "Apple",
    "category": "phones",
    "price": 674,
    "compareAtPrice": 741,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 194,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-12-pro"
    ],
    "image": "/products/premium/apple-iphone-12-pro/01.webp",
    "images": [
      "/products/premium/apple-iphone-12-pro/01.webp",
      "/products/premium/apple-iphone-12-pro/02.webp",
      "/products/premium/apple-iphone-12-pro/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-12-pro-max",
    "name": "Apple iPhone 12 Pro Max",
    "brand": "Apple",
    "category": "phones",
    "price": 749,
    "compareAtPrice": 824,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 231,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-12-pro-max"
    ],
    "image": "/products/premium/apple-iphone-12-pro-max/01.webp",
    "images": [
      "/products/premium/apple-iphone-12-pro-max/01.webp",
      "/products/premium/apple-iphone-12-pro-max/02.webp",
      "/products/premium/apple-iphone-12-pro-max/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-13-mini",
    "name": "Apple iPhone 13 mini",
    "brand": "Apple",
    "category": "phones",
    "price": 824,
    "compareAtPrice": 906,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 268,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-13-mini"
    ],
    "image": "/products/premium/apple-iphone-13-mini/01.webp",
    "images": [
      "/products/premium/apple-iphone-13-mini/01.webp",
      "/products/premium/apple-iphone-13-mini/02.webp",
      "/products/premium/apple-iphone-13-mini/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-13",
    "name": "Apple iPhone 13",
    "brand": "Apple",
    "category": "phones",
    "price": 699,
    "compareAtPrice": 769,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 305,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-13"
    ],
    "image": "/products/premium/apple-iphone-13/01.webp",
    "images": [
      "/products/premium/apple-iphone-13/01.webp",
      "/products/premium/apple-iphone-13/02.webp",
      "/products/premium/apple-iphone-13/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-13-pro",
    "name": "Apple iPhone 13 Pro",
    "brand": "Apple",
    "category": "phones",
    "price": 774,
    "compareAtPrice": 851,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 342,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-13-pro"
    ],
    "image": "/products/premium/apple-iphone-13-pro/01.webp",
    "images": [
      "/products/premium/apple-iphone-13-pro/01.webp",
      "/products/premium/apple-iphone-13-pro/02.webp",
      "/products/premium/apple-iphone-13-pro/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-13-pro-max",
    "name": "Apple iPhone 13 Pro Max",
    "brand": "Apple",
    "category": "phones",
    "price": 849,
    "compareAtPrice": 934,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 379,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-13-pro-max"
    ],
    "image": "/products/premium/apple-iphone-13-pro-max/01.webp",
    "images": [
      "/products/premium/apple-iphone-13-pro-max/01.webp",
      "/products/premium/apple-iphone-13-pro-max/02.webp",
      "/products/premium/apple-iphone-13-pro-max/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-14",
    "name": "Apple iPhone 14",
    "brand": "Apple",
    "category": "phones",
    "price": 924,
    "compareAtPrice": 1016,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 416,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-14"
    ],
    "image": "/products/premium/apple-iphone-14/01.webp",
    "images": [
      "/products/premium/apple-iphone-14/01.webp",
      "/products/premium/apple-iphone-14/02.webp",
      "/products/premium/apple-iphone-14/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-14-plus",
    "name": "Apple iPhone 14 Plus",
    "brand": "Apple",
    "category": "phones",
    "price": 799,
    "compareAtPrice": 879,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 453,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-14-plus"
    ],
    "image": "/products/premium/apple-iphone-14-plus/01.webp",
    "images": [
      "/products/premium/apple-iphone-14-plus/01.webp",
      "/products/premium/apple-iphone-14-plus/02.webp",
      "/products/premium/apple-iphone-14-plus/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-14-pro",
    "name": "Apple iPhone 14 Pro",
    "brand": "Apple",
    "category": "phones",
    "price": 874,
    "compareAtPrice": 961,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 490,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-14-pro"
    ],
    "image": "/products/premium/apple-iphone-14-pro/01.webp",
    "images": [
      "/products/premium/apple-iphone-14-pro/01.webp",
      "/products/premium/apple-iphone-14-pro/02.webp",
      "/products/premium/apple-iphone-14-pro/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-14-pro-max",
    "name": "Apple iPhone 14 Pro Max",
    "brand": "Apple",
    "category": "phones",
    "price": 949,
    "compareAtPrice": 1044,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 527,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-14-pro-max"
    ],
    "image": "/products/premium/apple-iphone-14-pro-max/01.webp",
    "images": [
      "/products/premium/apple-iphone-14-pro-max/01.webp",
      "/products/premium/apple-iphone-14-pro-max/02.webp",
      "/products/premium/apple-iphone-14-pro-max/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-15",
    "name": "Apple iPhone 15",
    "brand": "Apple",
    "category": "phones",
    "price": 1024,
    "compareAtPrice": 1126,
    "stock": "low",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 564,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-15"
    ],
    "image": "/products/premium/apple-iphone-15/01.webp",
    "images": [
      "/products/premium/apple-iphone-15/01.webp",
      "/products/premium/apple-iphone-15/02.webp",
      "/products/premium/apple-iphone-15/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-15-plus",
    "name": "Apple iPhone 15 Plus",
    "brand": "Apple",
    "category": "phones",
    "price": 899,
    "compareAtPrice": 989,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 601,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-15-plus"
    ],
    "image": "/products/premium/apple-iphone-15-plus/01.webp",
    "images": [
      "/products/premium/apple-iphone-15-plus/01.webp",
      "/products/premium/apple-iphone-15-plus/02.webp",
      "/products/premium/apple-iphone-15-plus/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-15-pro",
    "name": "Apple iPhone 15 Pro",
    "brand": "Apple",
    "category": "phones",
    "price": 974,
    "compareAtPrice": 1071,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 638,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-15-pro"
    ],
    "image": "/products/premium/apple-iphone-15-pro/01.webp",
    "images": [
      "/products/premium/apple-iphone-15-pro/01.webp",
      "/products/premium/apple-iphone-15-pro/02.webp",
      "/products/premium/apple-iphone-15-pro/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-15-pro-max",
    "name": "Apple iPhone 15 Pro Max",
    "brand": "Apple",
    "category": "phones",
    "price": 1049,
    "compareAtPrice": 1154,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 675,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-15-pro-max"
    ],
    "image": "/products/premium/apple-iphone-15-pro-max/01.webp",
    "images": [
      "/products/premium/apple-iphone-15-pro-max/01.webp",
      "/products/premium/apple-iphone-15-pro-max/02.webp",
      "/products/premium/apple-iphone-15-pro-max/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-16",
    "name": "Apple iPhone 16",
    "brand": "Apple",
    "category": "phones",
    "price": 1124,
    "compareAtPrice": 1236,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 712,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-16"
    ],
    "image": "/products/premium/apple-iphone-16/01.webp",
    "images": [
      "/products/premium/apple-iphone-16/01.webp",
      "/products/premium/apple-iphone-16/02.webp",
      "/products/premium/apple-iphone-16/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-16-plus",
    "name": "Apple iPhone 16 Plus",
    "brand": "Apple",
    "category": "phones",
    "price": 999,
    "compareAtPrice": 1099,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 749,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-16-plus"
    ],
    "image": "/products/premium/apple-iphone-16-plus/01.webp",
    "images": [
      "/products/premium/apple-iphone-16-plus/01.webp",
      "/products/premium/apple-iphone-16-plus/02.webp",
      "/products/premium/apple-iphone-16-plus/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-16-pro",
    "name": "Apple iPhone 16 Pro",
    "brand": "Apple",
    "category": "phones",
    "price": 1074,
    "compareAtPrice": 1181,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 786,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-16-pro"
    ],
    "image": "/products/premium/apple-iphone-16-pro/01.webp",
    "images": [
      "/products/premium/apple-iphone-16-pro/01.webp",
      "/products/premium/apple-iphone-16-pro/02.webp",
      "/products/premium/apple-iphone-16-pro/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-16-pro-max",
    "name": "Apple iPhone 16 Pro Max",
    "brand": "Apple",
    "category": "phones",
    "price": 1149,
    "compareAtPrice": 1264,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 823,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-16-pro-max"
    ],
    "image": "/products/premium/apple-iphone-16-pro-max/01.webp",
    "images": [
      "/products/premium/apple-iphone-16-pro-max/01.webp",
      "/products/premium/apple-iphone-16-pro-max/02.webp",
      "/products/premium/apple-iphone-16-pro-max/03.webp"
    ]
  },
  {
    "slug": "apple-iphone-17-pro-max-placeholder",
    "name": "Apple iPhone 17 Pro Max (Placeholder)",
    "brand": "Apple",
    "category": "phones",
    "price": 1399,
    "compareAtPrice": 1539,
    "stock": "in",
    "shortDescription": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "description": "Iconic design with a premium camera and performance profile. Storage options vary by configuration.",
    "fullDescription": "This listing is presented with unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are typical for this generation and may vary by region and configuration. Prices may vary by region and retailer.\n\nNOTE: This model name/spec is placeholder/speculative and provided for catalog completeness only.",
    "highlights": [
      "Premium camera system and computational photography",
      "Fast everyday performance",
      "High-quality OLED-class display",
      "Secure device features and long-term usability"
    ],
    "specs": {
      "Display": "OLED-class display (size varies by model)",
      "Chipset": "Generation-appropriate Apple A-series chipset",
      "Storage options": "64GB / 128GB / 256GB / 512GB (varies)",
      "Cameras": "Dual or triple camera system (varies)",
      "Battery": "All-day battery class (varies)",
      "Charging": "Fast charging + wireless charging (varies)",
      "Connectivity": "5G (newer models) + Wi‑Fi + Bluetooth"
    },
    "whatsInTheBox": [
      "Phone",
      "USB‑C/Lightning cable (varies)",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 860,
    "tags": [
      "iphone",
      "apple",
      "ios",
      "phone",
      "apple-iphone-17-pro-max-placeholder"
    ],
    "image": "/products/premium/apple-iphone-17-pro-max-placeholder/01.webp",
    "images": [
      "/products/premium/apple-iphone-17-pro-max-placeholder/01.webp",
      "/products/premium/apple-iphone-17-pro-max-placeholder/02.webp",
      "/products/premium/apple-iphone-17-pro-max-placeholder/03.webp"
    ]
  },
  {
    "slug": "sony-wh-1000xm5",
    "name": "Sony WH-1000XM5",
    "brand": "Sony",
    "category": "audio",
    "price": 209,
    "compareAtPrice": 247,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 897,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "sony",
      "sony-wh-1000xm5"
    ],
    "image": "/products/premium/sony-wh-1000xm5/01.webp",
    "images": [
      "/products/premium/sony-wh-1000xm5/01.webp",
      "/products/premium/sony-wh-1000xm5/02.webp",
      "/products/premium/sony-wh-1000xm5/03.webp"
    ]
  },
  {
    "slug": "sony-wh-1000xm4",
    "name": "Sony WH-1000XM4",
    "brand": "Sony",
    "category": "audio",
    "price": 244,
    "compareAtPrice": 288,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 934,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "sony",
      "sony-wh-1000xm4"
    ],
    "image": "/products/premium/sony-wh-1000xm4/01.webp",
    "images": [
      "/products/premium/sony-wh-1000xm4/01.webp",
      "/products/premium/sony-wh-1000xm4/02.webp",
      "/products/premium/sony-wh-1000xm4/03.webp"
    ]
  },
  {
    "slug": "bose-quietcomfort-ultra",
    "name": "Bose QuietComfort Ultra",
    "brand": "Bose",
    "category": "audio",
    "price": 279,
    "compareAtPrice": 329,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 971,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "bose",
      "bose-quietcomfort-ultra"
    ],
    "image": "/products/premium/bose-quietcomfort-ultra/01.webp",
    "images": [
      "/products/premium/bose-quietcomfort-ultra/01.webp",
      "/products/premium/bose-quietcomfort-ultra/02.webp",
      "/products/premium/bose-quietcomfort-ultra/03.webp"
    ]
  },
  {
    "slug": "bose-quietcomfort-45",
    "name": "Bose QuietComfort 45",
    "brand": "Bose",
    "category": "audio",
    "price": 314,
    "compareAtPrice": 371,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 1008,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "bose",
      "bose-quietcomfort-45"
    ],
    "image": "/products/premium/bose-quietcomfort-45/01.webp",
    "images": [
      "/products/premium/bose-quietcomfort-45/01.webp",
      "/products/premium/bose-quietcomfort-45/02.webp",
      "/products/premium/bose-quietcomfort-45/03.webp"
    ]
  },
  {
    "slug": "sennheiser-momentum-4",
    "name": "Sennheiser Momentum 4",
    "brand": "Sennheiser",
    "category": "audio",
    "price": 349,
    "compareAtPrice": 412,
    "stock": "low",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 1045,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "sennheiser",
      "sennheiser-momentum-4"
    ],
    "image": "/products/premium/sennheiser-momentum-4/01.webp",
    "images": [
      "/products/premium/sennheiser-momentum-4/01.webp",
      "/products/premium/sennheiser-momentum-4/02.webp",
      "/products/premium/sennheiser-momentum-4/03.webp"
    ]
  },
  {
    "slug": "sennheiser-hd-450bt",
    "name": "Sennheiser HD 450BT",
    "brand": "Sennheiser",
    "category": "audio",
    "price": 384,
    "compareAtPrice": 453,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 1082,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "sennheiser",
      "sennheiser-hd-450bt"
    ],
    "image": "/products/premium/sennheiser-hd-450bt/01.webp",
    "images": [
      "/products/premium/sennheiser-hd-450bt/01.webp",
      "/products/premium/sennheiser-hd-450bt/02.webp",
      "/products/premium/sennheiser-hd-450bt/03.webp"
    ]
  },
  {
    "slug": "jbl-tour-one-m2",
    "name": "JBL Tour One M2",
    "brand": "JBL",
    "category": "audio",
    "price": 419,
    "compareAtPrice": 494,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 1119,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "jbl",
      "jbl-tour-one-m2"
    ],
    "image": "/products/premium/jbl-tour-one-m2/01.webp",
    "images": [
      "/products/premium/jbl-tour-one-m2/01.webp",
      "/products/premium/jbl-tour-one-m2/02.webp",
      "/products/premium/jbl-tour-one-m2/03.webp"
    ]
  },
  {
    "slug": "jbl-live-660nc",
    "name": "JBL Live 660NC",
    "brand": "JBL",
    "category": "audio",
    "price": 454,
    "compareAtPrice": 536,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 1156,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "jbl",
      "jbl-live-660nc"
    ],
    "image": "/products/premium/jbl-live-660nc/01.webp",
    "images": [
      "/products/premium/jbl-live-660nc/01.webp",
      "/products/premium/jbl-live-660nc/02.webp",
      "/products/premium/jbl-live-660nc/03.webp"
    ]
  },
  {
    "slug": "beats-studio-pro",
    "name": "Beats Studio Pro",
    "brand": "Beats",
    "category": "audio",
    "price": 489,
    "compareAtPrice": 577,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 1193,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "beats",
      "beats-studio-pro"
    ],
    "image": "/products/premium/beats-studio-pro/01.webp",
    "images": [
      "/products/premium/beats-studio-pro/01.webp",
      "/products/premium/beats-studio-pro/02.webp",
      "/products/premium/beats-studio-pro/03.webp"
    ]
  },
  {
    "slug": "beats-solo-4",
    "name": "Beats Solo 4",
    "brand": "Beats",
    "category": "audio",
    "price": 464,
    "compareAtPrice": 548,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "On‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 1230,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "beats",
      "beats-solo-4"
    ],
    "image": "/products/premium/beats-solo-4/01.webp",
    "images": [
      "/products/premium/beats-solo-4/01.webp",
      "/products/premium/beats-solo-4/02.webp",
      "/products/premium/beats-solo-4/03.webp"
    ]
  },
  {
    "slug": "audio-technica-ath-m50xbt2",
    "name": "Audio-Technica ATH-M50xBT2",
    "brand": "Audio-Technica",
    "category": "audio",
    "price": 209,
    "compareAtPrice": 247,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 120,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "audio-technica",
      "audio-technica-ath-m50xbt2"
    ],
    "image": "/products/premium/audio-technica-ath-m50xbt2/01.webp",
    "images": [
      "/products/premium/audio-technica-ath-m50xbt2/01.webp",
      "/products/premium/audio-technica-ath-m50xbt2/02.webp",
      "/products/premium/audio-technica-ath-m50xbt2/03.webp"
    ]
  },
  {
    "slug": "anker-soundcore-space-one",
    "name": "Anker Soundcore Space One",
    "brand": "Anker",
    "category": "audio",
    "price": 244,
    "compareAtPrice": 288,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 157,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "anker",
      "anker-soundcore-space-one"
    ],
    "image": "/products/premium/anker-soundcore-space-one/01.webp",
    "images": [
      "/products/premium/anker-soundcore-space-one/01.webp",
      "/products/premium/anker-soundcore-space-one/02.webp",
      "/products/premium/anker-soundcore-space-one/03.webp"
    ]
  },
  {
    "slug": "anker-soundcore-liberty-4",
    "name": "Anker Soundcore Liberty 4",
    "brand": "Anker",
    "category": "audio",
    "price": 219,
    "compareAtPrice": 258,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "True wireless",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 194,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "anker",
      "anker-soundcore-liberty-4"
    ],
    "image": "/products/premium/anker-soundcore-liberty-4/01.webp",
    "images": [
      "/products/premium/anker-soundcore-liberty-4/01.webp",
      "/products/premium/anker-soundcore-liberty-4/02.webp",
      "/products/premium/anker-soundcore-liberty-4/03.webp"
    ]
  },
  {
    "slug": "jabra-elite-10",
    "name": "Jabra Elite 10",
    "brand": "Jabra",
    "category": "audio",
    "price": 254,
    "compareAtPrice": 300,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "True wireless",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 231,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "jabra",
      "jabra-elite-10"
    ],
    "image": "/products/premium/jabra-elite-10/01.webp",
    "images": [
      "/products/premium/jabra-elite-10/01.webp",
      "/products/premium/jabra-elite-10/02.webp",
      "/products/premium/jabra-elite-10/03.webp"
    ]
  },
  {
    "slug": "nothing-ear-2",
    "name": "Nothing Ear (2)",
    "brand": "Nothing",
    "category": "audio",
    "price": 289,
    "compareAtPrice": 341,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "True wireless",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 268,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "nothing",
      "nothing-ear-2"
    ],
    "image": "/products/premium/nothing-ear-2/01.webp",
    "images": [
      "/products/premium/nothing-ear-2/01.webp",
      "/products/premium/nothing-ear-2/02.webp",
      "/products/premium/nothing-ear-2/03.webp"
    ]
  },
  {
    "slug": "shure-aonic-50-gen-2",
    "name": "Shure AONIC 50 Gen 2",
    "brand": "Shure",
    "category": "audio",
    "price": 384,
    "compareAtPrice": 453,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 305,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "shure",
      "shure-aonic-50-gen-2"
    ],
    "image": "/products/premium/shure-aonic-50-gen-2/01.webp",
    "images": [
      "/products/premium/shure-aonic-50-gen-2/01.webp",
      "/products/premium/shure-aonic-50-gen-2/02.webp",
      "/products/premium/shure-aonic-50-gen-2/03.webp"
    ]
  },
  {
    "slug": "bowers-and-wilkins-px7-s2e",
    "name": "Bowers & Wilkins PX7 S2e",
    "brand": "Bowers & Wilkins",
    "category": "audio",
    "price": 419,
    "compareAtPrice": 494,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 342,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "bowers & wilkins",
      "bowers-and-wilkins-px7-s2e"
    ],
    "image": "/products/premium/bowers-and-wilkins-px7-s2e/01.webp",
    "images": [
      "/products/premium/bowers-and-wilkins-px7-s2e/01.webp",
      "/products/premium/bowers-and-wilkins-px7-s2e/02.webp",
      "/products/premium/bowers-and-wilkins-px7-s2e/03.webp"
    ]
  },
  {
    "slug": "marshall-monitor-ii-anc",
    "name": "Marshall Monitor II ANC",
    "brand": "Marshall",
    "category": "audio",
    "price": 454,
    "compareAtPrice": 536,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 379,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "marshall",
      "marshall-monitor-ii-anc"
    ],
    "image": "/products/premium/marshall-monitor-ii-anc/01.webp",
    "images": [
      "/products/premium/marshall-monitor-ii-anc/01.webp",
      "/products/premium/marshall-monitor-ii-anc/02.webp",
      "/products/premium/marshall-monitor-ii-anc/03.webp"
    ]
  },
  {
    "slug": "skullcandy-crusher-anc-2",
    "name": "Skullcandy Crusher ANC 2",
    "brand": "Skullcandy",
    "category": "audio",
    "price": 489,
    "compareAtPrice": 577,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "Over‑ear",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 416,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "skullcandy",
      "skullcandy-crusher-anc-2"
    ],
    "image": "/products/premium/skullcandy-crusher-anc-2/01.webp",
    "images": [
      "/products/premium/skullcandy-crusher-anc-2/01.webp",
      "/products/premium/skullcandy-crusher-anc-2/02.webp",
      "/products/premium/skullcandy-crusher-anc-2/03.webp"
    ]
  },
  {
    "slug": "samsung-galaxy-buds2-pro",
    "name": "Samsung Galaxy Buds2 Pro",
    "brand": "Samsung",
    "category": "audio",
    "price": 464,
    "compareAtPrice": 548,
    "stock": "in",
    "shortDescription": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "description": "Premium listening with comfort-first fit, tuned sound, and modern wireless performance.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative for this class of product and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "High-quality wireless audio",
      "Comfort-focused fit for long sessions",
      "ANC/transparency features (varies by model)",
      "Clear call microphones"
    ],
    "specs": {
      "Type": "True wireless",
      "Noise control": "ANC + transparency (model dependent)",
      "Battery": "Up to 24–50 hours class (varies)",
      "Codecs": "SBC/AAC + optional higher-quality codecs (varies)",
      "Charging": "USB‑C fast charging",
      "Weight": "Lightweight comfort class"
    },
    "whatsInTheBox": [
      "Headphones/earbuds",
      "Charging cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 453,
    "tags": [
      "audio",
      "headphones",
      "earbuds",
      "samsung",
      "samsung-galaxy-buds2-pro"
    ],
    "image": "/products/premium/samsung-galaxy-buds2-pro/01.webp",
    "images": [
      "/products/premium/samsung-galaxy-buds2-pro/01.webp",
      "/products/premium/samsung-galaxy-buds2-pro/02.webp",
      "/products/premium/samsung-galaxy-buds2-pro/03.webp"
    ]
  },
  {
    "slug": "dell-xps-13",
    "name": "Dell XPS 13",
    "brand": "Dell",
    "category": "laptops",
    "price": 899,
    "compareAtPrice": 1025,
    "stock": "in",
    "shortDescription": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Integrated graphics",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 490,
    "tags": [
      "laptop",
      "ultrabook",
      "dell",
      "dell-xps-13"
    ],
    "image": "/products/premium/dell-xps-13/01.webp",
    "images": [
      "/products/premium/dell-xps-13/01.webp",
      "/products/premium/dell-xps-13/02.webp",
      "/products/premium/dell-xps-13/03.webp"
    ]
  },
  {
    "slug": "dell-xps-15",
    "name": "Dell XPS 15",
    "brand": "Dell",
    "category": "laptops",
    "price": 1779,
    "compareAtPrice": 2028,
    "stock": "in",
    "shortDescription": "Creator laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Creator laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Creator-class GPU",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 527,
    "tags": [
      "laptop",
      "creator",
      "dell",
      "dell-xps-15"
    ],
    "image": "/products/premium/dell-xps-15/01.webp",
    "images": [
      "/products/premium/dell-xps-15/01.webp",
      "/products/premium/dell-xps-15/02.webp",
      "/products/premium/dell-xps-15/03.webp"
    ]
  },
  {
    "slug": "apple-macbook-air-13",
    "name": "Apple MacBook Air 13",
    "brand": "Apple",
    "category": "laptops",
    "price": 1079,
    "compareAtPrice": 1230,
    "stock": "in",
    "shortDescription": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Integrated graphics",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 564,
    "tags": [
      "laptop",
      "ultrabook",
      "apple",
      "apple-macbook-air-13"
    ],
    "image": "/products/premium/apple-macbook-air-13/01.webp",
    "images": [
      "/products/premium/apple-macbook-air-13/01.webp",
      "/products/premium/apple-macbook-air-13/02.webp",
      "/products/premium/apple-macbook-air-13/03.webp"
    ]
  },
  {
    "slug": "apple-macbook-pro-14",
    "name": "Apple MacBook Pro 14",
    "brand": "Apple",
    "category": "laptops",
    "price": 2139,
    "compareAtPrice": 2438,
    "stock": "in",
    "shortDescription": "Creator laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Creator laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Creator-class GPU",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 601,
    "tags": [
      "laptop",
      "creator",
      "apple",
      "apple-macbook-pro-14"
    ],
    "image": "/products/premium/apple-macbook-pro-14/01.webp",
    "images": [
      "/products/premium/apple-macbook-pro-14/01.webp",
      "/products/premium/apple-macbook-pro-14/02.webp",
      "/products/premium/apple-macbook-pro-14/03.webp"
    ]
  },
  {
    "slug": "lenovo-thinkpad-x1-carbon",
    "name": "Lenovo ThinkPad X1 Carbon",
    "brand": "Lenovo",
    "category": "laptops",
    "price": 1259,
    "compareAtPrice": 1435,
    "stock": "in",
    "shortDescription": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Integrated graphics",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 638,
    "tags": [
      "laptop",
      "ultrabook",
      "lenovo",
      "lenovo-thinkpad-x1-carbon"
    ],
    "image": "/products/premium/lenovo-thinkpad-x1-carbon/01.webp",
    "images": [
      "/products/premium/lenovo-thinkpad-x1-carbon/01.webp",
      "/products/premium/lenovo-thinkpad-x1-carbon/02.webp",
      "/products/premium/lenovo-thinkpad-x1-carbon/03.webp"
    ]
  },
  {
    "slug": "lenovo-legion-5",
    "name": "Lenovo Legion 5",
    "brand": "Lenovo",
    "category": "laptops",
    "price": 1399,
    "compareAtPrice": 1595,
    "stock": "in",
    "shortDescription": "Gaming laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Gaming laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "16\" high-refresh display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Gaming-class GPU",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 675,
    "tags": [
      "laptop",
      "gaming",
      "lenovo",
      "lenovo-legion-5"
    ],
    "image": "/products/premium/lenovo-legion-5/01.webp",
    "images": [
      "/products/premium/lenovo-legion-5/01.webp",
      "/products/premium/lenovo-legion-5/02.webp",
      "/products/premium/lenovo-legion-5/03.webp"
    ]
  },
  {
    "slug": "asus-rog-zephyrus-g14",
    "name": "ASUS ROG Zephyrus G14",
    "brand": "ASUS",
    "category": "laptops",
    "price": 1549,
    "compareAtPrice": 1766,
    "stock": "low",
    "shortDescription": "Gaming laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Gaming laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "16\" high-refresh display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Gaming-class GPU",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 712,
    "tags": [
      "laptop",
      "gaming",
      "asus",
      "asus-rog-zephyrus-g14"
    ],
    "image": "/products/premium/asus-rog-zephyrus-g14/01.webp",
    "images": [
      "/products/premium/asus-rog-zephyrus-g14/01.webp",
      "/products/premium/asus-rog-zephyrus-g14/02.webp",
      "/products/premium/asus-rog-zephyrus-g14/03.webp"
    ]
  },
  {
    "slug": "asus-zenbook-14",
    "name": "ASUS Zenbook 14",
    "brand": "ASUS",
    "category": "laptops",
    "price": 989,
    "compareAtPrice": 1127,
    "stock": "in",
    "shortDescription": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Integrated graphics",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 749,
    "tags": [
      "laptop",
      "ultrabook",
      "asus",
      "asus-zenbook-14"
    ],
    "image": "/products/premium/asus-zenbook-14/01.webp",
    "images": [
      "/products/premium/asus-zenbook-14/01.webp",
      "/products/premium/asus-zenbook-14/02.webp",
      "/products/premium/asus-zenbook-14/03.webp"
    ]
  },
  {
    "slug": "hp-spectre-x360-14",
    "name": "HP Spectre x360 14",
    "brand": "HP",
    "category": "laptops",
    "price": 1079,
    "compareAtPrice": 1230,
    "stock": "in",
    "shortDescription": "2-in-1 laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "2-in-1 laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Integrated graphics",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 786,
    "tags": [
      "laptop",
      "2-in-1",
      "hp",
      "hp-spectre-x360-14"
    ],
    "image": "/products/premium/hp-spectre-x360-14/01.webp",
    "images": [
      "/products/premium/hp-spectre-x360-14/01.webp",
      "/products/premium/hp-spectre-x360-14/02.webp",
      "/products/premium/hp-spectre-x360-14/03.webp"
    ]
  },
  {
    "slug": "hp-omen-16",
    "name": "HP Omen 16",
    "brand": "HP",
    "category": "laptops",
    "price": 1999,
    "compareAtPrice": 2279,
    "stock": "in",
    "shortDescription": "Gaming laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Gaming laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "16\" high-refresh display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Gaming-class GPU",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 823,
    "tags": [
      "laptop",
      "gaming",
      "hp",
      "hp-omen-16"
    ],
    "image": "/products/premium/hp-omen-16/01.webp",
    "images": [
      "/products/premium/hp-omen-16/01.webp",
      "/products/premium/hp-omen-16/02.webp",
      "/products/premium/hp-omen-16/03.webp"
    ]
  },
  {
    "slug": "acer-swift-3",
    "name": "Acer Swift 3",
    "brand": "Acer",
    "category": "laptops",
    "price": 1259,
    "compareAtPrice": 1435,
    "stock": "in",
    "shortDescription": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Integrated graphics",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 860,
    "tags": [
      "laptop",
      "ultrabook",
      "acer",
      "acer-swift-3"
    ],
    "image": "/products/premium/acer-swift-3/01.webp",
    "images": [
      "/products/premium/acer-swift-3/01.webp",
      "/products/premium/acer-swift-3/02.webp",
      "/products/premium/acer-swift-3/03.webp"
    ]
  },
  {
    "slug": "acer-predator-helios-16",
    "name": "Acer Predator Helios 16",
    "brand": "Acer",
    "category": "laptops",
    "price": 1549,
    "compareAtPrice": 1766,
    "stock": "in",
    "shortDescription": "Gaming laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Gaming laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "16\" high-refresh display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Gaming-class GPU",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 897,
    "tags": [
      "laptop",
      "gaming",
      "acer",
      "acer-predator-helios-16"
    ],
    "image": "/products/premium/acer-predator-helios-16/01.webp",
    "images": [
      "/products/premium/acer-predator-helios-16/01.webp",
      "/products/premium/acer-predator-helios-16/02.webp",
      "/products/premium/acer-predator-helios-16/03.webp"
    ]
  },
  {
    "slug": "msi-stealth-14",
    "name": "MSI Stealth 14",
    "brand": "MSI",
    "category": "laptops",
    "price": 1699,
    "compareAtPrice": 1937,
    "stock": "in",
    "shortDescription": "Gaming laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Gaming laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "16\" high-refresh display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Gaming-class GPU",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 934,
    "tags": [
      "laptop",
      "gaming",
      "msi",
      "msi-stealth-14"
    ],
    "image": "/products/premium/msi-stealth-14/01.webp",
    "images": [
      "/products/premium/msi-stealth-14/01.webp",
      "/products/premium/msi-stealth-14/02.webp",
      "/products/premium/msi-stealth-14/03.webp"
    ]
  },
  {
    "slug": "msi-creator-z16",
    "name": "MSI Creator Z16",
    "brand": "MSI",
    "category": "laptops",
    "price": 1779,
    "compareAtPrice": 2028,
    "stock": "in",
    "shortDescription": "Creator laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Creator laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Creator-class GPU",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 971,
    "tags": [
      "laptop",
      "creator",
      "msi",
      "msi-creator-z16"
    ],
    "image": "/products/premium/msi-creator-z16/01.webp",
    "images": [
      "/products/premium/msi-creator-z16/01.webp",
      "/products/premium/msi-creator-z16/02.webp",
      "/products/premium/msi-creator-z16/03.webp"
    ]
  },
  {
    "slug": "razer-blade-15",
    "name": "Razer Blade 15",
    "brand": "Razer",
    "category": "laptops",
    "price": 1999,
    "compareAtPrice": 2279,
    "stock": "in",
    "shortDescription": "Gaming laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Gaming laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "16\" high-refresh display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Gaming-class GPU",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 1008,
    "tags": [
      "laptop",
      "gaming",
      "razer",
      "razer-blade-15"
    ],
    "image": "/products/premium/razer-blade-15/01.webp",
    "images": [
      "/products/premium/razer-blade-15/01.webp",
      "/products/premium/razer-blade-15/02.webp",
      "/products/premium/razer-blade-15/03.webp"
    ]
  },
  {
    "slug": "samsung-galaxy-book4-pro",
    "name": "Samsung Galaxy Book4 Pro",
    "brand": "Samsung",
    "category": "laptops",
    "price": 1169,
    "compareAtPrice": 1333,
    "stock": "in",
    "shortDescription": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Integrated graphics",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 1045,
    "tags": [
      "laptop",
      "ultrabook",
      "samsung",
      "samsung-galaxy-book4-pro"
    ],
    "image": "/products/premium/samsung-galaxy-book4-pro/01.webp",
    "images": [
      "/products/premium/samsung-galaxy-book4-pro/01.webp",
      "/products/premium/samsung-galaxy-book4-pro/02.webp",
      "/products/premium/samsung-galaxy-book4-pro/03.webp"
    ]
  },
  {
    "slug": "lg-gram-16",
    "name": "LG Gram 16",
    "brand": "LG",
    "category": "laptops",
    "price": 1259,
    "compareAtPrice": 1435,
    "stock": "in",
    "shortDescription": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Integrated graphics",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 1082,
    "tags": [
      "laptop",
      "ultrabook",
      "lg",
      "lg-gram-16"
    ],
    "image": "/products/premium/lg-gram-16/01.webp",
    "images": [
      "/products/premium/lg-gram-16/01.webp",
      "/products/premium/lg-gram-16/02.webp",
      "/products/premium/lg-gram-16/03.webp"
    ]
  },
  {
    "slug": "microsoft-surface-laptop-5",
    "name": "Microsoft Surface Laptop 5",
    "brand": "Microsoft",
    "category": "laptops",
    "price": 1349,
    "compareAtPrice": 1538,
    "stock": "in",
    "shortDescription": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Integrated graphics",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 1119,
    "tags": [
      "laptop",
      "ultrabook",
      "microsoft",
      "microsoft-surface-laptop-5"
    ],
    "image": "/products/premium/microsoft-surface-laptop-5/01.webp",
    "images": [
      "/products/premium/microsoft-surface-laptop-5/01.webp",
      "/products/premium/microsoft-surface-laptop-5/02.webp",
      "/products/premium/microsoft-surface-laptop-5/03.webp"
    ]
  },
  {
    "slug": "framework-laptop-13",
    "name": "Framework Laptop 13",
    "brand": "Framework",
    "category": "laptops",
    "price": 899,
    "compareAtPrice": 1025,
    "stock": "in",
    "shortDescription": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Ultrabook laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Integrated graphics",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 1156,
    "tags": [
      "laptop",
      "ultrabook",
      "framework",
      "framework-laptop-13"
    ],
    "image": "/products/premium/framework-laptop-13/01.webp",
    "images": [
      "/products/premium/framework-laptop-13/01.webp",
      "/products/premium/framework-laptop-13/02.webp",
      "/products/premium/framework-laptop-13/03.webp"
    ]
  },
  {
    "slug": "gigabyte-aero-16",
    "name": "Gigabyte Aero 16",
    "brand": "Gigabyte",
    "category": "laptops",
    "price": 2139,
    "compareAtPrice": 2438,
    "stock": "in",
    "shortDescription": "Creator laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "description": "Creator laptop with premium build, fast SSD storage, and a display tuned for comfort and clarity.",
    "fullDescription": "This product page uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). Specs are representative and may vary by configuration. Prices may vary by region and retailer.",
    "highlights": [
      "Fast SSD storage for quick launches",
      "Comfortable keyboard and large trackpad",
      "Modern wireless performance",
      "Premium chassis and clean design"
    ],
    "specs": {
      "Display": "14–16\" high-resolution display",
      "CPU": "Modern multi-core CPU",
      "GPU": "Creator-class GPU",
      "Memory": "16GB (up to 32GB class)",
      "Storage": "512GB–1TB SSD (varies)",
      "Weight": "~2.7–5.5 lb class (varies)",
      "Ports": "USB‑C + USB‑A + HDMI (varies)",
      "Wireless": "Wi‑Fi 6/6E + Bluetooth 5"
    },
    "whatsInTheBox": [
      "Laptop",
      "Power adapter",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 1193,
    "tags": [
      "laptop",
      "creator",
      "gigabyte",
      "gigabyte-aero-16"
    ],
    "image": "/products/premium/gigabyte-aero-16/01.webp",
    "images": [
      "/products/premium/gigabyte-aero-16/01.webp",
      "/products/premium/gigabyte-aero-16/02.webp",
      "/products/premium/gigabyte-aero-16/03.webp"
    ]
  },
  {
    "slug": "samsung-qled-q80-55-4k-tv",
    "name": "Samsung QLED Q80 55\" 4K TV",
    "brand": "Samsung",
    "category": "tvs",
    "price": 599,
    "compareAtPrice": 719,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "55\"",
      "Panel": "QLED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 1230,
    "tags": [
      "tv",
      "4k",
      "samsung",
      "55in",
      "samsung-qled-q80-55-4k-tv"
    ],
    "image": "/products/premium/samsung-qled-q80-55-4k-tv/01.webp",
    "images": [
      "/products/premium/samsung-qled-q80-55-4k-tv/01.webp",
      "/products/premium/samsung-qled-q80-55-4k-tv/02.webp",
      "/products/premium/samsung-qled-q80-55-4k-tv/03.webp"
    ]
  },
  {
    "slug": "samsung-qled-q90-65-4k-tv",
    "name": "Samsung QLED Q90 65\" 4K TV",
    "brand": "Samsung",
    "category": "tvs",
    "price": 899,
    "compareAtPrice": 1079,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "65\"",
      "Panel": "QLED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 120,
    "tags": [
      "tv",
      "4k",
      "samsung",
      "65in",
      "samsung-qled-q90-65-4k-tv"
    ],
    "image": "/products/premium/samsung-qled-q90-65-4k-tv/01.webp",
    "images": [
      "/products/premium/samsung-qled-q90-65-4k-tv/01.webp",
      "/products/premium/samsung-qled-q90-65-4k-tv/02.webp",
      "/products/premium/samsung-qled-q90-65-4k-tv/03.webp"
    ]
  },
  {
    "slug": "lg-oled-c-series-55-4k-tv",
    "name": "LG OLED C-Series 55\" 4K TV",
    "brand": "LG",
    "category": "tvs",
    "price": 899,
    "compareAtPrice": 1079,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "55\"",
      "Panel": "OLED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 157,
    "tags": [
      "tv",
      "4k",
      "lg",
      "55in",
      "lg-oled-c-series-55-4k-tv"
    ],
    "image": "/products/premium/lg-oled-c-series-55-4k-tv/01.webp",
    "images": [
      "/products/premium/lg-oled-c-series-55-4k-tv/01.webp",
      "/products/premium/lg-oled-c-series-55-4k-tv/02.webp",
      "/products/premium/lg-oled-c-series-55-4k-tv/03.webp"
    ]
  },
  {
    "slug": "lg-oled-g-series-65-4k-tv",
    "name": "LG OLED G-Series 65\" 4K TV",
    "brand": "LG",
    "category": "tvs",
    "price": 1199,
    "compareAtPrice": 1439,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "65\"",
      "Panel": "OLED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 194,
    "tags": [
      "tv",
      "4k",
      "lg",
      "65in",
      "lg-oled-g-series-65-4k-tv"
    ],
    "image": "/products/premium/lg-oled-g-series-65-4k-tv/01.webp",
    "images": [
      "/products/premium/lg-oled-g-series-65-4k-tv/01.webp",
      "/products/premium/lg-oled-g-series-65-4k-tv/02.webp",
      "/products/premium/lg-oled-g-series-65-4k-tv/03.webp"
    ]
  },
  {
    "slug": "sony-bravia-xr-65-4k-tv",
    "name": "Sony BRAVIA XR 65\" 4K TV",
    "brand": "Sony",
    "category": "tvs",
    "price": 1349,
    "compareAtPrice": 1619,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "65\"",
      "Panel": "LED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 231,
    "tags": [
      "tv",
      "4k",
      "sony",
      "65in",
      "sony-bravia-xr-65-4k-tv"
    ],
    "image": "/products/premium/sony-bravia-xr-65-4k-tv/01.webp",
    "images": [
      "/products/premium/sony-bravia-xr-65-4k-tv/01.webp",
      "/products/premium/sony-bravia-xr-65-4k-tv/02.webp",
      "/products/premium/sony-bravia-xr-65-4k-tv/03.webp"
    ]
  },
  {
    "slug": "sony-bravia-x90-75-4k-tv",
    "name": "Sony BRAVIA X90 75\" 4K TV",
    "brand": "Sony",
    "category": "tvs",
    "price": 1749,
    "compareAtPrice": 2099,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "75\"",
      "Panel": "LED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 268,
    "tags": [
      "tv",
      "4k",
      "sony",
      "75in",
      "sony-bravia-x90-75-4k-tv"
    ],
    "image": "/products/premium/sony-bravia-x90-75-4k-tv/01.webp",
    "images": [
      "/products/premium/sony-bravia-x90-75-4k-tv/01.webp",
      "/products/premium/sony-bravia-x90-75-4k-tv/02.webp",
      "/products/premium/sony-bravia-x90-75-4k-tv/03.webp"
    ]
  },
  {
    "slug": "tcl-qled-6-series-55-4k-tv",
    "name": "TCL QLED 6-Series 55\" 4K TV",
    "brand": "TCL",
    "category": "tvs",
    "price": 1499,
    "compareAtPrice": 1799,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "55\"",
      "Panel": "QLED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 305,
    "tags": [
      "tv",
      "4k",
      "tcl",
      "55in",
      "tcl-qled-6-series-55-4k-tv"
    ],
    "image": "/products/premium/tcl-qled-6-series-55-4k-tv/01.webp",
    "images": [
      "/products/premium/tcl-qled-6-series-55-4k-tv/01.webp",
      "/products/premium/tcl-qled-6-series-55-4k-tv/02.webp",
      "/products/premium/tcl-qled-6-series-55-4k-tv/03.webp"
    ]
  },
  {
    "slug": "tcl-qled-7-series-65-4k-tv",
    "name": "TCL QLED 7-Series 65\" 4K TV",
    "brand": "TCL",
    "category": "tvs",
    "price": 749,
    "compareAtPrice": 899,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "65\"",
      "Panel": "QLED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 342,
    "tags": [
      "tv",
      "4k",
      "tcl",
      "65in",
      "tcl-qled-7-series-65-4k-tv"
    ],
    "image": "/products/premium/tcl-qled-7-series-65-4k-tv/01.webp",
    "images": [
      "/products/premium/tcl-qled-7-series-65-4k-tv/01.webp",
      "/products/premium/tcl-qled-7-series-65-4k-tv/02.webp",
      "/products/premium/tcl-qled-7-series-65-4k-tv/03.webp"
    ]
  },
  {
    "slug": "hisense-u8-series-55-4k-tv",
    "name": "Hisense U8 Series 55\" 4K TV",
    "brand": "Hisense",
    "category": "tvs",
    "price": 749,
    "compareAtPrice": 899,
    "stock": "low",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "55\"",
      "Panel": "LED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 379,
    "tags": [
      "tv",
      "4k",
      "hisense",
      "55in",
      "hisense-u8-series-55-4k-tv"
    ],
    "image": "/products/premium/hisense-u8-series-55-4k-tv/01.webp",
    "images": [
      "/products/premium/hisense-u8-series-55-4k-tv/01.webp",
      "/products/premium/hisense-u8-series-55-4k-tv/02.webp",
      "/products/premium/hisense-u8-series-55-4k-tv/03.webp"
    ]
  },
  {
    "slug": "hisense-u7-series-65-4k-tv",
    "name": "Hisense U7 Series 65\" 4K TV",
    "brand": "Hisense",
    "category": "tvs",
    "price": 1049,
    "compareAtPrice": 1259,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "65\"",
      "Panel": "LED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 416,
    "tags": [
      "tv",
      "4k",
      "hisense",
      "65in",
      "hisense-u7-series-65-4k-tv"
    ],
    "image": "/products/premium/hisense-u7-series-65-4k-tv/01.webp",
    "images": [
      "/products/premium/hisense-u7-series-65-4k-tv/01.webp",
      "/products/premium/hisense-u7-series-65-4k-tv/02.webp",
      "/products/premium/hisense-u7-series-65-4k-tv/03.webp"
    ]
  },
  {
    "slug": "vizio-quantum-pro-55-4k-tv",
    "name": "VIZIO Quantum Pro 55\" 4K TV",
    "brand": "VIZIO",
    "category": "tvs",
    "price": 1049,
    "compareAtPrice": 1259,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "55\"",
      "Panel": "LED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 453,
    "tags": [
      "tv",
      "4k",
      "vizio",
      "55in",
      "vizio-quantum-pro-55-4k-tv"
    ],
    "image": "/products/premium/vizio-quantum-pro-55-4k-tv/01.webp",
    "images": [
      "/products/premium/vizio-quantum-pro-55-4k-tv/01.webp",
      "/products/premium/vizio-quantum-pro-55-4k-tv/02.webp",
      "/products/premium/vizio-quantum-pro-55-4k-tv/03.webp"
    ]
  },
  {
    "slug": "vizio-oled-65-4k-tv",
    "name": "VIZIO OLED 65\" 4K TV",
    "brand": "VIZIO",
    "category": "tvs",
    "price": 1349,
    "compareAtPrice": 1619,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "65\"",
      "Panel": "OLED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 490,
    "tags": [
      "tv",
      "4k",
      "vizio",
      "65in",
      "vizio-oled-65-4k-tv"
    ],
    "image": "/products/premium/vizio-oled-65-4k-tv/01.webp",
    "images": [
      "/products/premium/vizio-oled-65-4k-tv/01.webp",
      "/products/premium/vizio-oled-65-4k-tv/02.webp",
      "/products/premium/vizio-oled-65-4k-tv/03.webp"
    ]
  },
  {
    "slug": "philips-4k-ambilight-55-4k-tv",
    "name": "Philips 4K Ambilight 55\" 4K TV",
    "brand": "Philips",
    "category": "tvs",
    "price": 1349,
    "compareAtPrice": 1619,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "55\"",
      "Panel": "LED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 527,
    "tags": [
      "tv",
      "4k",
      "philips",
      "55in",
      "philips-4k-ambilight-55-4k-tv"
    ],
    "image": "/products/premium/philips-4k-ambilight-55-4k-tv/01.webp",
    "images": [
      "/products/premium/philips-4k-ambilight-55-4k-tv/01.webp",
      "/products/premium/philips-4k-ambilight-55-4k-tv/02.webp",
      "/products/premium/philips-4k-ambilight-55-4k-tv/03.webp"
    ]
  },
  {
    "slug": "panasonic-4k-oled-65-4k-tv",
    "name": "Panasonic 4K OLED 65\" 4K TV",
    "brand": "Panasonic",
    "category": "tvs",
    "price": 1649,
    "compareAtPrice": 1979,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "65\"",
      "Panel": "OLED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.3,
    "reviewCount": 564,
    "tags": [
      "tv",
      "4k",
      "panasonic",
      "65in",
      "panasonic-4k-oled-65-4k-tv"
    ],
    "image": "/products/premium/panasonic-4k-oled-65-4k-tv/01.webp",
    "images": [
      "/products/premium/panasonic-4k-oled-65-4k-tv/01.webp",
      "/products/premium/panasonic-4k-oled-65-4k-tv/02.webp",
      "/products/premium/panasonic-4k-oled-65-4k-tv/03.webp"
    ]
  },
  {
    "slug": "sharp-4k-aquos-50-4k-tv",
    "name": "Sharp 4K Aquos 50\" 4K TV",
    "brand": "Sharp",
    "category": "tvs",
    "price": 399,
    "compareAtPrice": 479,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "50\"",
      "Panel": "LED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.4,
    "reviewCount": 601,
    "tags": [
      "tv",
      "4k",
      "sharp",
      "50in",
      "sharp-4k-aquos-50-4k-tv"
    ],
    "image": "/products/premium/sharp-4k-aquos-50-4k-tv/01.webp",
    "images": [
      "/products/premium/sharp-4k-aquos-50-4k-tv/01.webp",
      "/products/premium/sharp-4k-aquos-50-4k-tv/02.webp",
      "/products/premium/sharp-4k-aquos-50-4k-tv/03.webp"
    ]
  },
  {
    "slug": "toshiba-4k-led-43-4k-tv",
    "name": "Toshiba 4K LED 43\" 4K TV",
    "brand": "Toshiba",
    "category": "tvs",
    "price": 549,
    "compareAtPrice": 659,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "43\"",
      "Panel": "LED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 638,
    "tags": [
      "tv",
      "4k",
      "toshiba",
      "43in",
      "toshiba-4k-led-43-4k-tv"
    ],
    "image": "/products/premium/toshiba-4k-led-43-4k-tv/01.webp",
    "images": [
      "/products/premium/toshiba-4k-led-43-4k-tv/01.webp",
      "/products/premium/toshiba-4k-led-43-4k-tv/02.webp",
      "/products/premium/toshiba-4k-led-43-4k-tv/03.webp"
    ]
  },
  {
    "slug": "xiaomi-4k-qled-55-4k-tv",
    "name": "Xiaomi 4K QLED 55\" 4K TV",
    "brand": "Xiaomi",
    "category": "tvs",
    "price": 899,
    "compareAtPrice": 1079,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "55\"",
      "Panel": "QLED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.5,
    "reviewCount": 675,
    "tags": [
      "tv",
      "4k",
      "xiaomi",
      "55in",
      "xiaomi-4k-qled-55-4k-tv"
    ],
    "image": "/products/premium/xiaomi-4k-qled-55-4k-tv/01.webp",
    "images": [
      "/products/premium/xiaomi-4k-qled-55-4k-tv/01.webp",
      "/products/premium/xiaomi-4k-qled-55-4k-tv/02.webp",
      "/products/premium/xiaomi-4k-qled-55-4k-tv/03.webp"
    ]
  },
  {
    "slug": "oneplus-4k-qled-65-4k-tv",
    "name": "OnePlus 4K QLED 65\" 4K TV",
    "brand": "OnePlus",
    "category": "tvs",
    "price": 1199,
    "compareAtPrice": 1439,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "65\"",
      "Panel": "QLED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.6,
    "reviewCount": 712,
    "tags": [
      "tv",
      "4k",
      "oneplus",
      "65in",
      "oneplus-4k-qled-65-4k-tv"
    ],
    "image": "/products/premium/oneplus-4k-qled-65-4k-tv/01.webp",
    "images": [
      "/products/premium/oneplus-4k-qled-65-4k-tv/01.webp",
      "/products/premium/oneplus-4k-qled-65-4k-tv/02.webp",
      "/products/premium/oneplus-4k-qled-65-4k-tv/03.webp"
    ]
  },
  {
    "slug": "samsung-neo-qled-75-4k-tv",
    "name": "Samsung Neo QLED 75\" 4K TV",
    "brand": "Samsung",
    "category": "tvs",
    "price": 1599,
    "compareAtPrice": 1919,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "75\"",
      "Panel": "QLED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.7,
    "reviewCount": 749,
    "tags": [
      "tv",
      "4k",
      "samsung",
      "75in",
      "samsung-neo-qled-75-4k-tv"
    ],
    "image": "/products/premium/samsung-neo-qled-75-4k-tv/01.webp",
    "images": [
      "/products/premium/samsung-neo-qled-75-4k-tv/01.webp",
      "/products/premium/samsung-neo-qled-75-4k-tv/02.webp",
      "/products/premium/samsung-neo-qled-75-4k-tv/03.webp"
    ]
  },
  {
    "slug": "lg-nanocell-50-4k-tv",
    "name": "LG NanoCell 50\" 4K TV",
    "brand": "LG",
    "category": "tvs",
    "price": 1149,
    "compareAtPrice": 1379,
    "stock": "in",
    "shortDescription": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "description": "Crisp 4K picture with premium contrast, modern gaming features, and a clean, minimal design.",
    "fullDescription": "This listing uses unbranded, AI-generated studio imagery (no manufacturer photos, no logos). TV specs are representative for this class and may vary by region and revision. Prices may vary by region and retailer.",
    "highlights": [
      "4K resolution with upscaling",
      "HDR support (varies by model)",
      "Low-latency gaming mode (varies)",
      "Thin-bezel premium design"
    ],
    "specs": {
      "Size": "50\"",
      "Panel": "LED",
      "Resolution": "3840×2160 (4K)",
      "Refresh rate": "60–120Hz class (varies)",
      "HDR": "HDR10/HLG + optional Dolby Vision (varies)",
      "Smart features": "Built-in streaming apps (varies)",
      "Ports": "HDMI (ARC/eARC varies) + USB"
    },
    "whatsInTheBox": [
      "TV",
      "Remote",
      "Stand",
      "Power cable",
      "Quick start guide"
    ],
    "warranty": "1-year limited warranty. Extended coverage available.",
    "shipping": "Ships in 1–2 business days. Free standard shipping over $75.",
    "returns": "30-day returns. Items must be in like-new condition. Prices may vary by region and retailer.",
    "rating": 4.8,
    "reviewCount": 786,
    "tags": [
      "tv",
      "4k",
      "lg",
      "50in",
      "lg-nanocell-50-4k-tv"
    ],
    "image": "/products/premium/lg-nanocell-50-4k-tv/01.webp",
    "images": [
      "/products/premium/lg-nanocell-50-4k-tv/01.webp",
      "/products/premium/lg-nanocell-50-4k-tv/02.webp",
      "/products/premium/lg-nanocell-50-4k-tv/03.webp"
    ]
  }
];

// Sample catalog specs (placeholder): generated for a consistent, realistic demo catalog.
// These are NOT official manufacturer specifications.

function hashToSeed(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, arr: T[]) {
  return arr[Math.floor(rand() * arr.length)]!;
}

function int(rand: () => number, min: number, max: number) {
  return Math.floor(min + rand() * (max - min + 1));
}

function maybe(rand: () => number, p = 0.5) {
  return rand() < p;
}

function categoryLabel(category: Product["category"]) {
  return category === "phones"
    ? "phone"
    : category === "laptops"
      ? "laptop"
      : category === "audio"
        ? "audio"
        : category === "tvs"
          ? "TV"
          : category === "wearables"
            ? "wearable"
            : "accessory";
}

function buildCatalogDetails(p: Product) {
  const rand = mulberry32(hashToSeed(p.slug));

  const tone = pick(rand, [
    "premium",
    "sleek",
    "performance-focused",
    "everyday-ready",
    "creator-friendly",
    "travel-ready",
    "minimalist",
    "studio-grade"
  ]);

  const commonPerks = pick(rand, [
    "fast setup",
    "smooth day-to-day performance",
    "clean design",
    "reliable battery life",
    "balanced thermals",
    "strong connectivity"
  ]);

  if (p.category === "phones") {
    const display = (int(rand, 61, 69) / 10).toFixed(1);
    const refresh = pick(rand, [90, 120, 144]);
    const chipset = pick(rand, [
      "8‑core 5G mobile platform",
      "efficient 6nm-class mobile chipset",
      "performance-tier 5G platform",
      "balanced flagship-class SoC"
    ]);
    const ram = pick(rand, ["6GB", "8GB", "12GB"]);
    const storage = pick(rand, ["128GB", "256GB", "512GB"]);
    const battery = `${int(rand, 4600, 5400)}mAh`;
    const charging = `${pick(rand, [33, 45, 67, 80, 100])}W fast charge (class)`;
    const camera = `${pick(rand, [50, 64, 108])}MP main + ultra‑wide + depth/macro (unbranded)`;
    const os = pick(rand, ["Android (modern release)", "Android (current generation)"]);
    const connectivity = pick(rand, ["5G • Wi‑Fi 6 • BT 5.3", "5G • Wi‑Fi 6E • BT 5.3", "5G • Wi‑Fi 6 • BT 5.2"]);
    const weight = `${int(rand, 176, 214)}g`;

    const shortDescription = `${display}\" ${pick(rand, ["AMOLED-class", "OLED-class", "IPS-class"])}, ${refresh}Hz and ${charging} — a ${tone} ${p.brand} pick built for ${commonPerks}.`;
    const highlights = [
      `${refresh}Hz class display with vivid contrast`,
      `${charging} + ${battery} class battery`,
      `${camera} for crisp everyday shots`
    ];
    const specs: Record<string, string> = {
      Display: `${display}\" ${pick(rand, ["FHD+", "FHD+ class"])}, ${refresh}Hz class`,
      Chipset: chipset,
      RAM: ram,
      Storage: storage,
      Battery: battery,
      Camera: camera,
      OS: os,
      Connectivity: connectivity,
      Weight: weight
    };
    const fullDescription = `${p.name} is a ${tone} ${categoryLabel(p.category)} with a smooth, high-refresh screen and tuned charging/battery balance for daily use. This listing uses sample catalog specs for shopping comparisons (not manufacturer-verified).`;

    return { shortDescription, highlights, specs, fullDescription };
  }

  if (p.category === "laptops") {
    const display = `${pick(rand, [13.3, 14, 15.6, 16]).toFixed(1)}\" ${pick(rand, ["IPS", "OLED", "Mini‑LED"])} (${pick(rand, ["FHD", "QHD", "3K"])})`;
    const cpu = pick(rand, [
      "Intel Core i5/i7 class",
      "Intel Core Ultra class",
      "AMD Ryzen 5/7 class",
      "high-efficiency mobile CPU"
    ]);
    const gpu = pick(rand, ["Integrated graphics", "Integrated + creator acceleration", "RTX‑class discrete GPU (varies)"]);
    const ram = pick(rand, ["8GB", "16GB", "32GB"]);
    const storage = pick(rand, ["512GB SSD", "1TB SSD", "2TB SSD"]);
    const battery = `${int(rand, 52, 86)}Wh`;
    const weight = `${(int(rand, 120, 195) / 100).toFixed(2)}kg`;
    const connectivity = pick(rand, ["Wi‑Fi 6E • BT 5.3", "Wi‑Fi 6 • BT 5.2", "Wi‑Fi 7-ready • BT 5.3"]);

    const shortDescription = `${display}, ${cpu} + ${ram} — a ${tone} ${p.brand} laptop tuned for ${pick(rand, ["workflows", "school", "travel", "creative sessions", "everyday multitasking"])}.`;
    const highlights = [
      `${display} display for sharp text and media`,
      `${ram} memory + ${storage} for fast load times`,
      `${battery} class battery in a ${weight} chassis`
    ];
    const specs: Record<string, string> = {
      Display: display,
      CPU: cpu,
      GPU: gpu,
      RAM: ram,
      Storage: storage,
      Battery: `${battery} (class)`,
      Connectivity: connectivity,
      Weight: weight
    };
    const fullDescription = `${p.name} is a ${tone} laptop designed around responsive performance and a clean, premium feel. Specs shown are sample catalog values for comparison (not official manufacturer specs).`;
    return { shortDescription, highlights, specs, fullDescription };
  }

  if (p.category === "audio") {
    const driver = `${int(rand, 9, 12)}mm drivers`;
    const anc = pick(rand, ["Adaptive ANC", "Hybrid ANC", "ANC with transparency"]);
    const battery = `${int(rand, 6, 11)}h (buds) / ${int(rand, 22, 40)}h (case)`;
    const codec = pick(rand, ["AAC/SBC", "AAC/SBC + high-bitrate mode", "AAC/SBC + multipoint"]);
    const water = pick(rand, ["IPX4", "IPX5", "IP54"]);
    const connectivity = pick(rand, ["Bluetooth 5.3", "Bluetooth 5.2", "Bluetooth 5.4"]);

    const shortDescription = `${anc}, ${driver}, and ${battery} battery — a ${tone} listen built for commutes and focus.`;
    const highlights = [
      `${anc} for quieter environments`,
      `${battery} class battery life`,
      `${water} resistance + ${connectivity}`
    ];
    const specs: Record<string, string> = {
      Drivers: driver,
      "Noise control": anc,
      Battery: `${battery} (class)`,
      Codecs: codec,
      "Water rating": water,
      Connectivity: connectivity
    };
    const fullDescription = `${p.name} delivers a ${tone} sound profile with tuned noise control and reliable daily comfort. Specs shown are sample catalog values for comparison (not official).`;
    return { shortDescription, highlights, specs, fullDescription };
  }

  if (p.category === "wearables") {
    const shape = pick(rand, ["rectangular", "circular"]);
    const display = `${pick(rand, [1.3, 1.4, 1.6]).toFixed(1)}\" ${pick(rand, ["OLED", "AMOLED", "LTPO OLED"])} (${shape})`;
    const battery = `${int(rand, 18, 72)}h typical (class)`;
    const sensors = pick(rand, [
      "HR + SpO₂ + sleep tracking",
      "HR + SpO₂ + stress + sleep",
      "HR + SpO₂ + GPS + sleep"
    ]);
    const water = pick(rand, ["5ATM", "IP68", "5ATM + IP68"]);
    const weight = `${int(rand, 28, 54)}g`;
    const connectivity = pick(rand, ["BT 5.3 + NFC (varies)", "BT 5.2 + GPS", "BT 5.3 + GPS + Wi‑Fi (varies)"]);

    const shortDescription = `${display}, ${sensors}, and ${battery} — a ${tone} wearable for training and everyday health insights.`;
    const highlights = [
      `${sensors} for daily insights`,
      `${water} water resistance`,
      `${battery} battery in a ${weight} body`
    ];
    const specs: Record<string, string> = {
      Display: display,
      Sensors: sensors,
      Battery: battery,
      "Water rating": water,
      Connectivity: connectivity,
      Weight: weight
    };
    const fullDescription = `${p.name} is a ${tone} wearable built around comfort, clear metrics, and all-day convenience. Specs shown are sample catalog values for comparison (not official).`;
    return { shortDescription, highlights, specs, fullDescription };
  }

  if (p.category === "tvs") {
    const size = `${pick(rand, [43, 50, 55, 65, 75])}\"`;
    const panel = pick(rand, ["OLED", "QLED", "LED", "Mini‑LED"]);
    const refresh = pick(rand, ["60Hz class", "120Hz class"]);
    const hdr = pick(rand, ["HDR10/HLG", "HDR10/HLG + Dolby Vision (varies)", "HDR10+ (varies)"]);
    const ports = pick(rand, ["4× HDMI + eARC + 2× USB (varies)", "3× HDMI + eARC + USB (varies)", "4× HDMI (2.1 varies) + USB (varies)"]);
    const weight = `${int(rand, 8, 22)}kg (without stand)`;

    const shortDescription = `${size} 4K ${panel} with ${hdr} and ${refresh} gaming features — a ${tone} living-room centerpiece.`;
    const highlights = [
      `${panel} panel for contrast and color`,
      `${refresh} motion + low-latency mode`,
      `${hdr} support (model-dependent)`
    ];
    const specs: Record<string, string> = {
      Size: size,
      Panel: panel,
      Resolution: "3840×2160 (4K)",
      Refresh: refresh,
      HDR: hdr,
      Ports: ports,
      Weight: weight
    };
    const fullDescription = `${p.name} brings a ${tone} 4K picture with modern smart features and a clean bezel-forward look. Specs shown are sample catalog values for comparison (not official).`;
    return { shortDescription, highlights, specs, fullDescription };
  }

  // accessories
  const material = pick(rand, ["aluminum", "soft-touch polymer", "woven nylon", "vegan leather", "tempered glass"]);
  const compatibility = pick(rand, ["USB‑C", "MagSafe‑style", "universal", "multi-device", "travel-friendly"]);
  const weight = `${int(rand, 45, 380)}g`;
  const shortDescription = `${tone[0]!.toUpperCase()}${tone.slice(1)} ${categoryLabel(p.category)} with ${material} feel and ${compatibility} compatibility—built for ${commonPerks}.`;
  const highlights = [
    `${material} finish with premium touch`,
    `${compatibility} compatibility (varies by device)`,
    `${weight} lightweight design`
  ];
  const specs: Record<string, string> = {
    Material: material,
    Compatibility: compatibility,
    Weight: weight,
    "What it does": pick(rand, ["Protects and enhances daily use", "Adds convenience and portability", "Improves setup and workflow"])
  };
  const fullDescription = `${p.name} is a ${tone} accessory designed to fit cleanly into everyday routines. Specs shown are sample catalog values for comparison (not official).`;
  return { shortDescription, highlights, specs, fullDescription };
}

export const products: Product[] = baseProducts.map((p) => {
  const generated = `/products/generated/${p.slug}.png`;
  const details = buildCatalogDetails(p);
  return {
    ...p,
    ...details,
    description: details.shortDescription,
    image: generated,
    images: [generated, generated, generated]
  };
});

export const rawProducts: Product[] = baseProducts;

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
