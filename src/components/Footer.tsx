import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-background/70 backdrop-blur">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-3">
            <div className="font-display text-lg font-semibold tracking-tight">ZenVora Electronics</div>
            <p className="max-w-md text-sm text-muted-foreground">
              Premium, unbranded studio imagery for safe previews. Fast browsing, modern motion, and a flagship-feel
              shopping experience.
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a className="hover:text-foreground" href="mailto:support@zenvoraelectronics.com">
                  support@zenvoraelectronics.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a className="hover:text-foreground" href="tel:+18007789368672">
                  +1 (800) 778-ZEN-VORA
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Address placeholder • City, ST 00000</span>
              </div>
              <div className="text-xs text-muted-foreground">Mon–Fri 9am–6pm (local time)</div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <a
                aria-label="Twitter"
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-background/70 backdrop-blur transition hover:bg-accent"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                aria-label="Instagram"
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-background/70 backdrop-blur transition hover:bg-accent"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                aria-label="LinkedIn"
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-background/70 backdrop-blur transition hover:bg-accent"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Support</div>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <Link className="hover:text-foreground" href="/contact">
                Contact
              </Link>
              <Link className="hover:text-foreground" href="/faq">
                FAQ
              </Link>
              <Link className="hover:text-foreground" href="/shipping-returns">
                Shipping & returns
              </Link>
              <Link className="hover:text-foreground" href="/refund-policy">
                Refund policy
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Company</div>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <Link className="hover:text-foreground" href="/about">
                About
              </Link>
              <Link className="hover:text-foreground" href="/policies/privacy">
                Privacy
              </Link>
              <Link className="hover:text-foreground" href="/policies/shipping">
                Shipping policy
              </Link>
              <Link className="hover:text-foreground" href="/cart">
                Cart
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ZenVora Electronics. All rights reserved.</span>
          <span>Unbranded imagery • Prices are typical market estimates</span>
        </div>
      </div>
    </footer>
  );
}
