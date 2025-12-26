import { products } from "../../../lib/products";
import Reviews from "../../../components/Reviews";
import { addToCart } from "../../../lib/cart";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return <p>Product not found</p>;
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: 400, height: 300, objectFit: "cover" }} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button className="btn" onClick={() => addToCart(product.slug)} style={{ marginTop: 12 }}>
        Add to cart
      </button>
      <Reviews />
    </div>
  );
}
