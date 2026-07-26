import { FileText, ShoppingCart, Check, Star, AlertTriangle, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartSection } from "./AddToCartSection";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
    include: { category: true }
  });
  
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Breadcrumbs */}
      <div className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-primary">Shop</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted/10 rounded-xl border border-border/50 flex items-center justify-center p-8 overflow-hidden relative">
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="object-cover rounded-lg w-full h-full bg-white"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg">No Image</div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img: string, idx: number) => (
                <div key={idx} className={`w-24 h-24 shrink-0 rounded-lg bg-muted/10 border ${idx === 0 ? 'border-primary' : 'border-border/50'} cursor-pointer p-2 flex items-center justify-center`}>
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover bg-white rounded-md" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-primary font-medium tracking-wide uppercase text-sm">{product.category?.name || "General Component"}</span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium text-foreground">5.0 <span className="text-muted-foreground">(12 reviews)</span></span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
          
          <div className="flex items-end gap-4 mb-6">
            <span className="text-4xl font-bold text-foreground">₦{product.price.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-4 mb-8 text-sm">
            <div className="flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full border border-secondary/20">
              <Check className="h-4 w-4" /> 
              <span>In Stock ({product.stock} available)</span>
            </div>
            <span className="text-muted-foreground">SKU: {product.sku}</span>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Action Buttons */}
          <AddToCartSection product={product} />

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <span>Genuine Components</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>Nationwide Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Detailed Info */}
      <div className="mt-16 pt-8 border-t border-border/50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Features</h3>
              <ul className="space-y-3">
                {product.features && product.features.length > 0 ? product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                )) : (
                  <li className="text-muted-foreground italic">No features listed.</li>
                )}
              </ul>
            </section>
            
            <section>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Technical Specifications</h3>
              <div className="border border-border/50 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <tbody>
                    {product.specifications && Array.isArray(product.specifications) && product.specifications.length > 0 ? (
                      product.specifications.map((spec: any, i: number) => (
                        <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/10 transition-colors">
                          <td className="py-3 px-4 font-medium bg-muted/20 w-1/3">{spec.label || "Spec"}</td>
                          <td className="py-3 px-4 text-muted-foreground">{spec.value || spec}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-3 px-4 text-muted-foreground italic">No specifications listed.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          
          <div>
            <div className="bg-card border border-border/50 p-6 rounded-xl shadow-sm sticky top-24">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Documentation
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Need more technical details? Download the official datasheet from the manufacturer.
              </p>
              <a 
                href={product.datasheetUrl || "#"} 
                className="w-full border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-md flex items-center justify-center gap-2 py-2.5 font-medium transition-colors"
              >
                Download Datasheet
              </a>

              <div className="mt-8 pt-6 border-t border-border/50">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" /> Caution
                </h4>
                <p className="text-xs text-muted-foreground">
                  Static-sensitive device. Handle with care. Always ensure proper grounding before working with exposed electronics.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
