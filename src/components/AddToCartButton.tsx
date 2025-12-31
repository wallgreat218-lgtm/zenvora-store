"use client";

import { ShoppingBag } from "lucide-react";
import { addToCart } from "../lib/cart";

export default function AddToCartButton({ slug }: { slug: string }) {
  return (
    <button className="btn" onClick={() => addToCart(slug)}>
      <ShoppingBag className="h-4 w-4" />
      Add to cart
    </button>
  );
}
