"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Loader2, LogOut, ArrowRight, UserCheck } from "lucide-react";
import { loginAction } from "@/app/actions/auth";
import { useSession, signOut } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();
  const [state, formAction, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.success) {
      window.location.href = state.redirectUrl || "/dashboard";
    }
  }, [state]);

  const getPortalUrl = (role?: string) => {
    if (role === "SUPER_ADMIN" || role === "MANAGER") return "/admin";
    if (role && ["SALES_STAFF", "INVENTORY_STAFF", "SUPPORT_STAFF"].includes(role)) return "/staff";
    return "/dashboard";
  };

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

        {/* If user is already logged in, show Account Switcher */}
        {session?.user ? (
          <div className="bg-muted/30 border border-primary/30 rounded-xl p-6 mb-8 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg mx-auto mb-3">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-1">Currently Signed In</h3>
            <p className="text-xs text-muted-foreground mb-4">
              You are logged in as <span className="font-semibold text-foreground">{session.user.email}</span> <br />
              <span className="inline-block mt-1 px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[10px]">
                ROLE: {session.user.role || "USER"}
              </span>
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href={getPortalUrl(session.user.role)}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                Proceed to My Portal <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full bg-background hover:bg-destructive/10 hover:text-destructive text-muted-foreground py-2.5 rounded-lg font-semibold text-xs transition-colors border border-border flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out & Switch Account
              </button>
            </div>
            <div className="my-6 border-t border-border/50 relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                Or Log In As Another User
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center mb-8">
            <img src="/logo.jpg" alt="MIKFAH TECH LTD Logo" className="h-16 w-auto mx-auto mb-4 rounded-xl object-contain shadow-sm border border-border/40" />
            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your MIKFAH TECH account</p>
          </div>
        )}

        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-medium p-3 rounded-md mb-6 text-center">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
              defaultValue="admin@mikfahtech.com"
              placeholder="Enter your email" 
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <input 
              name="password"
              type="password" 
              required
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-md py-3 font-bold transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground border-t border-border/50 pt-6">
          Don't have an account? <Link href="/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
