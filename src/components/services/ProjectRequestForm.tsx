"use client";

import { useState, useTransition } from "react";
import { Send, CheckCircle2, AlertCircle, Upload, FileText, X } from "lucide-react";
import { submitProjectRequestAction } from "@/app/actions/content";

export function ProjectRequestForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

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
        setFileName(null);
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
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary" 
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
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary" 
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
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary" 
            placeholder="+234 900 000 0000" 
            disabled={isPending}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Company / Organization</label>
          <input 
            name="company" 
            type="text" 
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary" 
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
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary cursor-pointer"
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
            <option value="3D Printing & CAD Modeling">3D Printing & CAD Modeling</option>
            <option value="Branding, Banners & Flyers">Branding, Banners & Flyers</option>
            <option value="Custom Souvenirs & Jotters (Graduations, Weddings, Events)">Custom Souvenirs & Jotters (Graduations, Weddings, Events)</option>
            <option value="Final Year Academic Project">Final Year Academic Project</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Estimated Budget (₦) *</label>
          <select 
            required 
            name="budget" 
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary cursor-pointer"
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
          className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary resize-y" 
          placeholder="Please describe your project requirements in detail..."
          disabled={isPending}
        ></textarea>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Upload Files / Schematics (Optional)</label>
        <label className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/10 hover:bg-muted/30 transition-colors cursor-pointer block">
          <input 
            type="file" 
            name="file" 
            className="hidden" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFileName(file.name);
              } else {
                setFileName(null);
              }
            }}
            disabled={isPending}
            accept=".pdf,.docx,.doc,.zip,.jpg,.jpeg,.png"
          />
          {fileName ? (
            <div className="flex items-center justify-center gap-3 text-emerald-600 dark:text-emerald-400 font-medium">
              <FileText className="w-6 h-6" />
              <span>Selected: {fileName}</span>
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setFileName(null);
                  const input = e.currentTarget.parentElement?.previousElementSibling as HTMLInputElement;
                  if (input) input.value = "";
                }}
                className="p-1 hover:bg-emerald-500/20 rounded-full text-emerald-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-70" />
              <p className="text-sm text-muted-foreground font-medium">Click to browse or drag and drop file</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, ZIP, JPG, PNG (Max 10MB)</p>
            </>
          )}
        </label>
      </div>

      <div className="pt-4">
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:transform-none px-8 py-4 rounded-md font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/30 cursor-pointer"
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
