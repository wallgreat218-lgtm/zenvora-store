export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  description?: string;
};

export const products: Product[] = [
  {
    slug: "iphone15",
    name: "iPhone 15",
    price: 999,
    image: "/products/iphone15.svg",
    description: "Latest iPhone 15"
  },
  {
    slug: "galaxy-s24",
    name: "Galaxy S24",
    price: 899,
    image: "/products/galaxy-s24.svg",
    description: "Samsung Galaxy S24"
  },
  {
    slug: "dell-laptop",
    name: "Dell Laptop",
    price: 1199,
    image: "/products/dell-laptop.svg",
    description: "Powerful Dell laptop"
  },
  {
    slug: "hp-desktop",
    name: "HP Desktop",
    price: 799,
    image: "/products/hp-desktop.svg",
    description: "Reliable HP desktop"
  },
  {
    slug: "sony-tv",
    name: "Sony TV",
    price: 699,
    image: "/products/sony-tv.svg",
    description: "Crystal clear Sony TV"
  },
  {
    slug: "logitech-mouse",
    name: "Logitech Mouse",
    price: 49,
    image: "/products/logitech-mouse.svg",
    description: "Ergonomic mouse"
  },
  {
    slug: "keyboard",
    name: "Mechanical Keyboard",
    price: 129,
    image: "/products/keyboard.svg",
    description: "Tactile mechanical keyboard"
  },
  {
    slug: "headphones",
    name: "Wireless Headphones",
    price: 199,
    image: "/products/headphones.svg",
    description: "Noise-cancelling headphones"
  }
];
