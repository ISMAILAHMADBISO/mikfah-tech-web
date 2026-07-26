"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { useCart } from '@/components/CartProvider';

function CartBadge() {
  "use client";
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/cart" className="text-foreground/60 hover:text-foreground relative">
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.jpg" alt="MIKFAH TECH LTD Logo" className="h-10 w-auto" />
            <span className="font-bold text-xl text-primary tracking-tight hidden sm:inline-block">MIKFAH TECH</span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">Shop</Link>
            <Link href="/services" className="text-sm font-medium transition-colors hover:text-primary">Services</Link>
            <Link href="/portfolio" className="text-sm font-medium transition-colors hover:text-primary">Portfolio</Link>
            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">Blog</Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">Contact</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button aria-label="Search" className="text-foreground/60 hover:text-foreground">
            <Search className="h-5 w-5" />
          </button>
          <CartBadge />
          <div className="hidden md:flex items-center gap-4 ml-2">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
              <User className="h-4 w-4" /> Log in
            </Link>
            <Link href="/signup" className="text-sm font-bold bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Sign Up
            </Link>
          </div>
          <button className="md:hidden text-foreground/60 hover:text-foreground">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
