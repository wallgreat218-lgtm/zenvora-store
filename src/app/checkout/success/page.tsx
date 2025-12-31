"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ORDER_KEY = "zenvora_last_order_v1";

type Order = {
  orderId: string;
  email: string;
  name: string;
  address1: string;
  city: string;
  region: string;
  postal: string;
  items: Array<{ slug: string; quantity: number; name: string; price: number }>;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
};

function formatMoney(value: number) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ORDER_KEY);
      setOrder(raw ? (JSON.parse(raw) as Order) : null);
    } catch {
      setOrder(null);
    }
  }, []);

  const created = useMemo(() => {
    if (!order?.createdAt) return null;
    try {
      return new Date(order.createdAt).toLocaleString();
    } catch {
      return null;
    }
  }, [order]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Order confirmed</h1>
        <p className="mt-1 text-sm text-muted-foreground">Thanks for shopping with ZenVora Electronics.</p>
      </div>

      <div className="surface p-6">
        {order ? (
          <div className="space-y-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm">
                <div className="text-muted-foreground">Order ID</div>
                <div className="font-semibold">{order.orderId}</div>
              </div>
              <div className="text-sm">
                <div className="text-muted-foreground">Placed</div>
                <div className="font-medium">{created ?? "—"}</div>
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-background/70 p-4 text-sm backdrop-blur">
              <div className="font-semibold">Shipping to</div>
              <div className="mt-1 text-muted-foreground">{order.name}</div>
              <div className="text-muted-foreground">
                {order.address1}, {order.city}, {order.region} {order.postal}
              </div>
              <div className="mt-2 text-muted-foreground">Confirmation sent to {order.email}</div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold">Items</div>
              <div className="space-y-2">
                {order.items.map((it) => (
                  <div key={it.slug} className="flex items-start justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{it.name}</div>
                      <div className="text-xs text-muted-foreground">Qty {it.quantity}</div>
                    </div>
                    <div className="shrink-0 font-medium">{formatMoney(it.price * it.quantity)}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-border/60 pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatMoney(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? "Free" : formatMoney(order.shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatMoney(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              Order details aren’t available in this browser session.
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/shop" className="btn h-11 px-6">
            Continue shopping
          </Link>
          <Link href="/contact" className="btn-secondary h-11 px-6">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
