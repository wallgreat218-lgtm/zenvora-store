import "./globals.css";
import Header from "../components/Header";
import PageTransition from "../components/PageTransition";
import { Inter, Manrope } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: {
    default: "ZenVora Electronics",
    template: "%s · ZenVora Electronics"
  },
  description:
    "ZenVora Electronics — premium shopping experience for phones, laptops, audio, and TVs. Prices may vary by region and retailer."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        <Header />
        <main className="container py-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
