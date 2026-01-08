import "./globals.css";

import type { Metadata } from "next";
import OldLogoWatermark from "../components/OldLogoWatermark";

const siteUrl = new URL("https://www.zenvoraelectronics.store/");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Zenvora Electronics | Premium Tech Store",
    template: "%s | Zenvora Electronics"
  },
  description:
    "Shop premium electronics: smartphones, laptops, TVs, and accessories with clear specs, secure checkout, and fast support.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Zenvora Electronics",
    title: "Zenvora Electronics | Premium Tech Store",
    description:
      "Premium electronics with clear specs, secure checkout, and fast support. Shop smartphones, laptops, TVs, and accessories.",
    images: [
      {
        url: "/brand/zenvora-logo.png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenvora Electronics | Premium Tech Store",
    description:
      "Premium electronics with clear specs, secure checkout, and fast support. Shop smartphones, laptops, TVs, and accessories.",
    images: ["/brand/zenvora-logo.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OldLogoWatermark />
        {children}
      </body>
    </html>
  );
}
