import { prisma } from "@/lib/prisma";
import { StoreGrid } from "./StoreGrid";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardStorePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">Browse Store & Order Directly</h1>
        <p className="text-muted-foreground">
          As a registered MIKFAH account holder, you can view all available items and place orders directly from your portal, or order via WhatsApp!
        </p>
      </div>

      <StoreGrid products={products} />
    </div>
  );
}
