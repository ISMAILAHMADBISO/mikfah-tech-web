"use client";

import { useState, useTransition } from "react";
import { updateOrderStatusAction } from "@/app/actions/admin";
import { Loader2, Check, Package, User, Calendar, DollarSign } from "lucide-react";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    sku: string;
    images: string[];
  };
}

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  shippingCost: number;
  createdAt: Date;
  user: {
    name: string;
    email: string;
    phone: string | null;
  };
  items: OrderItem[];
  payment: {
    paymentMethod: string;
    status: string;
    reference?: string | null;
  } | null;
}

export function OrderTable({ orders }: { orders: Order[] }) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    startTransition(async () => {
      const res = await updateOrderStatusAction(orderId, newStatus);
      setUpdatingId(null);
      if (res?.error) {
        alert("Status Update Failed: " + res.error);
      }
    });
  };

  if (orders.length === 0) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-12 text-center text-muted-foreground">
        No orders found in the database yet. When customers place website orders from their dashboard or checkout, they will appear here in real-time.
      </div>
    );
  }

  return (
    <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-xs border-b border-border/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Order ID & Date</th>
              <th className="px-6 py-4 font-semibold">Customer Details</th>
              <th className="px-6 py-4 font-semibold">Ordered Components</th>
              <th className="px-6 py-4 font-semibold">Payment & Total</th>
              <th className="px-6 py-4 font-semibold">Status & Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {orders.map((order) => {
              const total = order.totalAmount + (order.shippingCost || 0);

              return (
                <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <span className="font-bold text-foreground block">
                      #{order.id.slice(-6).toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>

                  <td className="px-6 py-4 align-top">
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-foreground">{order.user?.name || "Guest User"}</p>
                        <p className="text-xs text-muted-foreground">{order.user?.email}</p>
                        {order.user?.phone && (
                          <p className="text-xs text-primary font-bold mt-0.5">{order.user.phone}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 align-top">
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 text-xs">
                          <Package className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <span className="font-medium text-foreground">{item.quantity}x</span>
                          <span className="text-muted-foreground truncate max-w-[180px]">{item.product?.name || "Component"}</span>
                          <span className="text-[10px] text-muted-foreground ml-auto">(₦{item.price.toLocaleString()})</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 align-top">
                    <span className="text-base font-extrabold text-foreground block">
                      ₦{total.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground block mt-1">
                      Method: <span className="font-semibold text-foreground">{order.payment?.paymentMethod || "Bank Transfer"}</span>
                    </span>
                    {order.payment?.reference && (
                      <span className="text-[11px] text-emerald-500 font-bold block mt-1 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Ref: {order.payment.reference}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 align-top">
                    <div className="flex flex-col gap-2">
                      <select
                        disabled={updatingId === order.id && isPending}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none transition-all cursor-pointer ${
                          order.status === 'DELIVERED' ? 'bg-green-500/10 text-green-500 border-green-500/30' :
                          order.status === 'PAYMENT_RECEIVED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 font-extrabold' :
                          order.status === 'PROCESSING' ? 'bg-blue-500/10 text-blue-500 border-blue-500/30' :
                          order.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                          'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                        }`}
                      >
                        <option value="PENDING" className="bg-background text-foreground font-semibold">PENDING (Unpaid)</option>
                        <option value="AWAYTING_PAYMENT" className="bg-background text-foreground font-semibold">AWAITING PAYMENT</option>
                        <option value="PAYMENT_RECEIVED" className="bg-background text-emerald-500 font-extrabold">PAID (Payment Confirmed)</option>
                        <option value="PROCESSING" className="bg-background text-foreground font-semibold">PROCESSING (Packing Item)</option>
                        <option value="OUT_FOR_DELIVERY" className="bg-background text-foreground font-semibold">OUT FOR DELIVERY</option>
                        <option value="DELIVERED" className="bg-background text-foreground font-semibold">DELIVERED</option>
                        <option value="CANCELLED" className="bg-background text-foreground font-semibold">CANCELLED</option>
                      </select>
                      {updatingId === order.id && isPending && (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" /> Saving...
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
