"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { UserPlus, Loader2, ArrowLeft } from "lucide-react";
import { createStaffAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function AddStaffPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const res = await createStaffAction(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/admin/staff");
        router.refresh();
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <Link href="/admin/staff" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Staff Management
        </Link>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Add New Staff Member</h1>
        <p className="text-muted-foreground mt-1">Create a new operational account with specific privileges.</p>
      </div>

      <div className="bg-card border border-border/50 rounded-xl shadow-sm p-6 md:p-8">
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-medium p-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <input 
                name="name"
                type="text" 
                required
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
                placeholder="Jane Smith" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <input 
                name="email"
                type="email" 
                required
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
                placeholder="jane@mikfahtech.com" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Account Password</label>
            <input 
              name="password"
              type="password" 
              required
              minLength={8}
              className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
              placeholder="Temporary secure password" 
            />
            <p className="text-xs text-muted-foreground">The staff member can change this later in their settings.</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Assigned Role</label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-start gap-3 p-4 border border-input rounded-lg bg-background cursor-pointer hover:border-primary/50 transition-colors">
                <input type="radio" name="role" value="MANAGER" className="mt-0.5 accent-primary" required />
                <div>
                  <p className="font-semibold text-sm">Manager</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Full access to orders, inventory, and users.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-input rounded-lg bg-background cursor-pointer hover:border-primary/50 transition-colors">
                <input type="radio" name="role" value="SALES_STAFF" className="mt-0.5 accent-primary" required />
                <div>
                  <p className="font-semibold text-sm">Sales Staff</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Can process orders and view customer history.</p>
                </div>
              </label>
              
              <label className="flex items-start gap-3 p-4 border border-input rounded-lg bg-background cursor-pointer hover:border-primary/50 transition-colors">
                <input type="radio" name="role" value="INVENTORY_STAFF" className="mt-0.5 accent-primary" required />
                <div>
                  <p className="font-semibold text-sm">Inventory Staff</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Can update product stock and categories.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border border-input rounded-lg bg-background cursor-pointer hover:border-primary/50 transition-colors">
                <input type="radio" name="role" value="SUPPORT_STAFF" className="mt-0.5 accent-primary" required />
                <div>
                  <p className="font-semibold text-sm">Support Staff</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Handles customer support tickets and inquiries.</p>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50 flex justify-end gap-3">
            <Link href="/admin/staff" className="px-5 py-2.5 rounded-md text-sm font-medium border border-input bg-background hover:bg-muted transition-colors">
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-md text-sm font-medium transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 min-w-[140px]"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><UserPlus className="w-4 h-4" /> Create Account</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
