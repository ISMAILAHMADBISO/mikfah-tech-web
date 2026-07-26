"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  BarChart, 
  ShoppingCart, 
  LifeBuoy, 
  Package, 
  LogOut,
  UserCheck,
  ShieldAlert,
  Home
} from "lucide-react";

const staffLinks = [
  { name: "Staff Dashboard", href: "/staff", icon: <BarChart className="w-5 h-5" /> },
  { name: "Fulfill Orders", href: "/staff/orders", icon: <ShoppingCart className="w-5 h-5" /> },
  { name: "Inventory", href: "/staff/inventory", icon: <Package className="w-5 h-5" /> },
  { name: "Support Tickets", href: "/staff/support", icon: <LifeBuoy className="w-5 h-5" /> },
];

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isAdminOrManager = session?.user?.role === "SUPER_ADMIN" || session?.user?.role === "MANAGER";

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      
      {/* Staff Sidebar */}
      <aside className="w-full md:w-64 shrink-0 bg-card border-r border-border/50 sticky top-0 md:h-screen overflow-y-auto flex flex-col justify-between">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-foreground leading-tight">Staff Portal</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-primary/10 text-primary rounded">
                {session?.user?.role || "STAFF"}
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {staffLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 font-bold" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 pt-4 border-t border-border/50 space-y-2">
          {isAdminOrManager && (
            <Link 
              href="/admin" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
            >
              <ShieldAlert className="w-4 h-4" /> Switch to Admin Portal
            </Link>
          )}

          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Home className="w-4 h-4" /> Back to Store
          </Link>
          
          <button 
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-destructive hover:bg-destructive/10 w-full transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Staff Main Content Area */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
