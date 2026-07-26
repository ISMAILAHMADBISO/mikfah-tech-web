import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { UserPlus, Shield, UserCog, Search } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StaffManagementPage() {
  const staffMembers = await prisma.user.findMany({
    where: {
      role: {
        in: ["SUPER_ADMIN", "MANAGER", "SALES_STAFF", "INVENTORY_STAFF", "SUPPORT_STAFF"]
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground mt-1">Manage administrators and staff members.</p>
        </div>
        <Link 
          href="/admin/staff/new" 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Add Staff Member
        </Link>
      </div>

      <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/20">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search staff..." 
              className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">Name / Email</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Added On</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {staffMembers.map((staff) => (
                <tr key={staff.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                        {staff.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{staff.name}</p>
                        <p className="text-xs text-muted-foreground">{staff.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-secondary">
                      {staff.role === "SUPER_ADMIN" ? <Shield className="w-3 h-3 text-red-500" /> : <UserCog className="w-3 h-3 text-blue-500" />}
                      {staff.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {staff.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-primary hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
              
              {staffMembers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No staff members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
