"use client";

import { useState, useTransition } from "react";
import { ShoppingBag, Heart, Check, Loader2, MessageCircle, Plus, Minus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { createCartOrderAction, createDirectOrderAction, toggleWishlistAction } from "@/app/actions/user";
import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: { name: string } | null;
}

export function StoreGrid({ products }: { products: Product[] }) {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [orderingId, setOrderingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      sku: "SKU-" + product.id.slice(-4),
      image: product.images[0] || ""
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const handleCartCheckout = () => {
    setError(null);
    setCartSuccess(false);
    startTransition(async () => {
      const res = await createCartOrderAction(cart, "Bank Deposit");
      if (res?.error) {
        setError(res.error);
      } else {
        clearCart();
        setCartSuccess(true);
        router.refresh();
        setTimeout(() => setCartSuccess(false), 6000);
      }
    });
  };

  const handleWishlist = (productId: string) => {
    startTransition(async () => {
      await toggleWishlistAction(productId);
    });
  };

  if (products.length === 0) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-12 text-center text-muted-foreground">
        No products available in the store catalog right now. Please check back soon!
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}

      {cartSuccess && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-5 rounded-xl flex items-center justify-between gap-4 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-full">
              <Check className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h4 className="font-bold text-base text-foreground">Order Placed Successfully!</h4>
              <p className="text-sm text-muted-foreground">All items from your cart have been submitted. You can track your order in <span className="font-semibold text-foreground">My Orders</span>.</p>
            </div>
          </div>
          <button 
            onClick={() => router.push("/dashboard/orders")}
            className="px-4 py-2 bg-green-600 text-white font-bold text-xs rounded-lg hover:bg-green-700 transition-colors shrink-0 flex items-center gap-1"
          >
            View Orders <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Active Dashboard Cart Banner */}
      {cart.length > 0 && !cartSuccess && (
        <div className="bg-card border-2 border-primary/40 rounded-xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-foreground">My Dashboard Cart ({cart.reduce((a, b) => a + b.quantity, 0)} items)</h3>
            </div>
            <button 
              onClick={clearCart} 
              className="text-xs text-muted-foreground hover:text-red-500 underline transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="divide-y divide-border/30 max-h-64 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-muted/20 rounded overflow-hidden shrink-0 flex items-center justify-center">
                    {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <ShoppingBag className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-semibold text-sm text-foreground truncate">{item.name}</h5>
                    <span className="text-xs text-muted-foreground">₦{item.price.toLocaleString()} each</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded bg-muted/20 text-xs">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-muted">-</button>
                    <span className="px-2 font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-muted">+</button>
                  </div>
                  <span className="font-bold text-sm text-foreground min-w-[80px] text-right">₦{(item.price * item.quantity).toLocaleString()}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-red-500 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-muted-foreground uppercase font-semibold">Total Amount</span>
              <p className="text-2xl font-extrabold text-primary">₦{cartTotal.toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleCartCheckout}
                disabled={isPending}
                className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
              >
                {isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Submitting Order...</>
                ) : (
                  <><Check className="w-4 h-4" /> Place Order for All Items (Admin)</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const isAdded = addedId === product.id;

          return (
            <div key={product.id} className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="aspect-video bg-muted/20 relative overflow-hidden flex items-center justify-center">
                  {product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover bg-white" />
                  ) : (
                    <span className="text-xs text-muted-foreground">No Image</span>
                  )}
                  <button 
                    onClick={() => handleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background text-muted-foreground hover:text-red-500 transition-colors shadow-sm"
                    title="Save to Wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  {product.stock > 0 ? (
                    <span className="absolute top-3 left-3 bg-green-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="absolute top-3 left-3 bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      Out of Stock
                    </span>
                  )}
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

              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock <= 0}
                  className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                    isAdded 
                      ? "bg-green-600 text-white shadow-green-500/20" 
                      : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20"
                  } disabled:opacity-50`}
                >
                  {isAdded ? (
                    <><Check className="w-4 h-4" /> Added to Cart!</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                  )}
                </button>

                <a
                  href={`https://wa.me/2349067285522?text=${encodeURIComponent(`Hello MIKFAH TECH, I am interested in ordering ${product.name} (₦${product.price.toLocaleString()}). Please confirm delivery.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Order via WhatsApp
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
