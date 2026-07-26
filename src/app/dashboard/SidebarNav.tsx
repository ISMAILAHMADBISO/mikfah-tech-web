"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FileText, Download, Heart, Bell, LifeBuoy, Settings, LogOut, ShoppingBag } from "lucide-react";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Browse Store", href: "/dashboard/store", icon: <ShoppingBag className="w-5 h-5" /> },
  { name: "My Orders", href: "/dashboard/orders", icon: <Package className="w-5 h-5" /> },
  { name: "Invoices", href: "/dashboard/invoices", icon: <FileText className="w-5 h-5" /> },
  { name: "Downloads", href: "/dashboard/downloads", icon: <Download className="w-5 h-5" /> },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: <Heart className="w-5 h-5" /> },
  { name: "Notifications", href: "/dashboard/notifications", icon: <Bell className="w-5 h-5" /> },
  { name: "Support Tickets", href: "/dashboard/support", icon: <LifeBuoy className="w-5 h-5" /> },
  { name: "Profile Settings", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
];

export function SidebarNav({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm sticky top-24">
        <div className="flex items-center gap-4 mb-8 px-2 pt-2">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
            <span className="uppercase text-primary">{user?.name?.charAt(0) || "U"}</span>
          </div>
          <div>
            <p className="font-semibold text-foreground line-clamp-1">{user?.name || "Customer"}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{user?.email || "customer@example.com"}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-4 border-t border-border/50">
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 w-full transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
