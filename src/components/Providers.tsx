"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider, useCart } from "./CartProvider";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

function FloatingCartBar() {
  const { cart } = useCart();
  const pathname = usePathname();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Don't show on cart, checkout, admin, or staff pages
  if (itemCount === 0 || pathname === "/cart" || pathname === "/checkout" || pathname?.startsWith("/admin") || pathname?.startsWith("/staff")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white border border-primary/50 rounded-2xl shadow-2xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold relative shrink-0">
        <ShoppingCart className="w-5 h-5" />
        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-950">
          {itemCount}
        </span>
      </div>
      <div className="pr-2">
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Your Shopping Cart</p>
        <p className="text-base font-extrabold text-white">₦{totalPrice.toLocaleString()}</p>
      </div>
      <Link 
        href="/cart"
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-primary/30 transition-all transform hover:scale-105 whitespace-nowrap shrink-0"
      >
        Checkout <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
        <FloatingCartBar />
      </CartProvider>
    </SessionProvider>
  );
}
