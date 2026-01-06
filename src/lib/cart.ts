export type CartVariant = Record<string, string> & { color?: string; storage?: string };
export type CartItem = { slug: string; quantity: number; variant?: CartVariant };

const KEY_V2 = "zenvora_cart_v2";
const KEY_V1 = "zenvora_cart_v1";

function emitCartChange(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("zenvora-cart", { detail: { items } }));
  } catch {
    // no-op
  }
}

function normalizeVariant(variant?: CartVariant) {
  if (!variant) return {} as CartVariant;
  const entries = Object.entries(variant)
    .filter(([, v]) => typeof v === "string" && v.trim().length > 0)
    .map(([k, v]) => [k, v.trim()] as const)
    .sort(([a], [b]) => a.localeCompare(b));
  return Object.fromEntries(entries) as CartVariant;
}

function sameVariant(a?: CartVariant, b?: CartVariant) {
  const na = normalizeVariant(a);
  const nb = normalizeVariant(b);
  const ak = Object.keys(na);
  const bk = Object.keys(nb);
  if (ak.length !== bk.length) return false;
  for (const k of ak) {
    if (na[k] !== nb[k]) return false;
  }
  return true;
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const rawV2 = localStorage.getItem(KEY_V2);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      if (Array.isArray(parsed)) return parsed as CartItem[];
    }

    const rawV1 = localStorage.getItem(KEY_V1);
    if (!rawV1) return [];

    const parsedV1 = JSON.parse(rawV1);
    if (!Array.isArray(parsedV1)) return [];

    // Migrate legacy items (no variants) to the new schema.
    const migrated: CartItem[] = parsedV1
      .filter((it: any) => it && typeof it.slug === "string" && typeof it.quantity === "number")
      .map((it: any) => ({
        slug: it.slug,
        quantity: it.quantity,
        variant: undefined
      }));
    saveCart(migrated);
    return migrated;
  } catch (e) {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_V2, JSON.stringify(items));
  emitCartChange(items);
}

export function addToCart(slug: string, variant?: CartVariant, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex((c) => c.slug === slug && sameVariant(c.variant, variant));
  if (idx === -1) cart.push({ slug, quantity: qty, variant: Object.keys(normalizeVariant(variant)).length ? normalizeVariant(variant) : undefined });
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
