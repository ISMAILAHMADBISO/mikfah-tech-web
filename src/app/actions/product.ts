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

export async function createProductAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const sku = formData.get("sku") as string;
    const stock = parseInt(formData.get("stock") as string);
    
    const imageFile = formData.get("imageFile") as File | null;
    const uploadedUrl = await saveUploadedFile(imageFile);
    const image = uploadedUrl || (formData.get("image") as string);

    let categoryId = formData.get("categoryId") as string;

    const existingSku = await prisma.product.findUnique({ where: { sku } });
    if (existingSku) {
      return { error: `A product with SKU '${sku}' already exists! Please provide a unique SKU code (e.g. ${sku}-2).` };
    }

    if (!categoryId) {
      let defaultCategory = await prisma.category.findFirst({ where: { name: "General" } });
      if (!defaultCategory) {
        defaultCategory = await prisma.category.create({ data: { name: "General" } });
      }
      categoryId = defaultCategory.id;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        sku,
        stock,
        images: image ? [image] : [],
        categoryId,
      }
    });

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/store");
    return { success: true, product };
  } catch (error: any) {
    console.error("Create Product Error:", error);
    if (error?.code === "P2002" || error?.message?.includes("sku")) {
      return { error: `A product with SKU '${formData.get("sku")}' already exists! Please provide a unique SKU code.` };
    }
    return { error: error.message || "Failed to create product" };
  }
}

export async function updateProductAction(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const sku = formData.get("sku") as string;
    const stock = parseInt(formData.get("stock") as string);
    
    const imageFile = formData.get("imageFile") as File | null;
    const uploadedUrl = await saveUploadedFile(imageFile);
    const image = uploadedUrl || (formData.get("image") as string);

    const existingSku = await prisma.product.findUnique({ where: { sku } });
    if (existingSku && existingSku.id !== id) {
      return { error: `A product with SKU '${sku}' already exists! Please use a unique SKU code.` };
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        sku,
        stock,
        images: image ? [image] : undefined,
      }
    });

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/store");
    return { success: true, product };
  } catch (error: any) {
    console.error("Update Product Error:", error);
    if (error?.code === "P2002" || error?.message?.includes("sku")) {
      return { error: `A product with SKU '${formData.get("sku")}' already exists! Please provide a unique SKU code.` };
    }
    return { error: error.message || "Failed to update product" };
  }
}

export async function deleteProductAction(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    });
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/store");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete product" };
  }
}

