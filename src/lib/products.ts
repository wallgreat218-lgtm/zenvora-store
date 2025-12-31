export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  stock?: "in" | "low" | "out";
  image: string;
  images: string[];
  category: "phones" | "laptops" | "audio" | "wearables" | "accessories";
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

export const products: Product[] = [
  {
    slug: "zenvora-nova-phone",
    name: "ZenVora Nova Phone",
    price: 899,
    image: "/products/premium/zenvora-nova-phone-01.webp",
    images: ["/products/premium/zenvora-nova-phone-01.webp", "/products/premium/zenvora-nova-phone-02.webp", "/products/premium/zenvora-nova-phone-03.webp", "/products/premium/zenvora-nova-phone-04.webp"],
    category: "phones",
    shortDescription: "Premium everyday phone with pro-level camera tuning and all-day battery.",
    description: "Premium everyday phone with pro-level camera tuning and all-day battery.",
    fullDescription:
      "Nova Phone is built for fast, fluid daily use—messages, photos, and mobile work—wrapped in a refined glass-and-metal design. A color-accurate display, responsive haptics, and a balanced camera system make it feel flagship without the flagship complexity.",
    highlights: [
      "Bright, color-accurate display with smooth scrolling",
      "Balanced wide + ultra-wide capture with night processing",
      "Fast unlock + secure device encryption",
      "All-day battery with quick top-ups"
    ],
    specs: {
      Display: "6.1\" OLED-class panel",
      Performance: "Octa-core mobile platform",
      Storage: "128GB",
      Cameras: "Dual (wide + ultra-wide)",
      Battery: "All-day, fast-charge support",
      Connectivity: "5G + Wi‑Fi 6 + Bluetooth 5",
      Security: "Biometric unlock"
    },
    whatsInTheBox: ["Nova Phone", "USB‑C cable", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.7,
    reviewCount: 328,
    tags: ["flagship-feel", "camera", "battery"]
  },
  {
    slug: "zenvora-arc-phone-mini",
    name: "ZenVora Arc Phone Mini",
    price: 699,
    image: "/products/premium/zenvora-arc-phone-mini-01.webp",
    images: ["/products/premium/zenvora-arc-phone-mini-01.webp", "/products/premium/zenvora-arc-phone-mini-02.webp", "/products/premium/zenvora-arc-phone-mini-03.webp", "/products/premium/zenvora-arc-phone-mini-04.webp"],
    category: "phones",
    shortDescription: "Compact, premium, and fast—built for one‑hand comfort.",
    description: "Compact, premium, and fast—built for one‑hand comfort.",
    fullDescription:
      "Arc Phone Mini keeps everything you love about a premium phone—crisp display, snappy performance, and great cameras—in a pocket-friendly size. It’s ideal for commuters, creators, and anyone who prefers lightweight comfort.",
    highlights: ["One-hand friendly size", "Fast performance for daily apps", "Clean, premium build", "Quick charge top-ups"],
    specs: {
      Display: "5.8\" OLED-class panel",
      Performance: "High-efficiency mobile platform",
      Storage: "128GB",
      Cameras: "Dual (wide + ultra-wide)",
      Battery: "Up to a full day",
      Connectivity: "5G + Wi‑Fi 6",
      Security: "Biometric unlock"
    },
    whatsInTheBox: ["Arc Phone Mini", "USB‑C cable", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.6,
    reviewCount: 214,
    tags: ["compact", "premium"]
  },
  {
    slug: "zenvora-arc-phone-plus",
    name: "ZenVora Arc Phone Plus",
    price: 999,
    image: "/products/premium/zenvora-arc-phone-plus-01.webp",
    images: ["/products/premium/zenvora-arc-phone-plus-01.webp", "/products/premium/zenvora-arc-phone-plus-02.webp", "/products/premium/zenvora-arc-phone-plus-03.webp", "/products/premium/zenvora-arc-phone-plus-04.webp"],
    category: "phones",
    shortDescription: "Big display, bigger battery—made for streaming, maps, and multitasking.",
    description: "Big display, bigger battery—made for streaming, maps, and multitasking.",
    fullDescription:
      "Arc Phone Plus upgrades your day with a larger, brighter display and a battery designed for long sessions—navigation, video, work chat, and everything between. Enjoy smoother scrolling, richer speakers, and more room to create.",
    highlights: ["Large, vivid display", "Long-lasting battery", "Stereo speaker tuning", "Premium haptics"],
    specs: {
      Display: "6.7\" OLED-class panel",
      Performance: "Octa-core mobile platform",
      Storage: "256GB",
      Cameras: "Dual (wide + ultra-wide)",
      Battery: "Extended, fast-charge support",
      Connectivity: "5G + Wi‑Fi 6E",
      Security: "Biometric unlock"
    },
    whatsInTheBox: ["Arc Phone Plus", "USB‑C cable", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.8,
    reviewCount: 402,
    tags: ["big-screen", "battery"]
  },
  {
    slug: "zenvora-zen-phone-lite",
    name: "ZenVora Zen Phone Lite",
    price: 449,
    image: "/products/premium/zenvora-zen-phone-lite-01.webp",
    images: ["/products/premium/zenvora-zen-phone-lite-01.webp", "/products/premium/zenvora-zen-phone-lite-02.webp", "/products/premium/zenvora-zen-phone-lite-03.webp", "/products/premium/zenvora-zen-phone-lite-04.webp"],
    category: "phones",
    shortDescription: "Best-value essentials: great display, reliable camera, smooth everyday speed.",
    description: "Best-value essentials: great display, reliable camera, smooth everyday speed.",
    fullDescription:
      "Zen Phone Lite is designed to feel premium where it matters—display clarity, system responsiveness, and a dependable camera—while keeping the price grounded. Ideal for students, backups, and smart upgrades.",
    highlights: ["Bright display", "Reliable camera", "Fast app switching", "Great value"],
    specs: {
      Display: "6.1\" OLED-class panel",
      Performance: "Efficient mobile platform",
      Storage: "128GB",
      Cameras: "Dual (wide + ultra-wide)",
      Battery: "All-day",
      Connectivity: "5G + Wi‑Fi 6",
      Security: "Biometric unlock"
    },
    whatsInTheBox: ["Zen Phone Lite", "USB‑C cable", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.5,
    reviewCount: 189,
    tags: ["value", "everyday"]
  },
  {
    slug: "zenvora-zen-phone-max",
    name: "ZenVora Zen Phone Max",
    price: 799,
    image: "/products/premium/zenvora-zen-phone-max-01.webp",
    images: ["/products/premium/zenvora-zen-phone-max-01.webp", "/products/premium/zenvora-zen-phone-max-02.webp", "/products/premium/zenvora-zen-phone-max-03.webp", "/products/premium/zenvora-zen-phone-max-04.webp"],
    category: "phones",
    shortDescription: "Smooth display + strong battery in a sleek, minimal chassis.",
    description: "Smooth display + strong battery in a sleek, minimal chassis.",
    fullDescription:
      "Zen Phone Max pairs a buttery-smooth display with a battery tuned for real life. The result is an easy, premium daily driver for calls, content, and productivity—without constant charging anxiety.",
    highlights: ["Smooth scrolling", "Battery tuned for all-day use", "Clean design", "Fast charge support"],
    specs: {
      Display: "6.5\" OLED-class panel",
      Performance: "Octa-core mobile platform",
      Storage: "256GB",
      Cameras: "Dual (wide + ultra-wide)",
      Battery: "All-day+, fast-charge",
      Connectivity: "5G + Wi‑Fi 6E",
      Security: "Biometric unlock"
    },
    whatsInTheBox: ["Zen Phone Max", "USB‑C cable", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.6,
    reviewCount: 271,
    tags: ["smooth", "battery"]
  },
  {
    slug: "zenvora-travel-phone",
    name: "ZenVora Travel Phone",
    price: 599,
    image: "/products/premium/zenvora-travel-phone-01.webp",
    images: ["/products/premium/zenvora-travel-phone-01.webp", "/products/premium/zenvora-travel-phone-02.webp", "/products/premium/zenvora-travel-phone-03.webp", "/products/premium/zenvora-travel-phone-04.webp"],
    category: "phones",
    shortDescription: "Lightweight, reliable, and optimized for global connectivity.",
    description: "Lightweight, reliable, and optimized for global connectivity.",
    fullDescription:
      "Travel Phone is the no-stress companion for trips and long days out. It’s lightweight, durable-feeling, and tuned for dependable connectivity—maps, translation, and camera moments included.",
    highlights: ["Lightweight build", "Dependable connectivity", "Solid camera for trips", "Easy, clean UI feel"],
    specs: {
      Display: "6.1\" OLED-class panel",
      Performance: "Efficient mobile platform",
      Storage: "128GB",
      Cameras: "Dual (wide + ultra-wide)",
      Battery: "All-day",
      Connectivity: "5G + Wi‑Fi 6",
      Security: "Biometric unlock"
    },
    whatsInTheBox: ["Travel Phone", "USB‑C cable", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.4,
    reviewCount: 97,
    tags: ["travel", "lightweight"]
  },
  {
    slug: "zenvora-airbook-14",
    name: "ZenVora AirBook 14",
    price: 1099,
    image: "/products/premium/zenvora-airbook-14-01.webp",
    images: ["/products/premium/zenvora-airbook-14-01.webp", "/products/premium/zenvora-airbook-14-02.webp", "/products/premium/zenvora-airbook-14-03.webp", "/products/premium/zenvora-airbook-14-04.webp"],
    category: "laptops",
    shortDescription: "Thin-and-light laptop with a crisp display and quiet performance.",
    description: "Thin-and-light laptop with a crisp display and quiet performance.",
    fullDescription:
      "AirBook 14 is a premium daily laptop for work and life—fast boot, silent operation, and a display tuned for long reading sessions. It’s ideal for commuting, remote work, and lightweight creative workflows.",
    highlights: ["Lightweight aluminum-style chassis", "All-day productivity battery", "Comfortable keyboard + large trackpad", "Quiet cooling"],
    specs: {
      Display: "14\" high-resolution display",
      CPU: "Modern efficiency processor",
      Memory: "16GB",
      Storage: "512GB SSD",
      Ports: "USB‑C + USB‑A + audio",
      Wireless: "Wi‑Fi 6 + Bluetooth 5",
      Weight: "~3.1 lb class"
    },
    whatsInTheBox: ["AirBook 14", "USB‑C power adapter", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 2–3 business days. Free standard shipping over $75.",
    rating: 4.7,
    reviewCount: 156,
    tags: ["thin-light", "work"]
  },
  {
    slug: "zenvora-studiobook-16",
    name: "ZenVora StudioBook 16",
    price: 1699,
    image: "/products/premium/zenvora-studiobook-16-01.webp",
    images: ["/products/premium/zenvora-studiobook-16-01.webp", "/products/premium/zenvora-studiobook-16-02.webp", "/products/premium/zenvora-studiobook-16-03.webp", "/products/premium/zenvora-studiobook-16-04.webp"],
    category: "laptops",
    shortDescription: "Creator-focused 16\" workstation laptop with a color-accurate display.",
    description: "Creator-focused 16\" workstation laptop with a color-accurate display.",
    fullDescription:
      "StudioBook 16 is tuned for creative work—timelines, layers, and multitasking—without compromising the premium feel. Expect a comfortable keyboard, a spacious trackpad, and a display built for detail.",
    highlights: ["Large 16\" display for timelines and multitasking", "Fast SSD storage", "Thermal tuning for sustained performance", "Premium build"],
    specs: {
      Display: "16\" color-accurate display",
      CPU: "High-performance processor",
      Memory: "32GB",
      Storage: "1TB SSD",
      Graphics: "Creator-class graphics",
      Ports: "USB‑C + HDMI + audio",
      Wireless: "Wi‑Fi 6E"
    },
    whatsInTheBox: ["StudioBook 16", "Power adapter", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 2–3 business days. Free standard shipping over $75.",
    rating: 4.8,
    reviewCount: 92,
    tags: ["creator", "performance"]
  }
  ,

  {
    slug: "zenvora-commutebook-13",
    name: "ZenVora CommuteBook 13",
    price: 999,
    image: "/products/premium/zenvora-commutebook-13-01.webp",
    images: ["/products/premium/zenvora-commutebook-13-01.webp", "/products/premium/zenvora-commutebook-13-02.webp", "/products/premium/zenvora-commutebook-13-03.webp", "/products/premium/zenvora-commutebook-13-04.webp"],
    category: "laptops",
    shortDescription: "Ultra-portable 13\" laptop built for travel days and coffee shops.",
    description: "Ultra-portable 13\" laptop built for travel days and coffee shops.",
    fullDescription:
      "CommuteBook 13 is for people who move. It starts fast, feels premium, and stays cool and quiet under everyday workloads—notes, docs, and dozens of browser tabs.",
    highlights: ["Compact 13\" footprint", "Quiet operation", "Battery tuned for portability", "Strong build quality"],
    specs: {
      Display: "13\" high-resolution display",
      CPU: "Modern efficiency processor",
      Memory: "16GB",
      Storage: "512GB SSD",
      Ports: "USB‑C + audio",
      Wireless: "Wi‑Fi 6 + Bluetooth 5"
    },
    whatsInTheBox: ["CommuteBook 13", "USB‑C power adapter", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 2–3 business days. Free standard shipping over $75.",
    rating: 4.6,
    reviewCount: 118,
    tags: ["portable", "student"]
  },
  {
    slug: "zenvora-gamerbook-15",
    name: "ZenVora GamerBook 15",
    price: 1499,
    image: "/products/premium/zenvora-gamerbook-15-01.webp",
    images: ["/products/premium/zenvora-gamerbook-15-01.webp", "/products/premium/zenvora-gamerbook-15-02.webp", "/products/premium/zenvora-gamerbook-15-03.webp", "/products/premium/zenvora-gamerbook-15-04.webp"],
    category: "laptops",
    shortDescription: "High-refresh gaming laptop with balanced thermals and fast storage.",
    description: "High-refresh gaming laptop with balanced thermals and fast storage.",
    fullDescription:
      "GamerBook 15 delivers smooth gameplay, quick load times, and a premium chassis that looks clean on a desk. It’s tuned for sustained performance and comfortable long sessions.",
    highlights: ["High-refresh display for smoother play", "Fast SSD + ample memory", "Thermal tuning for sustained sessions", "Bold but tasteful design"],
    specs: {
      Display: "15\" high-refresh display",
      CPU: "High-performance processor",
      Memory: "16GB",
      Storage: "1TB SSD",
      Graphics: "Gaming-class graphics",
      Ports: "USB‑C + HDMI + USB‑A",
      Wireless: "Wi‑Fi 6E"
    },
    whatsInTheBox: ["GamerBook 15", "Power adapter", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 2–3 business days. Free standard shipping over $75.",
    rating: 4.7,
    reviewCount: 76,
    tags: ["gaming", "high-refresh"]
  },
  {
    slug: "zenvora-flexbook-14",
    name: "ZenVora FlexBook 14",
    price: 1249,
    image: "/products/premium/zenvora-flexbook-14-01.webp",
    images: ["/products/premium/zenvora-flexbook-14-01.webp", "/products/premium/zenvora-flexbook-14-02.webp", "/products/premium/zenvora-flexbook-14-03.webp", "/products/premium/zenvora-flexbook-14-04.webp"],
    category: "laptops",
    shortDescription: "Versatile 2-in-1 laptop for notes, sketches, and everyday work.",
    description: "Versatile 2-in-1 laptop for notes, sketches, and everyday work.",
    fullDescription:
      "FlexBook 14 adapts to your flow—laptop mode for writing, stand mode for video, and tablet mode for markup. It’s a premium all-rounder with a crisp display and a comfortable keyboard.",
    highlights: ["Flexible 2‑in‑1 hinge", "Crisp display for reading and notes", "Premium build and trackpad", "Quick wake + fast storage"],
    specs: {
      Display: "14\" touch display",
      CPU: "Modern efficiency processor",
      Memory: "16GB",
      Storage: "512GB SSD",
      Hinge: "360° convertible",
      Ports: "USB‑C + USB‑A + audio",
      Wireless: "Wi‑Fi 6"
    },
    whatsInTheBox: ["FlexBook 14", "USB‑C power adapter", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 2–3 business days. Free standard shipping over $75.",
    rating: 4.5,
    reviewCount: 63,
    tags: ["2-in-1", "notes"]
  },

  {
    slug: "zenvora-aurora-anc-headphones",
    name: "ZenVora Aurora ANC Headphones",
    price: 249,
    image: "/products/premium/zenvora-aurora-anc-headphones-01.webp",
    images: ["/products/premium/zenvora-aurora-anc-headphones-01.webp", "/products/premium/zenvora-aurora-anc-headphones-02.webp", "/products/premium/zenvora-aurora-anc-headphones-03.webp", "/products/premium/zenvora-aurora-anc-headphones-04.webp"],
    category: "audio",
    shortDescription: "Comfort-first over-ear headphones with deep noise reduction and warm tuning.",
    description: "Comfort-first over-ear headphones with deep noise reduction and warm tuning.",
    fullDescription:
      "Aurora ANC is tuned for focus—clean mids, controlled bass, and confident noise reduction for commutes and open offices. Plush ear cushions and a balanced clamp make long sessions easy.",
    highlights: ["Active noise cancellation", "All-day comfort fit", "Fast pairing + stable wireless", "Foldable travel-ready design"],
    specs: {
      Type: "Over‑ear",
      NoiseControl: "ANC + transparency",
      Battery: "Up to 30 hours class",
      Microphones: "Beamforming voice capture",
      Codec: "High-quality wireless audio",
      Charging: "USB‑C"
    },
    whatsInTheBox: ["Aurora ANC Headphones", "USB‑C charging cable", "Soft travel pouch"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.7,
    reviewCount: 544,
    tags: ["anc", "comfort"]
  },
  {
    slug: "zenvora-pulse-earbuds",
    name: "ZenVora Pulse Earbuds",
    price: 129,
    image: "/products/premium/zenvora-pulse-earbuds-01.webp",
    images: ["/products/premium/zenvora-pulse-earbuds-01.webp", "/products/premium/zenvora-pulse-earbuds-02.webp", "/products/premium/zenvora-pulse-earbuds-03.webp", "/products/premium/zenvora-pulse-earbuds-04.webp"],
    category: "audio",
    shortDescription: "Pocketable true wireless earbuds with clear calls and punchy sound.",
    description: "Pocketable true wireless earbuds with clear calls and punchy sound.",
    fullDescription:
      "Pulse Earbuds focus on what matters: a secure fit, clean sound, and reliable calls. The compact charging case is designed for everyday carry.",
    highlights: ["Secure-fit in-ear design", "Clear call microphones", "Fast charge case", "Balanced tuning"],
    specs: {
      Type: "True wireless",
      Battery: "Up to 6 hours + case class",
      Controls: "Touch controls",
      Charging: "USB‑C",
      WaterResistance: "Sweat resistant"
    },
    whatsInTheBox: ["Pulse Earbuds", "Charging case", "USB‑C cable", "3 ear tip sizes"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.6,
    reviewCount: 811,
    tags: ["earbuds", "calls"]
  },
  {
    slug: "zenvora-studio-speaker",
    name: "ZenVora Studio Speaker",
    price: 179,
    image: "/products/premium/zenvora-studio-speaker-01.webp",
    images: ["/products/premium/zenvora-studio-speaker-01.webp", "/products/premium/zenvora-studio-speaker-02.webp", "/products/premium/zenvora-studio-speaker-03.webp", "/products/premium/zenvora-studio-speaker-04.webp"],
    category: "audio",
    shortDescription: "Desktop speaker with room-filling sound and a clean, minimal look.",
    description: "Desktop speaker with room-filling sound and a clean, minimal look.",
    fullDescription:
      "Studio Speaker is designed for modern desks. It delivers clear vocals, tight bass, and smooth highs—great for music, podcasts, and video.",
    highlights: ["Room-filling sound", "Minimal desk-friendly footprint", "Simple controls", "Stable wireless"],
    specs: {
      Type: "Wireless speaker",
      Power: "Room-filling output class",
      Inputs: "Bluetooth + AUX",
      Controls: "Top dial controls",
      PowerSource: "AC powered"
    },
    whatsInTheBox: ["Studio Speaker", "Power cable", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.5,
    reviewCount: 207,
    tags: ["speaker", "desk"]
  },
  {
    slug: "zenvora-cinema-soundbar",
    name: "ZenVora Cinema Soundbar",
    price: 299,
    image: "/products/premium/zenvora-cinema-soundbar-01.webp",
    images: ["/products/premium/zenvora-cinema-soundbar-01.webp", "/products/premium/zenvora-cinema-soundbar-02.webp", "/products/premium/zenvora-cinema-soundbar-03.webp", "/products/premium/zenvora-cinema-soundbar-04.webp"],
    category: "audio",
    shortDescription: "Slim soundbar that upgrades TV clarity without the clutter.",
    description: "Slim soundbar that upgrades TV clarity without the clutter.",
    fullDescription:
      "Cinema Soundbar delivers clearer dialogue, wider stereo separation, and better bass presence than built-in TV speakers—while keeping setup simple.",
    highlights: ["Clear dialogue tuning", "Simple setup", "Wide stereo staging", "Minimal footprint"],
    specs: {
      Channels: "2.1 class",
      Inputs: "HDMI ARC + Optical",
      Modes: "Movie / Music / Voice",
      Mounting: "Wall-mount ready"
    },
    whatsInTheBox: ["Cinema Soundbar", "Power cable", "HDMI cable", "Mounting guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 2–3 business days. Free standard shipping over $75.",
    rating: 4.6,
    reviewCount: 143,
    tags: ["tv", "soundbar"]
  },
  {
    slug: "zenvora-comms-gaming-headset",
    name: "ZenVora Comms Gaming Headset",
    price: 99,
    image: "/products/premium/zenvora-comms-gaming-headset-01.webp",
    images: ["/products/premium/zenvora-comms-gaming-headset-01.webp", "/products/premium/zenvora-comms-gaming-headset-02.webp", "/products/premium/zenvora-comms-gaming-headset-03.webp", "/products/premium/zenvora-comms-gaming-headset-04.webp"],
    category: "audio",
    shortDescription: "Comfortable headset with clear mic capture for calls and gaming.",
    description: "Comfortable headset with clear mic capture for calls and gaming.",
    fullDescription:
      "Comms Headset is tuned for voice clarity and comfort. It’s great for work calls and late-night sessions, with a clean look that fits any setup.",
    highlights: ["Clear voice mic", "Comfort padding for long sessions", "Simple controls", "Balanced audio"],
    specs: {
      Type: "Over‑ear headset",
      Mic: "Boom mic",
      Connection: "Wired (USB-C/3.5mm class)",
      Controls: "In-line"
    },
    whatsInTheBox: ["Comms Headset", "Audio cable", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.4,
    reviewCount: 388,
    tags: ["gaming", "mic"]
  },

  {
    slug: "zenvora-orbit-smartwatch",
    name: "ZenVora Orbit Smartwatch",
    price: 219,
    image: "/products/premium/zenvora-orbit-smartwatch-01.webp",
    images: ["/products/premium/zenvora-orbit-smartwatch-01.webp", "/products/premium/zenvora-orbit-smartwatch-02.webp", "/products/premium/zenvora-orbit-smartwatch-03.webp", "/products/premium/zenvora-orbit-smartwatch-04.webp"],
    category: "wearables",
    shortDescription: "Premium smartwatch for fitness, notifications, and daily routines.",
    description: "Premium smartwatch for fitness, notifications, and daily routines.",
    fullDescription:
      "Orbit Smartwatch keeps you connected without living on your phone. It’s designed for comfort and quick glances—workouts, timers, calendar, and notifications.",
    highlights: ["Comfortable all-day wear", "Fitness and activity tracking", "Bright display", "Fast charging"],
    specs: {
      Display: "Bright always-on class",
      Health: "Activity + sleep tracking",
      WaterResistance: "Everyday water resistance",
      Battery: "Up to 2 days class",
      Charging: "Magnetic charger"
    },
    whatsInTheBox: ["Orbit Smartwatch", "Magnetic charging cable", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.6,
    reviewCount: 504,
    tags: ["watch", "fitness"]
  },
  {
    slug: "zenvora-band-pro",
    name: "ZenVora Band Pro",
    price: 79,
    image: "/products/premium/zenvora-band-pro-01.webp",
    images: ["/products/premium/zenvora-band-pro-01.webp", "/products/premium/zenvora-band-pro-02.webp", "/products/premium/zenvora-band-pro-03.webp", "/products/premium/zenvora-band-pro-04.webp"],
    category: "wearables",
    shortDescription: "Lightweight fitness band with clean metrics and week-long comfort.",
    description: "Lightweight fitness band with clean metrics and week-long comfort.",
    fullDescription:
      "Band Pro is simple, light, and accurate—perfect for tracking movement, sleep, and daily streaks. The display is designed to be glanceable in sunlight and comfortable at night.",
    highlights: ["Lightweight, comfortable strap", "Clear daily metrics", "Fast sync", "Long battery"],
    specs: {
      Display: "Slim AMOLED-class",
      Health: "Steps + sleep",
      Battery: "Up to 7 days class",
      WaterResistance: "Everyday water resistance",
      Charging: "USB charging"
    },
    whatsInTheBox: ["Band Pro", "Charging cable", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.4,
    reviewCount: 612,
    tags: ["fitness", "value"]
  },
  {
    slug: "zenvora-orbit-strap-kit",
    name: "ZenVora Orbit Strap Kit",
    price: 39,
    image: "/products/premium/zenvora-orbit-strap-kit-01.webp",
    images: ["/products/premium/zenvora-orbit-strap-kit-01.webp", "/products/premium/zenvora-orbit-strap-kit-02.webp", "/products/premium/zenvora-orbit-strap-kit-03.webp", "/products/premium/zenvora-orbit-strap-kit-04.webp"],
    category: "wearables",
    shortDescription: "Soft-touch strap kit to refresh your smartwatch look.",
    description: "Soft-touch strap kit to refresh your smartwatch look.",
    fullDescription:
      "Swap your look in seconds. Orbit Strap Kit includes two premium, soft-touch straps designed for comfort and a clean silhouette.",
    highlights: ["Soft-touch finish", "Quick swap pins", "Sweat-friendly", "Two straps included"],
    specs: {
      Compatibility: "Standard watch lugs",
      Material: "Soft-touch silicone",
      Size: "Adjustable",
      Included: "2 straps"
    },
    whatsInTheBox: ["2x straps", "Quick start guide"],
    warranty: "90-day accessory warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.5,
    reviewCount: 88,
    tags: ["strap", "accessory"]
  },
  {
    slug: "zenvora-motion-wearable",
    name: "ZenVora Motion Wearable",
    price: 119,
    image: "/products/premium/zenvora-motion-wearable-01.webp",
    images: ["/products/premium/zenvora-motion-wearable-01.webp", "/products/premium/zenvora-motion-wearable-02.webp", "/products/premium/zenvora-motion-wearable-03.webp", "/products/premium/zenvora-motion-wearable-04.webp"],
    category: "wearables",
    shortDescription: "Low-profile wearable designed for all-day tracking and comfort.",
    description: "Low-profile wearable designed for all-day tracking and comfort.",
    fullDescription:
      "Motion Wearable is minimal by design: subtle on the body, powerful in its metrics. Great for people who prefer a low-profile look without losing tracking.",
    highlights: ["Low-profile comfort", "Daily activity tracking", "Fast charging", "Minimal design"],
    specs: {
      Fit: "Lightweight comfort",
      Sensors: "Activity tracking",
      Battery: "Multi-day class",
      Charging: "Magnetic charger"
    },
    whatsInTheBox: ["Motion Wearable", "Charging cable", "Quick start guide"],
    warranty: "1-year limited hardware warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.3,
    reviewCount: 141,
    tags: ["minimal", "tracking"]
  },

  {
    slug: "zenvora-keyboard-pro",
    name: "ZenVora Keyboard Pro",
    price: 139,
    image: "/products/premium/zenvora-keyboard-pro-01.webp",
    images: ["/products/premium/zenvora-keyboard-pro-01.webp", "/products/premium/zenvora-keyboard-pro-02.webp", "/products/premium/zenvora-keyboard-pro-03.webp", "/products/premium/zenvora-keyboard-pro-04.webp"],
    category: "accessories",
    shortDescription: "Premium mechanical-feel keyboard with a clean layout and quiet stabilizers.",
    description: "Premium mechanical-feel keyboard with a clean layout and quiet stabilizers.",
    fullDescription:
      "Keyboard Pro is designed for a crisp, confident typing feel without the harsh noise. The layout is clean, the keys are consistent, and the overall look is premium on any desk.",
    highlights: ["Premium typing feel", "Quiet stabilizers", "Desk-ready minimalist design", "Stable wireless"],
    specs: {
      Layout: "Compact full row",
      Connection: "Wireless + USB",
      Backlight: "Soft white",
      Battery: "Weeks class",
      Compatibility: "Windows / macOS"
    },
    whatsInTheBox: ["Keyboard Pro", "USB cable", "Quick start guide"],
    warranty: "1-year limited accessory warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.7,
    reviewCount: 233,
    tags: ["keyboard", "desk"]
  },
  {
    slug: "zenvora-mouse-air",
    name: "ZenVora Mouse Air",
    price: 59,
    image: "/products/premium/zenvora-mouse-air-01.webp",
    images: ["/products/premium/zenvora-mouse-air-01.webp", "/products/premium/zenvora-mouse-air-02.webp", "/products/premium/zenvora-mouse-air-03.webp", "/products/premium/zenvora-mouse-air-04.webp"],
    category: "accessories",
    shortDescription: "Feather-light wireless mouse with precise tracking and smooth glide.",
    description: "Feather-light wireless mouse with precise tracking and smooth glide.",
    fullDescription:
      "Mouse Air is built for long days—light in hand, stable on the desk, and responsive across surfaces. It’s the kind of tool you forget about because it just works.",
    highlights: ["Precise sensor tuning", "Comfortable grip", "Quiet clicks", "Long battery life"],
    specs: {
      Connection: "Wireless + USB",
      Sensor: "High-precision optical",
      Battery: "Months class",
      Weight: "Lightweight class"
    },
    whatsInTheBox: ["Mouse Air", "USB receiver", "Quick start guide"],
    warranty: "1-year limited accessory warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.6,
    reviewCount: 517,
    tags: ["mouse", "wireless"]
  },
  {
    slug: "zenvora-power-65w",
    name: "ZenVora Power 65W Charger",
    price: 39,
    image: "/products/premium/zenvora-power-65w-01.webp",
    images: ["/products/premium/zenvora-power-65w-01.webp", "/products/premium/zenvora-power-65w-02.webp", "/products/premium/zenvora-power-65w-03.webp", "/products/premium/zenvora-power-65w-04.webp"],
    category: "accessories",
    shortDescription: "Compact 65W USB‑C charger for laptops, tablets, and phones.",
    description: "Compact 65W USB‑C charger for laptops, tablets, and phones.",
    fullDescription:
      "Power 65W is a compact fast charger designed to simplify your bag—one adapter for your phone and your laptop. It delivers stable power and stays cool under load.",
    highlights: ["65W fast charging", "Compact travel footprint", "Stable power delivery", "USB‑C output"],
    specs: {
      Output: "Up to 65W",
      Ports: "USB‑C",
      Compatibility: "Laptops / tablets / phones",
      Input: "100–240V travel ready"
    },
    whatsInTheBox: ["Power 65W Charger", "Quick start guide"],
    warranty: "1-year limited accessory warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.7,
    reviewCount: 309,
    tags: ["charger", "travel"]
  },
  {
    slug: "zenvora-braided-usbc-cable",
    name: "ZenVora Braided USB‑C Cable",
    price: 19,
    image: "/products/premium/zenvora-braided-usbc-cable-01.webp",
    images: ["/products/premium/zenvora-braided-usbc-cable-01.webp", "/products/premium/zenvora-braided-usbc-cable-02.webp", "/products/premium/zenvora-braided-usbc-cable-03.webp", "/products/premium/zenvora-braided-usbc-cable-04.webp"],
    category: "accessories",
    shortDescription: "Soft-touch braided USB‑C cable designed for daily durability.",
    description: "Soft-touch braided USB‑C cable designed for daily durability.",
    fullDescription:
      "A premium cable you’ll actually enjoy using. The braided jacket reduces tangles, the connectors are reinforced, and the overall feel matches a clean desk or travel kit.",
    highlights: ["Braided jacket for durability", "Reinforced connectors", "Fast charge + data", "Tangle-resistant"],
    specs: {
      Length: "1.5m",
      Connector: "USB‑C to USB‑C",
      Charging: "Fast-charge compatible",
      Data: "High-speed data"
    },
    whatsInTheBox: ["Braided USB‑C Cable"],
    warranty: "1-year limited accessory warranty.",
    shipping: "Ships in 1–2 business days. Free standard shipping over $75.",
    rating: 4.6,
    reviewCount: 901,
    tags: ["cable", "everyday"]
  }
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
