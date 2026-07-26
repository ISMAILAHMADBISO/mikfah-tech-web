"use client";

import { useState, useTransition } from "react";
import { Save, Loader2, Check } from "lucide-react";
import { updateProfileSettingsAction } from "@/app/actions/user";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
}

export function SettingsForm({ user }: { user: User }) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateProfileSettingsAction(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border/50 rounded-xl p-6 md:p-8 shadow-sm">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3.5 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-3.5 rounded-md flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-muted-foreground">Full Name *</label>
          <input 
            required
            type="text" 
            name="name" 
            defaultValue={user.name} 
            className="w-full border border-input rounded-md px-3.5 py-2 bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-muted-foreground">Email Address (ReadOnly)</label>
          <input 
            disabled
            type="email" 
            defaultValue={user.email} 
            className="w-full border border-input rounded-md px-3.5 py-2 bg-muted/30 text-muted-foreground text-sm cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-muted-foreground">Phone Number</label>
          <input 
            type="tel" 
            name="phone" 
            defaultValue={user.phone || ""} 
            placeholder="+234 906 728 5522"
            className="w-full border border-input rounded-md px-3.5 py-2 bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-muted-foreground">Account Role</label>
          <div className="px-3.5 py-2 border border-input rounded-md bg-muted/20 font-semibold text-sm text-foreground uppercase">
            {user.role}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border/50 space-y-2">
        <label className="text-xs font-semibold uppercase text-muted-foreground">New Password (Optional)</label>
        <input 
          type="password" 
          name="password" 
          minLength={8}
          placeholder="Leave blank to keep current password"
          className="w-full max-w-sm block border border-input rounded-md px-3.5 py-2 bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground">Enter a password of at least 8 characters if you wish to change it.</p>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-md font-bold text-sm flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
        >
          {isPending ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...</>
          ) : (
            <><Save className="w-4 h-4" /> Save Changes</>
          )}
        </button>
      </div>
    </form>
  );
}
