import { prisma } from "@/lib/prisma";
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  ArrowUpRight,
  MoreHorizontal,
  Package,
  Mail
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [orders, totalOrdersCount, totalCustomersCount, totalProductsCount, recentInquiries] = await Promise.all([
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true }
    }),
    prisma.order.count(),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.product.count(),
    prisma.projectRequest.findMany({
      take: 3,
      orderBy: { createdAt: "desc" }
    })
  ]);

  const allOrders = await prisma.order.findMany({
    where: { status: { not: "CANCELLED" } },
    select: { totalAmount: true, shippingCost: true }
  });

  const totalRevenue = allOrders.reduce((acc: number, order: any) => acc + order.totalAmount + (order.shippingCost || 0), 0);
  const activeOrdersCount = await prisma.order.count({
    where: { status: { in: ["PENDING", "PROCESSING"] } }
  });

  const stats = [
    { title: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}`, change: "+Live", icon: <DollarSign className="w-5 h-5 text-emerald-500" /> },
    { title: "Active Orders", value: `${activeOrdersCount}`, change: `${totalOrdersCount} total`, icon: <ShoppingCart className="w-5 h-5 text-blue-500" /> },
    { title: "Total Customers", value: `${totalCustomersCount}`, change: "Registered", icon: <Users className="w-5 h-5 text-purple-500" /> },
    { title: "Total Products", value: `${totalProductsCount}`, change: "In Catalog", icon: <Package className="w-5 h-5 text-orange-500" /> },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Admin. Here is the live status of your MIKFAH TECH store.</p>
        </div>
        <Link 
          href="/admin/orders" 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold text-sm shadow-sm hover:bg-primary/90 transition-colors"
        >
          Manage All Orders
        </Link>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card border border-border/50 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-muted p-2 rounded-md">
                {stat.icon}
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center gap-1">
                {stat.change} <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
            <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders List */}
        <div className="lg:col-span-2 bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-border/50 flex justify-between items-center">
              <h3 className="font-bold text-lg text-foreground">Recent Orders</h3>
              <Link href="/admin/orders" className="text-sm text-primary hover:underline font-medium">View All ({totalOrdersCount})</Link>
            </div>
            {orders.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground text-sm">
                No orders have been placed yet. Orders placed by customers online will appear here instantly.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Order ID</th>
                      <th className="px-6 py-4 font-semibold">Customer</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Amount</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {orders.map((order: any) => (
                      <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 font-bold text-foreground">#{order.id.slice(-6).toUpperCase()}</td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-foreground">{order.user?.name || "Guest User"}</p>
                          <p className="text-xs text-muted-foreground">{order.user?.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === 'DELIVERED' ? 'bg-green-500/20 text-green-500' :
                            order.status === 'PROCESSING' ? 'bg-blue-500/20 text-blue-500' :
                            order.status === 'CANCELLED' ? 'bg-red-500/20 text-red-500' :
                            'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-extrabold text-foreground">₦{(order.totalAmount + (order.shippingCost || 0)).toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <Link href="/admin/orders" className="text-xs font-bold text-primary hover:underline">
                            Manage &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-border/50 bg-muted/10 text-center">
            <Link href="/admin/orders" className="text-sm font-bold text-primary hover:underline">
              Go to Orders & Sales Management &rarr;
            </Link>
          </div>
        </div>

        {/* Recent Project Inquiries */}
        <div className="bg-card border border-border/50 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-border/50 flex justify-between items-center">
              <h3 className="font-bold text-lg text-foreground">Recent Inquiries</h3>
              <Link href="/admin/inquiries" className="text-xs text-primary hover:underline font-bold">View All</Link>
            </div>
            <div className="p-6 space-y-6">
              {recentInquiries.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm py-8">
                  No inquiries received yet.
                </div>
              ) : (
                recentInquiries.map((inq: any) => (
                  <div key={inq.id} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-sm text-foreground truncate">{inq.name}</h4>
                      <p className="text-xs font-semibold text-primary truncate mb-1">{inq.projectType || "General Inquiry"}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                        {inq.description}
                      </p>
                      <span className="text-[10px] text-muted-foreground">{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="p-4 border-t border-border/50 bg-muted/10 text-center">
            <Link href="/admin/inquiries" className="text-sm font-bold text-primary hover:underline">
              View all inquiries &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
