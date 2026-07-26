import { ClipboardList, LifeBuoy, PackageOpen, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function StaffDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Staff Overview</h1>
        <p className="text-muted-foreground mt-1">Hello, Staff Member. Here are your tasks for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-500/20 text-blue-500 p-3 rounded-lg">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
              <h2 className="text-2xl font-bold text-foreground">12</h2>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-orange-500/20 text-orange-500 p-3 rounded-lg">
              <PackageOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
              <h2 className="text-2xl font-bold text-foreground">5</h2>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-emerald-500/20 text-emerald-500 p-3 rounded-lg">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Open Tickets</p>
              <h2 className="text-2xl font-bold text-foreground">3</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        
        <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/50 flex justify-between items-center">
            <h3 className="font-bold text-lg text-foreground">Needs Fulfillment</h3>
            <Link href="/staff/orders" className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          <div className="divide-y divide-border/50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-bold text-sm">Order #ORD-77{i}1</p>
                  <p className="text-xs text-muted-foreground mt-1">2 Items &middot; Standard Shipping</p>
                </div>
                <button className="flex items-center gap-2 text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors">
                  <CheckCircle className="w-4 h-4" /> Fulfill
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border/50 flex justify-between items-center">
            <h3 className="font-bold text-lg text-foreground">Recent Support Tickets</h3>
            <Link href="/staff/support" className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          <div className="divide-y divide-border/50">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-bold text-sm">Where is my order?</p>
                  <p className="text-xs text-muted-foreground mt-1">From: Sani Musa &middot; 1hr ago</p>
                </div>
                <button className="text-xs font-semibold border border-input bg-background hover:bg-muted text-foreground px-3 py-1.5 rounded-md transition-colors">
                  Reply
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
