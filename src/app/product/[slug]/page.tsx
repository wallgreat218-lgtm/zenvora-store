import { notFound } from "next/navigation";
import StoreShell from "../../../components/store/StoreShell";
import { products } from "../../../lib/products";
import ProductDetailClient from "./ProductDetailClient";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();
  return (
    <StoreShell title={product.title} subtitle={product.subtitle}>
      <ProductDetailClient product={product} />
    </StoreShell>
  );
}
