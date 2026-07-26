import { prisma } from "@/lib/prisma";
import { InquiryTable } from "./InquiryTable";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.projectRequest.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Project Inquiries</h1>
          <p className="text-muted-foreground mt-1">Review custom IoT PCB development requests, firmware inquiries, and engineering consultations.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-sm">
          Total Inquiries: {inquiries.length}
        </div>
      </div>

      <InquiryTable inquiries={inquiries as any} />
    </div>
  );
}
