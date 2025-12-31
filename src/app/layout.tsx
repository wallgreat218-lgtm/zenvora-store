import "./globals.css";
import Header from "../components/Header";
import PageTransition from "../components/PageTransition";
import { Inter, Manrope } from "next/font/google";

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

export const metadata = {
  title: "ZenVora Store",
  description: "Electronics store"
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
