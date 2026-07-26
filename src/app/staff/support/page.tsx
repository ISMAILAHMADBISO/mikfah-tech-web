"use client";

import { useState } from "react";
import { LifeBuoy, MessageSquare, CheckCircle, AlertTriangle, User, Clock } from "lucide-react";

const initialTickets = [
  {
    id: "TCK-4012",
    subject: "Inverter Battery Not Charging Above 80%",
    customer: "Engr. Usman Bello",
    category: "Solar Division",
    priority: "High",
    status: "Open",
    time: "30 mins ago"
  },
  {
    id: "TCK-4011",
    subject: "OTDR Splicing Loss Query on Backbone Cable",
    customer: "Skyline Telecom Ltd",
    category: "Fiber Terminations",
    priority: "Urgent",
    status: "In Progress",
    time: "3 hours ago"
  },
  {
    id: "TCK-4010",
    subject: "ESP32 Pinout Documentation Request",
    customer: "David Johnson",
    category: "Component Store",
    priority: "Normal",
    status: "Resolved",
    time: "1 day ago"
  }
];

export default function StaffSupportPage() {
  const [tickets, setTickets] = useState(initialTickets);

  const toggleStatus = (id: string) => {
    setTickets(tickets.map(t => {
      if (t.id === id) {
        const next = t.status === "Open" ? "In Progress" : t.status === "In Progress" ? "Resolved" : "Open";
        return { ...t, status: next };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <LifeBuoy className="w-6 h-6 text-primary" /> Technical Support & Inquiries
        </h1>
        <p className="text-sm text-muted-foreground">Respond to client technical assistance requests across Solar, Fiber, and Hardware divisions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">Open Tickets</p>
            <h3 className="text-3xl font-extrabold text-foreground mt-1">
              {tickets.filter(t => t.status !== "Resolved").length}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">Resolved Today</p>
            <h3 className="text-3xl font-extrabold text-green-600 mt-1">
              {tickets.filter(t => t.status === "Resolved").length}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">Avg. Response Time</p>
            <h3 className="text-3xl font-extrabold text-primary mt-1">14 mins</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 bg-muted/30 border-b border-border/50 font-bold text-sm text-foreground">
          Recent Ticket Queue
        </div>
        <div className="divide-y divide-border/50">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-6 hover:bg-muted/10 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-primary text-xs">{ticket.id}</span>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded font-semibold text-muted-foreground">{ticket.category}</span>
                  <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded ${
                    ticket.priority === "Urgent" ? "bg-red-500/20 text-red-600" :
                    ticket.priority === "High" ? "bg-orange-500/20 text-orange-600" : "bg-blue-500/20 text-blue-600"
                  }`}>{ticket.priority}</span>
                </div>
                <h4 className="font-bold text-base text-foreground">{ticket.subject}</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> {ticket.customer} &bull; <Clock className="w-3.5 h-3.5 inline" /> {ticket.time}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  ticket.status === "Resolved" ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400" :
                  ticket.status === "In Progress" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400" :
                  "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                }`}>
                  {ticket.status}
                </span>

                <button
                  type="button"
                  onClick={() => toggleStatus(ticket.id)}
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
                >
                  Advance Status &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
