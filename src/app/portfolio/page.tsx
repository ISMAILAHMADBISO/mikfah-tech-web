import Link from "next/link";
import { ArrowRight, Code, Cpu, Smartphone } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const defaultProjects = [
  {
    id: "agroguard",
    title: "Agroguard Smart Agriculture Platform",
    client: "Agroguard",
    industry: "Agriculture",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1592982537447-6f2334208f34?auto=format&fit=crop&q=80&w=600",
    description: "agroguard.tech: An intelligent crop monitoring and predictive yield platform empowering modern farmers with real-time data insights.",
    tech: ["Next.js", "AI Analytics", "PostgreSQL", "Tailwind CSS"],
    icon: <Cpu className="w-5 h-5" />
  },
  {
    id: "fintech-app",
    title: "Secure Payment Gateway Integration",
    client: "PayFast Africa",
    industry: "Financial Technology",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=600",
    description: "A high-availability enterprise web application processing thousands of transactions daily. Built with Next.js and robust backend microservices.",
    tech: ["Next.js", "TypeScript", "Go", "PostgreSQL", "Docker"],
    icon: <Code className="w-5 h-5" />
  },
  {
    id: "health-monitor",
    title: "Wearable Health Monitor Prototype",
    client: "MediCare Solutions",
    industry: "Healthcare",
    category: "PCB Design",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600",
    description: "Custom multi-layer PCB design for a compact wearable health monitor measuring heart rate, SpO2, and temperature, featuring ultra-low power consumption.",
    tech: ["Altium Designer", "STM32", "BLE 5.0", "C++"],
    icon: <Smartphone className="w-5 h-5" />
  }
];

export default async function PortfolioPage() {
  let dbPortfolios: any[] = [];
  try {
    dbPortfolios = await prisma.portfolio.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Error loading portfolios:", error);
  }

  const displayProjects = dbPortfolios.length > 0 ? dbPortfolios.map(p => ({
    id: p.id,
    title: p.title,
    client: p.client || "Enterprise Client",
    industry: p.industry || "Technology",
    category: "Engineering Deployment",
    image: p.images[0] || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    description: p.description,
    tech: p.technologies,
    icon: <Cpu className="w-5 h-5" />
  })) : defaultProjects;

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Our Portfolio</h1>
          <p className="text-lg text-muted-foreground">
            Explore a selection of our successful projects. From custom hardware design to enterprise software applications, see how MIKFAH TECH LTD delivers excellence.
          </p>
        </div>
        
        <div className="flex gap-2">
          {['All', 'IoT & Embedded', 'Web App', 'PCB Design'].map((filter, i) => (
            <button key={i} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProjects.map((project) => (
          <div key={project.id} className="group flex flex-col bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                {project.icon} {project.category}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-primary font-medium tracking-wider uppercase">{project.industry}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 flex-1">
                {project.description}
              </p>
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech: any, i: number) => (
                    <span key={i} className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded-md border border-border/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <Link href={`/portfolio/${project.id}`} className="mt-auto flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors group/link w-max">
                View Case Study 
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-primary/10 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Have a project in mind?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Our engineering team is ready to turn your idea into a reality. Whether it's a custom PCB, a scalable web app, or an intelligent IoT system.
        </p>
        <Link href="/services#request-form" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          Request a Quote <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
