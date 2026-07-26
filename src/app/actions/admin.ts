"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function updateOrderStatusAction(orderId: string, status: string) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session?.user || role === "USER" || !role) {
      return { error: "Unauthorized access: Admin or Staff privileges required." };
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: status as any },
      include: { user: true }
    });

    if (order.user) {
      await prisma.notification.create({
        data: {
          userId: order.userId,
          title: `Order Status Updated: ${status}`,
          message: `Your order #${order.id.slice(-6).toUpperCase()} status has been updated to ${status} by MIKFAH TECH Admin.`
        }
      });
    }

    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    revalidatePath("/dashboard/orders");
    revalidatePath("/dashboard/invoices");
    revalidatePath("/dashboard/notifications");
    return { success: true };
  } catch (error: any) {
    console.error("Update Order Status Error:", error);
    return { error: error.message || "Failed to update order status" };
  }
}

export async function updateTicketStatusAction(ticketId: string, status: string) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session?.user || role === "USER" || !role) {
      return { error: "Unauthorized access" };
    }

    const ticket = await prisma.supportTicket.update({
      where: { id: ticketId },
      data: { status: status as any },
      include: { user: true }
    });

    await prisma.notification.create({
      data: {
        userId: ticket.userId,
        title: `Support Ticket Status: ${status}`,
        message: `Your support ticket "${ticket.subject}" is now marked as ${status}.`
      }
    });

    revalidatePath("/admin/support");
    revalidatePath("/admin");
    revalidatePath("/dashboard/support");
    revalidatePath("/dashboard/notifications");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update ticket status" };
  }
}

export async function updateInquiryStatusAction(inquiryId: string, status: string) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session?.user || role === "USER" || !role) {
      return { error: "Unauthorized access" };
    }

    await prisma.projectRequest.update({
      where: { id: inquiryId },
      data: { status }
    });

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update inquiry status" };
  }
}
