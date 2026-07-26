import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LifeBuoy, MessageCircle, Clock, CheckCircle2 } from "lucide-react";
import { SupportTicketForm } from "./SupportTicketForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardSupportPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const tickets = userId ? await prisma.supportTicket.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  }) : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">Support Tickets & Inquiries</h1>
        <p className="text-muted-foreground">Submit a ticket to MIKFAH staff for project inquiries, order help, or technical support.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-foreground">Your Tickets History</h3>

          {tickets.length === 0 ? (
            <div className="bg-card border border-border/50 rounded-xl p-10 text-center text-muted-foreground space-y-2">
              <LifeBuoy className="w-10 h-10 text-muted-foreground/50 mx-auto" />
              <p className="font-semibold text-foreground">No support tickets submitted yet</p>
              <p className="text-xs">Use the form on the right to open a ticket whenever you need assistance.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="bg-card border border-border/50 p-5 rounded-xl shadow-sm space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Ticket #{ticket.id.slice(-6).toUpperCase()}
                      </span>
                      <h4 className="font-bold text-base text-foreground mt-0.5">{ticket.subject}</h4>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                      ticket.status === 'RESOLVED' || ticket.status === 'CLOSED' ? 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400' :
                      ticket.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400' :
                      'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400'
                    }`}>
                      {ticket.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ticket.description}</p>
                  <div className="pt-2 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Submitted on {ticket.createdAt.toLocaleDateString()}</span>
                    <span>Assigned to: Support Team</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <SupportTicketForm />
        </div>
      </div>
    </div>
  );
}
