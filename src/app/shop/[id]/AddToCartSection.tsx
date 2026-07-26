"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export function AddToCartSection({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-10 border-b border-border pb-10">
      <div className="flex items-center border border-input rounded-md bg-card">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-4 py-3 hover:bg-muted/50 transition-colors"
        >
          -
        </button>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-16 text-center bg-transparent border-x border-input py-3 focus:outline-none" 
        />
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="px-4 py-3 hover:bg-muted/50 transition-colors"
        >
          +
        </button>
      </div>
      <button 
        onClick={() => {
          // add to cart logic handles quantity inherently or we can push multiple.
          // Since our cart context addToCart only increments by 1, we should update it.
          // Wait, our CartContext addToCart doesn't take quantity! 
          // I will just loop for now to add the quantity requested.
          for(let i = 0; i < quantity; i++) {
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              sku: product.sku,
              image: product.images?.[0] || product.image
            });
          }
          alert(`Added ${quantity} to cart!`);
        }}
        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md flex items-center justify-center gap-2 py-3 font-semibold transition-colors shadow-lg shadow-primary/20"
      >
        <ShoppingCart className="h-5 w-5" />
        Add to Cart
      </button>
    </div>
  );
}
