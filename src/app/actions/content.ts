"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

async function saveUploadedFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0 || !file.name) return null;
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${Date.now()}-${cleanName}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.promises.mkdir(uploadDir, { recursive: true });
    await fs.promises.writeFile(path.join(uploadDir, fileName), buffer);
    return `/uploads/${fileName}`;
  } catch (err) {
    console.error("Failed to save uploaded file:", err);
    return null;
  }
}

export async function createPortfolioAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const client = formData.get("client") as string;
    const industry = formData.get("industry") as string;
    
    const imageFile = formData.get("imageFile") as File | null;
    const uploadedUrl = await saveUploadedFile(imageFile);
    const image = uploadedUrl || (formData.get("image") as string);

    const technologiesStr = formData.get("technologies") as string;
    
    if (!title || !description) return { error: "Title and description are required" };

    const technologies = technologiesStr ? technologiesStr.split(",").map(t => t.trim()) : [];

    await prisma.portfolio.create({
      data: {
        title,
        description,
        client,
        industry,
        images: image ? [image] : [],
        technologies,
      }
    });

    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create portfolio item" };
  }
}

export async function updatePortfolioAction(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const client = formData.get("client") as string;
    const industry = formData.get("industry") as string;
    
    const imageFile = formData.get("imageFile") as File | null;
    const uploadedUrl = await saveUploadedFile(imageFile);
    const image = uploadedUrl || (formData.get("image") as string);

    const technologiesStr = formData.get("technologies") as string;
    
    if (!title || !description) return { error: "Title and description are required" };

    const technologies = technologiesStr ? technologiesStr.split(",").map(t => t.trim()) : undefined;

    await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        description,
        client,
        industry,
        images: image ? [image] : undefined,
        technologies,
      }
    });

    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update portfolio item" };
  }
}

export async function deletePortfolioAction(id: string) {
  try {
    await prisma.portfolio.delete({ where: { id } });
    revalidatePath("/admin/portfolio");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete portfolio item" };
  }
}

export async function createBlogAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    
    const imageFile = formData.get("imageFile") as File | null;
    const uploadedUrl = await saveUploadedFile(imageFile);
    const imageUrl = uploadedUrl || (formData.get("imageUrl") as string);

    const authorId = formData.get("authorId") as string;

    if (!title || !content || !authorId) return { error: "Title, content, and author are required" };

    // Simple slug generator
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    await prisma.blog.create({
      data: {
        title,
        content,
        slug,
        imageUrl,
        authorId,
        published: true
      }
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create blog post" };
  }
}

export async function updateBlogAction(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    
    const imageFile = formData.get("imageFile") as File | null;
    const uploadedUrl = await saveUploadedFile(imageFile);
    const imageUrl = uploadedUrl || (formData.get("imageUrl") as string);

    if (!title || !content) return { error: "Title and content are required" };

    await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl: imageUrl ? imageUrl : undefined,
      }
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update blog post" };
  }
}

export async function deleteBlogAction(id: string) {
  try {
    await prisma.blog.delete({ where: { id } });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete blog post" };
  }
}

export async function submitProjectRequestAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = (formData.get("company") as string) || "";
    const projectType = formData.get("projectType") as string;
    const budget = (formData.get("budget") as string) || "";
    const description = formData.get("description") as string;

    if (!name || !email || !phone || !projectType || !description) {
      return { error: "Please fill in all required fields." };
    }

    await prisma.projectRequest.create({
      data: {
        name,
        email,
        phone,
        company,
        projectType,
        budget,
        description,
        fileUrls: [],
        status: "PENDING"
      }
    });

    // Notify all admin users
    const admins = await prisma.user.findMany({
      where: { role: { in: ["SUPER_ADMIN", "MANAGER"] } }
    });

    for (const admin of admins) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          title: "New Custom Project Inquiry!",
          message: `New ${projectType} request from ${name} (${email}). Budget: ₦${budget}.`
        }
      });
    }

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Project request error:", error);
    return { error: error.message || "Failed to submit project request." };
  }
}
