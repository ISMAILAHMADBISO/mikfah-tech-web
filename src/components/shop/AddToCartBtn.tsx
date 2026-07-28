"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ShoppingCart, Check, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface AddToCartBtnProps {
  product: {
    id: string;
    name: string;
    price: number;
    sku: string;
    stock: number;
    images: string[];
  };
  className?: string;
  showBuyNow?: boolean;
}

export function AddToCartBtn({ product, className = "", showBuyNow = true }: AddToCartBtnProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock <= 0;

  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku,
      image: product.images[0] || "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku,
      image: product.images[0] || "",
    });
    router.push("/cart");
  };

  if (isOutOfStock) {
    return (
      <button
        disabled
        className={`w-full py-2.5 px-4 rounded-lg bg-muted text-muted-foreground font-semibold text-xs flex items-center justify-center gap-2 cursor-not-allowed border border-border/50 ${className}`}
      >
        <AlertCircle className="w-4 h-4 text-red-500" /> Out of Stock
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 w-full">
      <button
        type="button"
        onClick={handleAdd}
        disabled={added}
        className={`flex-1 py-2.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-sm active:scale-95 ${
          added
            ? "bg-green-600 text-white shadow-green-600/30 scale-95"
            : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/30 hover:-translate-y-0.5"
        } ${className}`}
      >
        {added ? (
          <>
            <Check className="w-4 h-4 animate-bounce" /> Added!
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </>
        )}
      </button>

      {showBuyNow && (
        <button
          type="button"
          onClick={handleBuyNow}
          className="py-2.5 px-3 rounded-lg font-bold text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border transition-all duration-300 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap shadow-sm hover:shadow"
        >
          Cart &rarr;
        </button>
      )}
    </div>
  );
}
