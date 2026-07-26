"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart, 
  PackageSearch, 
  ShoppingCart, 
  Users, 
  FileText, 
  Mail, 
  Settings, 
  LogOut,
  ShieldAlert
} from "lucide-react";

const adminLinks = [
  { name: "Dashboard Overview", href: "/admin", icon: <BarChart className="w-5 h-5" /> },
  { name: "Orders & Sales", href: "/admin/orders", icon: <ShoppingCart className="w-5 h-5" /> },
  { name: "Customers", href: "/admin/customers", icon: <Users className="w-5 h-5" /> },
  { name: "Manage Products", href: "/admin/products", icon: <PackageSearch className="w-5 h-5" /> },
  { name: "Portfolio & Services", href: "/admin/portfolio", icon: <FileText className="w-5 h-5" /> },
  { name: "Content / Blog", href: "/admin/blog", icon: <FileText className="w-5 h-5" /> },
  { name: "Project Inquiries", href: "/admin/inquiries", icon: <Mail className="w-5 h-5" /> },
  { name: "Support Tickets", href: "/admin/support", icon: <ShieldAlert className="w-5 h-5" /> },
  { name: "Staff Management", href: "/admin/staff", icon: <Settings className="w-5 h-5" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 shrink-0 bg-card border-r border-border/50 sticky top-0 md:h-screen overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <ShieldAlert className="w-8 h-8 text-primary" />
            <div>
              <h2 className="font-bold text-foreground leading-tight">Admin Portal</h2>
              <p className="text-xs text-muted-foreground">MIKFAH TECH LTD</p>
            </div>
          </div>

          <nav className="space-y-1">
            {adminLinks.map((link) => {
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
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground w-full transition-colors mb-2">
              &larr; Back to Store
            </Link>
            <form action="/api/auth/signout" method="POST">
              <button type="submit" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 w-full transition-colors">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Admin Main Content Area */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
