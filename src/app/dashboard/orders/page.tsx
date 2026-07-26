import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, ShoppingBag, ArrowRight, FileText, CheckCircle2, Clock, Truck, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardOrdersPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const orders = userId ? await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: true }
      },
      payment: true
    },
    orderBy: { createdAt: "desc" }
  }) : [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAYMENT_RECEIVED":
        return (
          <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> PAID (Payment Confirmed)
          </span>
        );
      case "AWAYTING_PAYMENT":
        return (
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> AWAITING PAYMENT CONFIRMATION
          </span>
        );
      case "OUT_FOR_DELIVERY":
        return (
          <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-purple-500/10 text-purple-500 border border-purple-500/30 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> OUT FOR DELIVERY
          </span>
        );
      case "PROCESSING":
        return (
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/30 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> PROCESSING (Packing Order)
          </span>
        );
      case "DELIVERED":
        return (
          <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-green-600/10 text-green-600 border border-green-600/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> DELIVERED
          </span>
        );
      case "CANCELLED":
        return (
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/30 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" /> CANCELLED
          </span>
        );
      default:
        return (
          <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-orange-500/10 text-orange-500 border border-orange-500/30 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> PENDING (Unpaid)
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">My Orders</h1>
          <p className="text-muted-foreground">Track your live order statuses, confirm bank transfer payments, and view delivery updates.</p>
        </div>
        <Link href="/dashboard/store" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm">
          <ShoppingBag className="w-4 h-4" /> Browse Store
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-card border border-border/50 rounded-xl p-12 text-center max-w-lg mx-auto my-8 space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-foreground">No orders placed yet</h3>
          <p className="text-sm text-muted-foreground">
            You haven&apos;t placed any direct website orders yet. Explore our electronics and IoT catalog to make your first purchase!
          </p>
          <div className="pt-2">
            <Link href="/dashboard/store" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
              Browse Store & Order Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const total = order.totalAmount + (order.shippingCost || 0);

            return (
              <div key={order.id} className="bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm hover:border-primary/40 transition-all">
                <div className="bg-muted/30 p-5 border-b border-border/50 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Order ID</span>
                    <p className="font-extrabold text-foreground text-base">#{order.id.slice(-6).toUpperCase()}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Date Placed</span>
                    <p className="font-medium text-sm text-foreground">{order.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Total Amount Due</span>
                    <p className="font-extrabold text-primary text-base">₦{total.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase font-semibold block mb-1">Live Status</span>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                <div className="p-5 divide-y divide-border/30">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted/20 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-border/50">
                          {item.product.images.length > 0 ? (
                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover bg-white" />
                          ) : (
                            <span className="text-[10px] text-muted-foreground">No Img</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-foreground">{item.product.name}</h4>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity} × ₦{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="font-extrabold text-sm text-foreground">
                        ₦{(item.quantity * item.price).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer bar with invoice and payment evidence links */}
                <div className="p-4 bg-muted/10 border-t border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="text-xs text-muted-foreground">
                    {order.payment?.reference ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Transfer Reference: {order.payment.reference}
                      </span>
                    ) : (
                      <span>Need to make payment? Open invoice to view Moniepoint bank transfer details.</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Link 
                      href="/dashboard/invoices" 
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto justify-center"
                    >
                      <FileText className="w-4 h-4" /> View Invoice & Pay via Bank Transfer
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
