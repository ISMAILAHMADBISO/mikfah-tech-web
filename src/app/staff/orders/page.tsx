"use client";

import { useState } from "react";
import { ShoppingBag, CheckCircle2, Clock, Truck, Search, Phone } from "lucide-react";

const initialOrders = [
  {
    id: "ORD-9821",
    customer: "Ibrahim Ahmad",
    phone: "09067285522",
    items: "2x ESP32 Dev Board, 1x 12V 100Ah LiFePO4 Battery",
    total: 315000,
    status: "Processing",
    date: "10 mins ago"
  },
  {
    id: "ORD-9820",
    customer: "Chinedu Okafor",
    phone: "08031122334",
    items: "1x 5kVA Hybrid Solar Inverter, 4x 550W Solar Panels",
    total: 1450000,
    status: "Dispatched",
    date: "2 hours ago"
  },
  {
    id: "ORD-9819",
    customer: "Binta Sulaiman",
    phone: "08123456789",
    items: "5x Raspberry Pi 4 (4GB), 10x Ultrasonic Sensors",
    total: 185000,
    status: "Delivered",
    date: "Yesterday"
  }
];

export default function StaffOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filtered = orders.filter(o => 
    o.id.toLowerCase().includes(search.toLowerCase()) || 
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" /> Fulfill Store Orders
          </h1>
          <p className="text-sm text-muted-foreground">Manage incoming WhatsApp orders, dispatch tracking, and delivery confirmations.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-card border border-input rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-3 font-semibold">Order ID</th>
                <th className="px-6 py-3 font-semibold">Customer & Phone</th>
                <th className="px-6 py-3 font-semibold">Items</th>
                <th className="px-6 py-3 font-semibold">Total (₦)</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Fulfillment Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-primary">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{order.customer}</div>
                    <a href={`https://wa.me/234${order.phone.slice(1)}`} target="_blank" rel="noreferrer" className="text-xs text-green-600 hover:underline flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" /> {order.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 max-w-xs text-muted-foreground truncate" title={order.items}>{order.items}</td>
                  <td className="px-6 py-4 font-extrabold text-foreground">₦{order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400" :
                      order.status === "Dispatched" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400" :
                      "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                    }`}>
                      {order.status === "Delivered" && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {order.status === "Dispatched" && <Truck className="w-3.5 h-3.5" />}
                      {order.status === "Processing" && <Clock className="w-3.5 h-3.5 animate-pulse" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select 
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="bg-background border border-input rounded-md px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer shadow-sm"
                    >
                      <option value="Processing">Mark Processing</option>
                      <option value="Dispatched">Mark Dispatched</option>
                      <option value="Delivered">Mark Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
