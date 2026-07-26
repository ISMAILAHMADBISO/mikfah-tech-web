import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { WishlistGrid } from "./WishlistGrid";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardWishlistPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const wishlist = userId ? await prisma.wishlist.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: { category: true }
          }
        }
      }
    }
  }) : null;

  const items = wishlist?.items || [];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">My Wishlist</h1>
          <p className="text-muted-foreground">Save your favorite IoT components and electronics for future projects.</p>
        </div>
        <Link href="/dashboard/store" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <ShoppingBag className="w-4 h-4" /> Browse Store
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-card border border-border/50 rounded-xl p-12 text-center max-w-lg mx-auto my-8 space-y-4">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-foreground">Your wishlist is empty</h3>
          <p className="text-sm text-muted-foreground">
            Click the heart icon on any product in the catalog to save items to your personal wishlist!
          </p>
          <div className="pt-2">
            <Link href="/dashboard/store" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-bold hover:bg-primary/90 transition-colors">
              Explore Catalog Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <WishlistGrid items={items} />
      )}
    </div>
  );
}
