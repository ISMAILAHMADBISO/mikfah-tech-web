import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { InvoiceCard } from "./InvoiceCard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardInvoicesPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const invoices = userId ? await prisma.invoice.findMany({
    where: { order: { userId } },
    include: {
      order: {
        include: { items: { include: { product: true } } }
      }
    },
    orderBy: { createdAt: "desc" }
  }) : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">My Invoices & Payment Evidence</h1>
        <p className="text-muted-foreground">View official corporate invoices, print bank transfer slips, and submit payment confirmation receipts.</p>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-card border border-border/50 rounded-xl p-12 text-center max-w-lg mx-auto my-8 space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-foreground">No invoices generated yet</h3>
          <p className="text-sm text-muted-foreground">
            Invoices are automatically created when you place an order in our store. Once placed, you can print official invoices and confirm bank transfer payments here.
          </p>
          <div className="pt-2">
            <Link href="/dashboard/store" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
              Browse Store & Place Order <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((inv) => (
            <InvoiceCard 
              key={inv.id} 
              invoice={{
                invoiceId: inv.id,
                createdAt: inv.createdAt,
                order: {
                  id: inv.order.id,
                  status: inv.order.status,
                  totalAmount: inv.order.totalAmount,
                  shippingCost: inv.order.shippingCost,
                  items: inv.order.items.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    product: {
                      name: item.product.name,
                      sku: item.product.sku
                    }
                  }))
                }
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
