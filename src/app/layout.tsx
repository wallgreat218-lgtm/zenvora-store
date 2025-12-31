import "./globals.css";
import Header from "../components/Header";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Zenvora Electronics - Premium Tech & Electronics Store",
  description: "Discover the latest smartphones, laptops, audio equipment, wearables, and accessories at Zenvora Electronics. Premium quality, competitive prices, and exceptional service.",
  keywords: "electronics, smartphones, laptops, headphones, smartwatches, tech accessories",
  openGraph: {
    title: "Zenvora Electronics",
    description: "Premium Tech & Electronics Store",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="zenvora-theme">
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="border-t bg-muted/50 py-12 mt-24">
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">Zenvora Electronics</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium electronics and tech accessories for modern living.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Shop</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="/shop?category=Phones" className="hover:text-primary">Phones</a></li>
                    <li><a href="/shop?category=Laptops" className="hover:text-primary">Laptops</a></li>
                    <li><a href="/shop?category=Audio" className="hover:text-primary">Audio</a></li>
                    <li><a href="/shop?category=Wearables" className="hover:text-primary">Wearables</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="/policies/shipping" className="hover:text-primary">Shipping Info</a></li>
                    <li><a href="/policies/refund" className="hover:text-primary">Returns & Refunds</a></li>
                    <li><a href="/policies/privacy" className="hover:text-primary">Privacy Policy</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Trust & Security</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>🔒 Secure Payments</p>
                    <p>🚚 Fast Shipping</p>
                    <p>✓ 30-Day Warranty</p>
                  </div>
                </div>
              </div>
              <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                © 2024 Zenvora Electronics. All rights reserved.
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
