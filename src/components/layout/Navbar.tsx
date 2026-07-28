"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, User, X } from 'lucide-react';
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
  const [isOpen, setIsOpen] = useState(false);

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
            <Link href="/signup" className="text-sm font-bold bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-sm shadow-primary/20">
              Sign Up
            </Link>
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu" 
            className="md:hidden p-1.5 rounded-md text-foreground/80 hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/98 backdrop-blur-xl px-6 py-6 space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-4 divide-y divide-border/30">
            <Link onClick={() => setIsOpen(false)} href="/" className="text-base font-bold hover:text-primary transition-colors pt-2 first:pt-0">Home</Link>
            <Link onClick={() => setIsOpen(false)} href="/shop" className="text-base font-bold hover:text-primary transition-colors pt-3">Shop Components</Link>
            <Link onClick={() => setIsOpen(false)} href="/services" className="text-base font-bold hover:text-primary transition-colors pt-3">Services & Quotes</Link>
            <Link onClick={() => setIsOpen(false)} href="/portfolio" className="text-base font-bold hover:text-primary transition-colors pt-3">Portfolio</Link>
            <Link onClick={() => setIsOpen(false)} href="/blog" className="text-base font-bold hover:text-primary transition-colors pt-3">Blog & Insights</Link>
            <Link onClick={() => setIsOpen(false)} href="/contact" className="text-base font-bold hover:text-primary transition-colors pt-3">Contact Us</Link>
          </div>
          <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row gap-3">
            <Link onClick={() => setIsOpen(false)} href="/login" className="w-full py-3 px-4 rounded-lg border border-border text-center font-bold text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <User className="h-4 w-4" /> Log in
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/signup" className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground text-center font-bold text-sm hover:bg-primary/90 transition-colors shadow-md">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
