import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";
import { deletePortfolioAction } from "@/app/actions/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPortfolioPage() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Portfolio & Services</h1>
          <p className="text-muted-foreground">Manage the projects and services displayed on the landing page.</p>
        </div>
        <Link 
          href="/admin/portfolio/new" 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Item
        </Link>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold">Project Title</th>
                <th className="px-6 py-4 font-semibold">Client</th>
                <th className="px-6 py-4 font-semibold">Industry</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {portfolios.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    No portfolio items found.
                  </td>
                </tr>
              ) : (
                portfolios.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{item.title}</td>
                    <td className="px-6 py-4">{item.client || "N/A"}</td>
                    <td className="px-6 py-4">{item.industry || "N/A"}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/portfolio/${item.id}/edit`}
                          className="text-blue-500 hover:text-blue-700 transition-colors p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/30"
                          title="Edit Portfolio Item"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <form action={async () => {
                          "use server";
                          await deletePortfolioAction(item.id);
                        }}>
                          <button type="submit" className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-md hover:bg-red-50">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
