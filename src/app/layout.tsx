import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "ZenVora Store",
  description: "Electronics store"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ padding: 24 }}>{children}</main>
      </body>
    </html>
  );
}
