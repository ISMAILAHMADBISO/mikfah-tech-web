import { prisma } from "@/lib/prisma";
import { OrderTable } from "./OrderTable";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: { product: true }
      },
      payment: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Orders & Sales Management</h1>
          <p className="text-muted-foreground mt-1">Monitor active online customer orders, update delivery statuses, and verify payments.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-sm">
          Total Orders: {orders.length}
        </div>
      </div>

      <OrderTable orders={orders} />
    </div>
  );
}
