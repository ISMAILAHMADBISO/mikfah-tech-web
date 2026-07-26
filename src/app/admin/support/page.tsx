import { prisma } from "@/lib/prisma";
import { SupportTable } from "./SupportTable";

export const dynamic = "force-dynamic";

export default async function AdminSupportPage() {
  const tickets = await prisma.supportTicket.findMany({
    include: {
      user: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Support Tickets</h1>
          <p className="text-muted-foreground mt-1">Manage customer assistance requests, order issues, and technical support cases.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-sm">
          Total Tickets: {tickets.length}
        </div>
      </div>

      <SupportTable tickets={tickets} />
    </div>
  );
}
