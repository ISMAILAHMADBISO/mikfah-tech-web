"use client";

import { useState, useTransition } from "react";
import { updateTicketStatusAction } from "@/app/actions/admin";
import { Loader2, ShieldAlert, User, Calendar, MessageSquare, CheckCircle } from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: string;
  createdAt: Date;
  user: {
    name: string;
    email: string;
    phone: string | null;
  } | null;
}

export function SupportTable({ tickets }: { tickets: Ticket[] }) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setUpdatingId(ticketId);
    startTransition(async () => {
      await updateTicketStatusAction(ticketId, newStatus);
      setUpdatingId(null);
    });
  };

  if (tickets.length === 0) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-12 text-center text-muted-foreground">
        No customer support tickets opened yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tickets.map((t) => (
        <div key={t.id} className="bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:border-primary/40 transition-all flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-base text-foreground">Ticket #{t.id.slice(-6).toUpperCase()}: {t.subject}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto md:ml-0">
                <Calendar className="w-3.5 h-3.5" /> {new Date(t.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 font-semibold text-foreground"><User className="w-3.5 h-3.5 text-primary" /> {t.user?.name || "Customer"}</span>
              <span>({t.user?.email})</span>
              {t.user?.phone && <span className="text-primary font-medium">{t.user.phone}</span>}
            </div>

            <div className="bg-muted/20 p-4 rounded-lg border border-border/30 text-sm text-foreground leading-relaxed">
              <p className="font-semibold text-xs text-muted-foreground uppercase mb-1 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" /> Issue Description:
              </p>
              {t.description}
            </div>
          </div>

          <div className="flex md:flex-col justify-between md:justify-start items-center md:items-end gap-3 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-border/50">
            <span className="text-xs text-muted-foreground uppercase font-semibold">Status</span>
            <select
              disabled={updatingId === t.id && isPending}
              value={t.status}
              onChange={(e) => handleStatusChange(t.id, e.target.value)}
              className={`text-xs font-bold px-3.5 py-2 rounded-lg border focus:outline-none cursor-pointer ${
                t.status === 'RESOLVED' || t.status === 'CLOSED' ? 'bg-green-500/10 text-green-500 border-green-500/30' :
                t.status === 'IN_PROGRESS' ? 'bg-blue-500/10 text-blue-500 border-blue-500/30' :
                'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
              }`}
            >
              <option value="OPEN" className="bg-background text-foreground font-semibold">OPEN</option>
              <option value="IN_PROGRESS" className="bg-background text-foreground font-semibold">IN PROGRESS</option>
              <option value="RESOLVED" className="bg-background text-foreground font-semibold">RESOLVED</option>
              <option value="CLOSED" className="bg-background text-foreground font-semibold">CLOSED</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
