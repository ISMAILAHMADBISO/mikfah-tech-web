import { prisma } from "@/lib/prisma";
import { Users, Mail, Phone, Calendar, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: {
      role: "USER"
    },
    include: {
      orders: true,
      wishlist: {
        include: { items: true }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Customers Management</h1>
          <p className="text-muted-foreground mt-1">View all registered buyers, their contact details, order count, and wishlist activity.</p>
        </div>
        <div className="bg-purple-500/10 text-purple-500 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
          <Users className="w-4 h-4" /> Total Customers: {customers.length}
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="bg-card border border-border/50 rounded-xl p-12 text-center text-muted-foreground">
          No registered buyers found yet. When users create accounts on MIKFAH TECH, their profile and activity will appear here.
        </div>
      ) : (
        <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground uppercase text-xs border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-semibold">Customer Name</th>
                  <th className="px-6 py-4 font-semibold">Contact Email & Phone</th>
                  <th className="px-6 py-4 font-semibold">Orders Placed</th>
                  <th className="px-6 py-4 font-semibold">Wishlist Items</th>
                  <th className="px-6 py-4 font-semibold">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          {customer.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{customer.name}</p>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">ID: {customer.id.slice(-6)}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-xs text-foreground flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-muted-foreground" /> {customer.email}
                        </p>
                        {customer.phone ? (
                          <p className="text-xs font-semibold text-primary flex items-center gap-1.5">
                            <Phone className="w-3 h-3" /> {customer.phone}
                          </p>
                        ) : (
                          <span className="text-[11px] text-muted-foreground italic">No phone added</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 font-bold text-xs">
                        <ShoppingBag className="w-3.5 h-3.5" /> {customer.orders.length} Order(s)
                      </span>
                    </td>

                    <td className="px-6 py-4 font-semibold text-foreground">
                      {customer.wishlist?.items?.length || 0} Saved Item(s)
                    </td>

                    <td className="px-6 py-4 text-xs text-muted-foreground flex items-center gap-1.5 mt-2">
                      <Calendar className="w-3.5 h-3.5" /> {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
