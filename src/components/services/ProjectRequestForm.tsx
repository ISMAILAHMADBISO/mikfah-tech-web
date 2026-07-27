"use client";

import { useState, useTransition } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitProjectRequestAction } from "@/app/actions/content";

export function ProjectRequestForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await submitProjectRequestAction(formData);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-6 rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-8 h-8 shrink-0 text-emerald-500" />
          <div>
            <h4 className="font-bold text-lg">Project Request Submitted!</h4>
            <p className="text-sm opacity-90 mt-0.5">
              Thank you! Your requirements have been logged to our engineering dashboard. Our team will review and get back to you within 24-48 business hours.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name *</label>
          <input 
            required 
            name="name" 
            type="text" 
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
            placeholder="John Doe" 
            disabled={isPending}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email Address *</label>
          <input 
            required 
            name="email" 
            type="email" 
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
            placeholder="john@company.com" 
            disabled={isPending}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number *</label>
          <input 
            required 
            name="phone" 
            type="tel" 
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
            placeholder="+234 900 000 0000" 
            disabled={isPending}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Company / Organization</label>
          <input 
            name="company" 
            type="text" 
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
            placeholder="Optional" 
            disabled={isPending}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Project Type *</label>
          <select 
            required 
            name="projectType" 
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
            disabled={isPending}
          >
            <option value="">Select a service category</option>
            <option value="Website Development">Website Development</option>
            <option value="Custom Software Development">Custom Software Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="IoT & Embedded Systems">IoT & Embedded Systems</option>
            <option value="PCB Design & Prototyping">PCB Design & Prototyping</option>
            <option value="AI / Machine Learning">AI / Machine Learning</option>
            <option value="Industrial Automation">Industrial Automation</option>
            <option value="Final Year Academic Project">Final Year Academic Project</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Estimated Budget (₦) *</label>
          <select 
            required 
            name="budget" 
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
            disabled={isPending}
          >
            <option value="">Select budget range</option>
            <option value="50k-200k">₦50,000 - ₦200,000</option>
            <option value="200k-500k">₦200,000 - ₦500,000</option>
            <option value="500k-2m">₦500,000 - ₦2,000,000</option>
            <option value="2m+">₦2,000,000+</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Project Description *</label>
        <textarea 
          required 
          name="description" 
          rows={5} 
          className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-y" 
          placeholder="Please describe your project requirements in detail..."
          disabled={isPending}
        ></textarea>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Upload Files / Schematics (Optional)</label>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/10 hover:bg-muted/30 transition-colors cursor-pointer">
          <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, ZIP, JPG, PNG (Max 10MB)</p>
        </div>
      </div>

      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 px-8 py-4 rounded-md font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
        >
          <Send className="h-5 w-5" /> {isPending ? "Submitting Request..." : "Submit Project Request"}
        </button>
        <p className="text-xs text-muted-foreground mt-4 text-center sm:text-left">
          By submitting this form, you agree to our Privacy Policy. Our team typically responds within 24-48 business hours.
        </p>
      </div>
    </form>
  );
}
