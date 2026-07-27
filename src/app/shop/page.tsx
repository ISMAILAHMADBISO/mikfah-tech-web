import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "./ProductCard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShopPage() {
  let products = [];
  try {
    products = await prisma.product.findMany({
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Electronic Components</h1>
          <p className="text-muted-foreground mt-1">Browse our extensive collection of hardware for your next project.</p>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search components..." 
              className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-card text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <button className="md:hidden p-2 rounded-md border border-input bg-card text-foreground">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 hidden md:block space-y-8">
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" /> Filters</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">Categories</h4>
                <div className="space-y-2">
                  {['Development Boards', 'Sensors', 'Displays', 'Relays', 'Power Modules'].map(cat => (
                    <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded border-input bg-card text-primary focus:ring-primary" />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">Price Range</h4>
                <input type="range" className="w-full accent-primary" />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>₦0</span>
                  <span>₦100,000+</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-muted-foreground">Showing {products.length} products</span>
            <select className="text-sm bg-card border-input border rounded-md px-3 py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer">
              <option>Sort by Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-border border-dashed">
                No products found in the database. Please add some via the Admin Dashboard.
              </div>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
