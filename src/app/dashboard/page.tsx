import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, ShoppingBag, Heart, LifeBuoy, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardOverview() {
  const session = await auth();
  const userName = session?.user?.name || "Customer";
  const userId = session?.user?.id;

  const ordersCount = userId ? await prisma.order.count({ where: { userId } }) : 0;
  const ticketsCount = userId ? await prisma.supportTicket.count({ where: { userId } }) : 0;
  
  const wishlist = userId ? await prisma.wishlist.findUnique({
    where: { userId },
    include: { _count: { select: { items: true } } }
  }) : null;
  const wishlistCount = wishlist?._count.items || 0;

  const featuredProducts = await prisma.product.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">Here is an overview of your account and available store products.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link href="/dashboard/orders" className="bg-card border border-border/50 p-6 rounded-xl shadow-sm hover:border-primary/50 transition-colors flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">My Orders</p>
            <p className="text-3xl font-extrabold text-foreground mt-1">{ordersCount}</p>
          </div>
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <Package className="w-6 h-6" />
          </div>
        </Link>

        <Link href="/dashboard/wishlist" className="bg-card border border-border/50 p-6 rounded-xl shadow-sm hover:border-primary/50 transition-colors flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Wishlist Items</p>
            <p className="text-3xl font-extrabold text-foreground mt-1">{wishlistCount}</p>
          </div>
          <div className="p-3 bg-red-500/10 text-red-500 rounded-lg">
            <Heart className="w-6 h-6" />
          </div>
        </Link>

        <Link href="/dashboard/support" className="bg-card border border-border/50 p-6 rounded-xl shadow-sm hover:border-primary/50 transition-colors flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Support Tickets</p>
            <p className="text-3xl font-extrabold text-foreground mt-1">{ticketsCount}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
            <LifeBuoy className="w-6 h-6" />
          </div>
        </Link>
      </div>

      {/* Quick Catalog Preview */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-foreground">Available Store Items</h2>
          <Link href="/dashboard/store" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <div key={product.id} className="bg-card border border-border/50 rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="aspect-video bg-muted/20 rounded-lg overflow-hidden mb-3">
                  {product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover bg-white" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                  )}
                </div>
                <h4 className="font-bold text-sm text-foreground line-clamp-1">{product.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">₦{product.price.toLocaleString()}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50">
                <Link href="/dashboard/store" className="w-full py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded text-xs font-bold transition-colors flex items-center justify-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5" /> Order Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Note */}
      <div className="bg-muted/30 border border-border/50 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Prefer ordering via WhatsApp?</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            You can also place orders or ask questions directly through our WhatsApp line without needing to log in.
          </p>
        </div>
        <a 
          href="https://wa.me/2349067285522?text=Hello%20MIKFAH%20TECH%2C%20I%20have%20a%20question%20about%20an%20order." 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white hover:bg-[#20bd5a] px-5 py-2.5 rounded-md font-bold text-sm transition-colors shrink-0"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
