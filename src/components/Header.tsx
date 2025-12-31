"use client";

import Link from "next/link";
import { ShoppingCart, Search, Moon, Sun, Menu } from "lucide-react";
import { useCart } from "@/lib/store";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const { getTotalItems } = useCart();
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Zenvora
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
              Shop
            </Link>
            <Link href="/shop?category=Phones" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">
              Phones
            </Link>
            <Link href="/shop?category=Laptops" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">
              Laptops
            </Link>
            <Link href="/shop?category=Audio" className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground">
              Audio
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            className="hidden md:flex"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs font-medium text-primary-foreground flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t p-4">
          <div className="container">
            <input
              type="search"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-md border bg-background"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
