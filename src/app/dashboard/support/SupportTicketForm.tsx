"use client";

import { useState, useTransition } from "react";
import { Send, Loader2, Check } from "lucide-react";
import { submitSupportTicketAction } from "@/app/actions/user";

export function SupportTicketForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const res = await submitSupportTicketAction(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        form.reset();
        setTimeout(() => setSuccess(false), 5000);
      }
    });
  };

  return (
    <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm sticky top-24 space-y-6">
      <div>
        <h3 className="font-bold text-lg text-foreground">Open a New Ticket</h3>
        <p className="text-xs text-muted-foreground mt-1">Our team typically responds within 2-4 business hours.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-xs p-3 rounded-md flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>Ticket created! Our support team has been notified.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Subject *</label>
          <input 
            required 
            type="text" 
            name="subject" 
            className="w-full border border-input rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
            placeholder="e.g. Order Delivery Update / Custom Project"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Description *</label>
          <textarea 
            required 
            name="description" 
            rows={5} 
            className="w-full border border-input rounded-md px-3 py-2 bg-background text-sm resize-y focus:outline-none focus:ring-1 focus:ring-primary" 
            placeholder="Please provide details about your request..."
          />
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2.5 rounded-md text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
        >
          {isPending ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting Ticket...</>
          ) : (
            <><Send className="w-4 h-4" /> Submit Ticket</>
          )}
        </button>
      </form>
    </div>
  );
}
