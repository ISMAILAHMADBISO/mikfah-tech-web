import { auth } from "@/auth";
import { SidebarNav } from "./SidebarNav";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8 min-h-[80vh]">
      
      {/* Sidebar Navigation */}
      <SidebarNav user={session.user} />

      {/* Main Content Area */}
      <main className="flex-1 bg-card border border-border/50 rounded-xl p-6 md:p-8 shadow-sm">
        {children}
      </main>

    </div>
  );
}
