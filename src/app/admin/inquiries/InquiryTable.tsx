"use client";

import { useState, useTransition } from "react";
import { updateInquiryStatusAction } from "@/app/actions/admin";
import { Loader2, Mail, Phone, Calendar, MessageSquare, CheckCircle, Clock } from "lucide-react";

interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  projectType: string | null;
  description: string;
  status: string;
  createdAt: Date;
}

export function InquiryTable({ inquiries }: { inquiries: ProjectInquiry[] }) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (inquiryId: string, newStatus: string) => {
    setUpdatingId(inquiryId);
    startTransition(async () => {
      await updateInquiryStatusAction(inquiryId, newStatus);
      setUpdatingId(null);
    });
  };

  if (inquiries.length === 0) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-12 text-center text-muted-foreground">
        No project inquiries received yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {inquiries.map((inq) => (
        <div key={inq.id} className="bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:border-primary/40 transition-all flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bold text-base text-foreground">{inq.name}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs">
                {inq.projectType || "General Engineering"}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto md:ml-0">
                <Calendar className="w-3.5 h-3.5" /> {new Date(inq.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-foreground" /> {inq.email}</span>
              {inq.phone && <span className="flex items-center gap-1 font-medium text-primary"><Phone className="w-3.5 h-3.5" /> {inq.phone}</span>}
            </div>

            <div className="bg-muted/20 p-4 rounded-lg border border-border/30 text-sm text-foreground leading-relaxed">
              <p className="font-semibold text-xs text-muted-foreground uppercase mb-1 flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" /> Project Specification:
              </p>
              {inq.description}
            </div>
          </div>

          <div className="flex md:flex-col justify-between md:justify-start items-center md:items-end gap-3 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-border/50">
            <span className="text-xs text-muted-foreground uppercase font-semibold">Status</span>
            <select
              disabled={updatingId === inq.id && isPending}
              value={inq.status}
              onChange={(e) => handleStatusChange(inq.id, e.target.value)}
              className={`text-xs font-bold px-3.5 py-2 rounded-lg border focus:outline-none cursor-pointer ${
                inq.status === 'RESOLVED' || inq.status === 'CLOSED' ? 'bg-green-500/10 text-green-500 border-green-500/30' :
                inq.status === 'IN_PROGRESS' ? 'bg-blue-500/10 text-blue-500 border-blue-500/30' :
                'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
              }`}
            >
              <option value="NEW" className="bg-background text-foreground font-semibold">NEW</option>
              <option value="IN_PROGRESS" className="bg-background text-foreground font-semibold">IN PROGRESS</option>
              <option value="RESOLVED" className="bg-background text-foreground font-semibold">RESOLVED / CONTACTED</option>
              <option value="CLOSED" className="bg-background text-foreground font-semibold">CLOSED</option>
            </select>

            <a
              href={`mailto:${inq.email}?subject=Regarding Your MIKFAH TECH Project Inquiry: ${inq.projectType || 'Engineering Request'}`}
              className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" /> Reply via Email
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
