"use client";

import { products } from "../../lib/products";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const cartItems = items.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.id),
  }));

  const subtotal = getTotalPrice(products);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.product?.id,
            name: item.product?.name,
            price: item.product?.price,
            quantity: item.quantity,
          })),
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout is currently in development. Coming soon!");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <Card className="max-w-md mx-auto text-center p-12">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">
              Start Shopping
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const product = item.product;
            if (!product) return null;

            return (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Link href={`/product/${product.slug}`}>
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <Link href={`/product/${product.slug}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">{product.brand}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 hover:bg-muted"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-1 border-x min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-muted"
                            disabled={item.quantity >= product.stockCount}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-lg">
                            ${(product.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${product.price} each
                          </div>
                        </div>
                      </div>

                      {item.quantity >= product.stockCount && (
                        <Badge variant="secondary" className="mt-2">
                          Maximum quantity reached
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <Button
            variant="outline"
            onClick={() => clearCart()}
            className="w-full"
          >
            Clear Cart
          </Button>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg">${total.toFixed(2)}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full mb-3"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-2">Have a promo code?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md border bg-background text-sm"
                  />
                  <Button variant="secondary">Apply</Button>
                </div>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground pt-4 border-t">
                <p>✓ Secure checkout with Stripe</p>
                <p>✓ 30-day money-back guarantee</p>
                <p>✓ Free returns on all orders</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
