"use client";
import Link from "next/link";
import { Product } from "../lib/products";
import { useCart } from "../lib/store";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  
  return (
    <div style={{ border: "1px solid #ddd", padding: 12 }}>
      <Link href={`/product/${product.slug}`}>
        <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
        <h3>{product.name}</h3>
      </Link>
      <p>${product.price}</p>
      <button onClick={() => addItem(product.id, product.slug)} style={{ marginTop: 8 }}>
        Add to cart
      </button>
    </div>
  );
}
