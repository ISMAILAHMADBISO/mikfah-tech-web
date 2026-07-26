"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleStockAction(productId: string, inStock: boolean) {
  try {
    await prisma.product.update({
      where: { id: productId },
      data: {
        stock: inStock ? 100 : 0 // Simple 100 or 0 for now based on "In Stock" vs "Out of Stock"
      }
    });
    
    // Revalidate paths where products are shown
    revalidatePath("/admin/products");
    revalidatePath("/staff/products");
    revalidatePath("/shop");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle stock:", error);
    return { error: "Failed to update stock. Please try again." };
  }
}
