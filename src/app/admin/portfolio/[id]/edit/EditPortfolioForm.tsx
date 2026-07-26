"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { updatePortfolioAction } from "@/app/actions/content";

interface EditPortfolioFormProps {
  portfolio: {
    id: string;
    title: string;
    description: string;
    client: string | null;
    industry: string | null;
    technologies: string[];
    images: string[];
  };
}

export function EditPortfolioForm({ portfolio }: EditPortfolioFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updatePortfolioAction(portfolio.id, formData);
      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/admin/portfolio");
        router.refresh();
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/portfolio" className="p-2 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Edit Portfolio Item</h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-card border border-border p-6 rounded-lg shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Title *</label>
            <input required type="text" name="title" defaultValue={portfolio.title} className="w-full border border-input rounded-md px-4 py-2 bg-transparent" placeholder="e.g. Smart Farm IoT System" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description *</label>
            <textarea required name="description" defaultValue={portfolio.description} rows={5} className="w-full border border-input rounded-md px-4 py-2 bg-transparent resize-y" placeholder="Describe the project..." />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Client Name</label>
              <input type="text" name="client" defaultValue={portfolio.client || ""} className="w-full border border-input rounded-md px-4 py-2 bg-transparent" placeholder="e.g. AgroCorp" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <input type="text" name="industry" defaultValue={portfolio.industry || ""} className="w-full border border-input rounded-md px-4 py-2 bg-transparent" placeholder="e.g. Agriculture" />
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">Project Image (Browse File from Laptop or Enter URL)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted-foreground block mb-1 font-semibold">1. Upload New Image from Laptop:</span>
                  <input type="file" name="imageFile" accept="image/*" className="w-full border border-input rounded-md px-3 py-1.5 bg-transparent text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block mb-1 font-semibold">2. Or Paste Image URL:</span>
                  <input type="text" name="image" defaultValue={portfolio.images[0] || ""} className="w-full border border-input rounded-md px-4 py-2 bg-transparent text-sm" placeholder="https://example.com/project.png" />
                </div>
              </div>
            </div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-medium">Technologies Used (comma separated)</label>
              <input type="text" name="technologies" defaultValue={portfolio.technologies.join(", ")} className="w-full border border-input rounded-md px-4 py-2 bg-transparent" placeholder="e.g. ESP32, React, Node.js" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/portfolio" className="px-6 py-3 border border-input rounded-md font-medium hover:bg-muted transition-colors">
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={isPending}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
