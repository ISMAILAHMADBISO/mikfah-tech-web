"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { UserPlus, Loader2 } from "lucide-react";
import { signupAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      if (formData.get("password") !== formData.get("confirmPassword")) {
        return { error: "Passwords do not match." };
      }
      return await signupAction(prevState, formData);
    },
    null
  );

  useEffect(() => {
    if (state?.success) {
      router.push("/login?registered=true");
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-screen" />
      
      <div className="relative z-10 w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden p-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
            &larr; Back to Home Page
          </Link>
          <img src="/logo.jpg" alt="MIKFAH TECH LTD" className="h-8 w-auto rounded object-contain" />
        </div>
        <div className="text-center mb-8">
          <img src="/logo.jpg" alt="MIKFAH TECH LTD Logo" className="h-16 w-auto mx-auto mb-4 rounded-xl object-contain shadow-sm border border-border/40" />
          <h1 className="text-2xl font-bold text-foreground">Create an Account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join MIKFAH TECH today</p>
        </div>

        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-medium p-3 rounded-md mb-6 text-center">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <input 
              name="name"
              type="text" 
              required
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
              placeholder="John Doe" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
              placeholder="john@example.com" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone Number (WhatsApp / Contact Line)</label>
            <input 
              name="phone"
              type="tel" 
              required
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
              placeholder="e.g. 09067285522" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input 
              name="password"
              type="password" 
              required
              minLength={8}
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
              placeholder="••••••••" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Confirm Password</label>
            <input 
              name="confirmPassword"
              type="password" 
              required
              minLength={8}
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-md py-3 font-bold transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground border-t border-border/50 pt-6">
          Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
