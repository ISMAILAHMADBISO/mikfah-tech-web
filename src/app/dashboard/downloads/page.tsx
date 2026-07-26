import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Download, FileText, ArrowRight, ShieldCheck, Cpu, Wifi } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardDownloadsPage() {
  const productsWithDatasheets = await prisma.product.findMany({
    where: {
      datasheetUrl: { not: null }
    },
    take: 10
  });

  const defaultResources = [
    {
      title: "MIKFAH Smart Farm IoT User Manual",
      version: "v2.4 (2026 Edition)",
      size: "4.2 MB",
      format: "PDF Document",
      url: "#",
      icon: <Cpu className="w-6 h-6 text-primary" />
    },
    {
      title: "ESP32 & LoRa Wireless Sensor Firmware Guide",
      version: "v1.8.0",
      size: "1.8 MB",
      format: "PDF / Binaries",
      url: "#",
      icon: <Wifi className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Automated Irrigation Controller Wiring Schematic",
      version: "Rev C",
      size: "3.5 MB",
      format: "CAD / PDF",
      url: "#",
      icon: <FileText className="w-6 h-6 text-green-500" />
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">Downloads & Technical Resources</h1>
        <p className="text-muted-foreground">Access datasheets, firmware guides, and user manuals for your electronics and IoT devices.</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" /> Official MIKFAH TECH Manuals & Guides
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {defaultResources.map((res, idx) => (
            <div key={idx} className="bg-card border border-border/50 rounded-xl p-5 shadow-sm flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-muted/30 rounded-lg shrink-0">
                  {res.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-foreground">{res.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{res.version}</span>
                    <span>•</span>
                    <span>{res.size}</span>
                  </div>
                </div>
              </div>

              <a 
                href={res.url} 
                className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors shrink-0"
                title="Download Resource"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-border/50">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-foreground">Product Datasheets</h3>
          <Link href="/dashboard/store" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            Browse Store Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {productsWithDatasheets.length === 0 ? (
          <div className="bg-muted/20 border border-border/50 rounded-xl p-8 text-center text-sm text-muted-foreground">
            No product datasheets available for download right now. Explore our store products for technical specs.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productsWithDatasheets.map((p) => (
              <div key={p.id} className="bg-card border border-border/50 rounded-xl p-4 shadow-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded bg-muted/30 flex items-center justify-center shrink-0">
                    {p.images.length > 0 ? (
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover mix-blend-screen rounded" />
                    ) : (
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs text-foreground truncate">{p.name}</h5>
                    <p className="text-[11px] text-muted-foreground uppercase">{p.sku}</p>
                  </div>
                </div>

                <a 
                  href={p.datasheetUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded transition-colors shrink-0"
                  title="Download Datasheet"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
