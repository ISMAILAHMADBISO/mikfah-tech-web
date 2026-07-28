"use client";

import Link from "next/link";
import { AddToCartBtn } from "@/components/shop/AddToCartBtn";

export function ProductCard({ product }: { product: any }) {
  const image = product.images?.[0] || product.image || "https://placehold.co/400?text=No+Image";

  return (
    <div className="group flex flex-col bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-sm">
      <Link href={`/shop/${product.id}`} className="aspect-square relative bg-muted/5 p-4 flex items-center justify-center overflow-hidden block">
        <img 
          src={image} 
          alt={product.name}
          className="object-cover w-full h-full rounded-md group-hover:scale-110 transition-transform duration-500 ease-in-out bg-white"
        />
        {product.stock < 20 && product.stock > 0 && (
          <span className="absolute top-2 right-2 bg-orange-500/20 text-orange-500 text-[10px] font-bold px-2 py-1 rounded">Low Stock</span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 right-2 bg-red-500/20 text-red-500 text-[10px] font-bold px-2 py-1 rounded">Out of Stock</span>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-xs text-primary font-medium mb-1 uppercase tracking-wider block">{product.category?.name || "General"}</span>
          <Link href={`/shop/${product.id}`}>
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
          </Link>
        </div>
        <div className="mt-4 pt-4 border-t border-border/40 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Price</span>
            <span className="font-bold text-lg text-foreground">₦{product.price.toLocaleString()}</span>
          </div>
          <AddToCartBtn 
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              sku: product.sku,
              stock: product.stock,
              images: [image]
            }} 
          />
        </div>
      </div>
    </div>
  );
}
