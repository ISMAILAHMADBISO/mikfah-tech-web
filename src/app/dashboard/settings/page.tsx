import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SettingsForm } from "./SettingsForm";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardSettingsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account details, phone contact, and login password.</p>
      </div>

      <SettingsForm user={user} />
    </div>
  );
}
