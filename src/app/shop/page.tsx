import { products } from "../../lib/products";
import ProductCard from "../../components/ProductCard";

export default function Shop() {
  return (
    <div>
      <h1>Shop</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
