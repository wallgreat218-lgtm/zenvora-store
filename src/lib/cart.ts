export type CartItem = { slug: string; quantity: number };

const KEY = "zenvora_cart_v1";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(slug: string, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex((c) => c.slug === slug);
  if (idx === -1) cart.push({ slug, quantity: qty });
  else cart[idx].quantity += qty;
  saveCart(cart);
}

export function removeFromCart(slug: string) {
  const cart = getCart().filter((c) => c.slug !== slug);
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}
