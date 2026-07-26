import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const { pathname } = req.nextUrl;

  // Protect Admin Routes
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login?callbackUrl=" + pathname, req.url));
    if (role !== "SUPER_ADMIN" && role !== "MANAGER") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Protect Staff Routes
  if (pathname.startsWith("/staff")) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login?callbackUrl=" + pathname, req.url));
    if (role !== "SUPER_ADMIN" && role !== "MANAGER" && role !== "SALES_STAFF" && role !== "INVENTORY_STAFF" && role !== "SUPPORT_STAFF") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Protect User Dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login?callbackUrl=" + pathname, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
