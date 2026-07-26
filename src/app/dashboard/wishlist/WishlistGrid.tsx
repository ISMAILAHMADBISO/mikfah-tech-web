"use client";

import { useState, useTransition } from "react";
import { ShoppingBag, Trash2, Check, Loader2 } from "lucide-react";
import { createDirectOrderAction, toggleWishlistAction } from "@/app/actions/user";

interface WishlistItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    category: { name: string } | null;
  };
}

export function WishlistGrid({ items }: { items: WishlistItem[] }) {
  const [orderingId, setOrderingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleOrder = (product: WishlistItem["product"]) => {
    setOrderingId(product.id);
    startTransition(async () => {
      const res = await createDirectOrderAction(product.id, 1);
      setOrderingId(null);
      if (!res?.error) {
        setSuccessId(product.id);
        setTimeout(() => setSuccessId(null), 3000);
      }
    });
  };

  const handleRemove = (productId: string) => {
    startTransition(async () => {
      await toggleWishlistAction(productId);
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(({ id, product }) => {
        const isOrdering = orderingId === product.id && isPending;
        const isSuccess = successId === product.id;

        return (
          <div key={id} className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="aspect-video bg-muted/20 relative overflow-hidden flex items-center justify-center">
                {product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover bg-white" />
                ) : (
                  <span className="text-xs text-muted-foreground">No Image</span>
                )}
                <button 
                  onClick={() => handleRemove(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  {product.category?.name || "General"}
                </span>
                <h3 className="font-bold text-lg text-foreground line-clamp-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="pt-2">
                  <span className="text-xl font-extrabold text-foreground">₦{product.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => handleOrder(product)}
                disabled={isPending || product.stock <= 0}
                className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                  isSuccess 
                    ? "bg-green-600 text-white shadow-green-500/20" 
                    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20"
                } disabled:opacity-50`}
              >
                {isOrdering ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order...</>
                ) : isSuccess ? (
                  <><Check className="w-4 h-4" /> Order Placed!</>
                ) : (
                  <><ShoppingBag className="w-4 h-4" /> Order Now (Website)</>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
