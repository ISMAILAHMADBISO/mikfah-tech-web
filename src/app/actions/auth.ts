"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function loginAction(prevState: any, formData: FormData) {
  try {
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const password = (formData.get("password") as string)?.trim();

    const user = await prisma.user.findUnique({ where: { email } });
    let redirectUrl = "/dashboard";
    if (user?.role === "SUPER_ADMIN" || user?.role === "MANAGER") {
      redirectUrl = "/admin";
    } else if (user?.role && ["SALES_STAFF", "INVENTORY_STAFF", "SUPPORT_STAFF"].includes(user.role)) {
      redirectUrl = "/staff";
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectUrl,
    });
    
    return { success: true, redirectUrl };
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT") || error?.message?.includes("NEXT_REDIRECT") || error?.message === "NEXT_REDIRECT") {
      throw error;
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password.' };
        default:
          return { error: 'Something went wrong.' };
      }
    }
    if (error.message?.includes("Timed out") || error.message?.includes("connect")) {
      return { error: 'Database connection timed out. Please try again.' };
    }
    console.error("Login Action Error:", error);
    return { error: 'Internal Server Error: ' + (error.message || String(error)) };
  }
}

export async function signupAction(prevState: any, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const phone = (formData.get("phone") as string)?.trim();
  const password = (formData.get("password") as string)?.trim();

  if (!name || !email || !password) return { error: "Missing fields" };
  if (password.length < 8) return { error: "Password must be at least 8 characters" };

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: "User already exists with this email" };

    const passwordHash = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        passwordHash,
        role: "USER"
      }
    });

    return { success: true };
  } catch (error: any) {
    if (error.message?.includes("Timed out") || error.message?.includes("connect")) {
      return { error: 'Database connection timed out. Please try again.' };
    }
    return { error: 'Failed to create account. Please try again later.' };
  }
}

export async function createStaffAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = (formData.get("password") as string)?.trim();
  const role = formData.get("role") as any;

  if (!name || !email || !password || !role) return { error: "Missing fields" };
  if (password.length < 8) return { error: "Password must be at least 8 characters" };

  const validRoles = ["MANAGER", "SALES_STAFF", "INVENTORY_STAFF", "SUPPORT_STAFF"];
  if (!validRoles.includes(role)) return { error: "Invalid role selected" };

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: "User already exists with this email" };

    const passwordHash = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role
      }
    });

    revalidatePath("/admin/staff");
    return { success: true };
  } catch (error: any) {
    if (error.message?.includes("Timed out") || error.message?.includes("connect")) {
      return { error: 'Database connection timed out. Please try again.' };
    }
    return { error: 'Failed to create staff account. Please try again later.' };
  }
}
