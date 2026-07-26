"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { updateProductAction } from "@/app/actions/product";

interface EditProductFormProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    sku: string;
    stock: number;
    images: string[];
  };
}

export function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateProductAction(product.id, formData);
      if (res.error) {
        setError(res.error);
      } else {
        router.push("/admin/products");
        router.refresh();
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Edit Component / Product</h1>
          <p className="text-sm text-muted-foreground">Update details, prices, and inventory stock status.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-medium p-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Product Name *</label>
            <input 
              required
              type="text" 
              name="name"
              defaultValue={product.name}
              placeholder="e.g. Raspberry Pi 4 Model B (4GB RAM)" 
              className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">SKU / Model *</label>
              <input 
                required
                type="text" 
                name="sku"
                defaultValue={product.sku}
                placeholder="e.g. RPI-4B-4GB" 
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:outline-none font-mono text-xs"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Price (₦ Naira) *</label>
              <input 
                required
                type="number" 
                name="price"
                defaultValue={product.price}
                placeholder="150000" 
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:outline-none font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Stock Quantity *</label>
              <input 
                required
                type="number" 
                name="stock"
                defaultValue={product.stock}
                placeholder="15" 
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:outline-none font-semibold"
              />
              <p className="text-xs text-muted-foreground mt-1">Set to <span className="font-bold text-red-500">0</span> to mark as Out of Stock.</p>
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-semibold text-foreground">Product Image (Browse File from Laptop or Enter URL)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground block mb-1 font-semibold">1. Upload New Image from Laptop:</span>
                  <input type="file" name="imageFile" accept="image/*" className="w-full border border-input rounded-md px-3 py-1.5 bg-background text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block mb-1 font-semibold">2. Or Paste Image URL:</span>
                  <input 
                    type="text" 
                    name="image"
                    defaultValue={product.images[0] || ""}
                    placeholder="https://images.unsplash.com/..." 
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Product Description *</label>
            <textarea 
              required
              rows={5}
              name="description"
              defaultValue={product.description}
              placeholder="Provide a detailed technical description of this component..." 
              className="w-full rounded-md border border-input bg-background p-4 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-4 border-t border-border/50">
            <Link 
              href="/admin/products"
              className="px-6 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
