"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function createDirectOrderAction(productId: string, quantity: number = 1) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Please log in to place an order" };

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return { error: "Product not found" };

    const totalAmount = product.price * quantity;

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: "PENDING",
        totalAmount,
        shippingCost: 0,
        tax: 0,
        items: {
          create: [
            {
              productId: product.id,
              quantity,
              price: product.price
            }
          ]
        },
        invoice: {
          create: {
            invoiceUrl: `/dashboard/invoices`
          }
        }
      }
    });

    // Create a notification for the buyer
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Order Placed Successfully!",
        message: `We have received your order (#${order.id.slice(-6).toUpperCase()}) for ${product.name}. Our team is processing it.`
      }
    });

    revalidatePath("/dashboard/orders");
    revalidatePath("/dashboard/invoices");
    revalidatePath("/dashboard/notifications");
    revalidatePath("/admin/orders");
    return { success: true, orderId: order.id };
  } catch (error: any) {
    console.error("Order Creation Error:", error);
    return { error: error.message || "Failed to place order" };
  }
}

export async function createCartOrderAction(items: { id: string; name: string; price: number; quantity: number }[], paymentMethod: string = "Bank Deposit") {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Please log in to place an order from cart" };

    if (!items || items.length === 0) return { error: "Your cart is empty" };

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = 3500;

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: "PENDING",
        totalAmount,
        shippingCost,
        tax: 0,
        items: {
          create: items.map(i => ({
            productId: i.id,
            quantity: i.quantity,
            price: i.price
          }))
        },
        invoice: {
          create: {
            invoiceUrl: `/dashboard/invoices`
          }
        },
        payment: {
          create: {
            amount: totalAmount + shippingCost,
            paymentMethod,
            status: "PENDING"
          }
        }
      }
    });

    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: `Order #${order.id.slice(-6).toUpperCase()} Placed Successfully!`,
        message: `Your cart order containing ${items.length} item(s) totaling ₦${(totalAmount + shippingCost).toLocaleString()} has been submitted. You can track its processing in My Orders.`
      }
    });

    revalidatePath("/dashboard/orders");
    revalidatePath("/dashboard/invoices");
    revalidatePath("/dashboard/notifications");
    revalidatePath("/admin/orders");
    return { success: true, orderId: order.id };
  } catch (error: any) {
    console.error("Cart Order Error:", error);
    return { error: error.message || "Failed to place cart order" };
  }
}

export async function toggleWishlistAction(productId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Please log in to manage wishlist" };

    let wishlist = await prisma.wishlist.findUnique({
      where: { userId: session.user.id },
      include: { items: true }
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId: session.user.id },
        include: { items: true }
      });
    }

    const existingItem = wishlist.items.find(i => i.productId === productId);

    if (existingItem) {
      await prisma.wishlistItem.delete({ where: { id: existingItem.id } });
    } else {
      await prisma.wishlistItem.create({
        data: {
          wishlistId: wishlist.id,
          productId
        }
      });
    }

    revalidatePath("/dashboard/wishlist");
    revalidatePath("/dashboard/store");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update wishlist" };
  }
}

export async function submitSupportTicketAction(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Please log in to submit a ticket" };

    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;

    if (!subject || !description) return { error: "Subject and description are required" };

    await prisma.supportTicket.create({
      data: {
        userId: session.user.id,
        subject,
        description,
        status: "OPEN"
      }
    });

    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Support Ticket Opened",
        message: `Your ticket regarding "${subject}" has been submitted to MIKFAH support.`
      }
    });

    revalidatePath("/dashboard/support");
    revalidatePath("/dashboard/notifications");
    revalidatePath("/admin/support");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create support ticket" };
  }
}

export async function updateProfileSettingsAction(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Not authenticated" };

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    const dataToUpdate: any = { name, phone: phone || null };

    if (password && password.trim().length > 0) {
      if (password.length < 8) return { error: "Password must be at least 8 characters" };
      dataToUpdate.passwordHash = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: dataToUpdate
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update profile settings" };
  }
}

export async function markOrderPaidByCustomerAction(orderId: string, reference: string = "Bank Transfer Paid") {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Please log in" };

    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });
    if (!order || order.userId !== session.user.id) return { error: "Order not found" };

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "AWAYTING_PAYMENT" as any }
    });

    await prisma.payment.upsert({
      where: { orderId },
      update: { status: "PENDING" as any, reference, paymentMethod: "Bank Transfer" },
      create: {
        orderId,
        amount: order.totalAmount + (order.shippingCost || 0),
        status: "PENDING" as any,
        reference,
        paymentMethod: "Bank Transfer"
      }
    });

    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Payment Evidence Submitted!",
        message: `We have received your transfer evidence (${reference}) for order #${order.id.slice(-6).toUpperCase()}. Admin is verifying your payment.`
      }
    });

    revalidatePath("/dashboard/orders");
    revalidatePath("/dashboard/invoices");
    revalidatePath("/dashboard/notifications");
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error: any) {
    console.error("Mark Paid Error:", error);
    return { error: error.message || "Failed to submit payment evidence" };
  }
}
