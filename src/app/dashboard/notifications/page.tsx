import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Bell, CheckCircle2, AlertCircle, Info, Clock } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardNotificationsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const notifications = userId ? await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  }) : [];

  const systemAnnouncements = [
    {
      id: "sys-1",
      title: "Welcome to MIKFAH TECH Customer Portal!",
      message: "Thank you for creating an account. You can now browse our catalog and track orders directly from your dashboard.",
      createdAt: new Date(),
      type: "info"
    },
    {
      id: "sys-2",
      title: "WhatsApp Ordering & Customer Support Available 24/7",
      message: "Need instant assistance? Our WhatsApp support channel is always open for quick order confirmations and project consultations.",
      createdAt: new Date(Date.now() - 3600000 * 24),
      type: "success"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">Notifications & Updates</h1>
        <p className="text-muted-foreground">Stay informed about your orders, support tickets, and system announcements.</p>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className="bg-card border border-border/50 p-5 rounded-xl shadow-sm flex items-start gap-4">
            <div className="p-2.5 bg-primary/10 text-primary rounded-lg shrink-0 mt-0.5">
              <Bell className="w-5 h-5" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-bold text-sm text-foreground">{notif.title}</h4>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3" /> {notif.createdAt.toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{notif.message}</p>
            </div>
          </div>
        ))}

        {systemAnnouncements.map((ann) => (
          <div key={ann.id} className="bg-card border border-border/50 p-5 rounded-xl shadow-sm flex items-start gap-4">
            <div className={`p-2.5 rounded-lg shrink-0 mt-0.5 ${ann.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
              {ann.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-bold text-sm text-foreground">{ann.title}</h4>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3" /> {ann.createdAt.toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{ann.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
