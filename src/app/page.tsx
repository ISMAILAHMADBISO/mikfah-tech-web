import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AddToCartBtn } from "@/components/shop/AddToCartBtn";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Cpu, 
  Code, 
  ShieldCheck, 
  Zap, 
  Video, 
  Home as HomeIcon, 
  Network, 
  GraduationCap, 
  ShoppingCart,
  MessageCircle,
  Building2,
  Calendar,
  Printer,
  Gift,
  Palette
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Ensure fresh data on landing page load

export default async function HomePage() {
  // Fetch dynamic content from DB safely
  let products: any[] = [];
  let portfolios: any[] = [];
  let blogs: any[] = [];
  try {
    products = await prisma.product.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: { category: true }
    });

    portfolios = await prisma.portfolio.findMany({
      take: 4,
      orderBy: { createdAt: "desc" }
    });

    blogs = await prisma.blog.findMany({
      where: { published: true },
      take: 3,
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-slate-950 overflow-hidden">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 animate-pulse-slow"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-10" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-20 py-20">
          <div className="max-w-4xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs md:text-sm font-semibold uppercase tracking-wider mb-6">
              <Zap className="w-4 h-4 fill-primary" /> Premier Tech & Engineering Solutions
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none mb-8">
              Engineering Tomorrow with <span className="text-primary">Smart Technology</span> & Infrastructure.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              From fiber optic terminations and commercial solar installations to smart home IoT automation, custom 3D printing, print branding, event souvenirs, and electronic component supply—we empower enterprises and innovators across Nigeria.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <Link 
                href="/shop" 
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-base md:text-lg shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <ShoppingCart className="w-5 h-5" /> Shop Components
              </Link>
              <a 
                href="#divisions" 
                className="inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 px-8 py-4 rounded-xl font-bold text-base md:text-lg transition-all w-full sm:w-auto"
              >
                Explore Divisions <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE BUSINESS DIVISIONS (THE 6 PILLARS) */}
      <section id="divisions" className="py-24 bg-card border-b border-border/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-3">Our Expertise</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Comprehensive Technology Divisions
            </h2>
            <p className="text-muted-foreground mt-4 text-base md:text-lg">
              MIKFAH TECH LTD operates at the intersection of hardware infrastructure, renewable energy, security, custom 3D prototyping, branding, and professional skill development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Pillar 1: Fiber Terminations */}
            <div className="bg-background border border-border/60 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Network className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Fiber Optic Terminations</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Precision fusion splicing, OTDR testing, backbone cabling, and enterprise fiber infrastructure deployment with minimal db loss and industry-grade reliability.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-foreground border-t border-border/50 pt-4">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Single-mode & Multi-mode Splicing</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Fluke OTDR Fault Localization</li>
              </ul>
            </div>

            {/* Pillar 2: Commercial Solar Power */}
            <div className="bg-background border border-border/60 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Solar Power Systems</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Turnkey renewable energy solutions for commercial and residential estates. High-efficiency monocrystalline panels, hybrid inverters, and LiFePO4 battery storage.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-foreground border-t border-border/50 pt-4">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> 5kVA to 100kVA Commercial Setups</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Zero-transfer Time UPS Backup</li>
              </ul>
            </div>

            {/* Pillar 3: CCTV & Security */}
            <div className="bg-background border border-border/60 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Video className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">CCTV & Surveillance Systems</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  High-definition IP cameras, PTZ night-vision monitoring, automated perimeter defense, and cloud-archived NVR systems with remote smartphone live viewing.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-foreground border-t border-border/50 pt-4">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> 4K Ultra-HD IP Surveillance</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> AI Motion & Intrusion Analytics</li>
              </ul>
            </div>

            {/* Pillar 4: Smart House Automation */}
            <div className="bg-background border border-border/60 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <HomeIcon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Smart House Automation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Next-generation home automation and IoT integrations. Automated gates, smart lighting, smart HVAC control, and voice-activated architectural intelligence.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-foreground border-t border-border/50 pt-4">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Custom IoT Embedded Hardware</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Centralized Mobile App Control</li>
              </ul>
            </div>

            {/* Pillar 5: Tech Capacity Building */}
            <div className="bg-background border border-border/60 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Tech Capacity Building</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Practical, hands-on skill development programs for engineers, students, and corporate teams. We train in embedded systems, PCB design, fiber optics, and IoT development.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-foreground border-t border-border/50 pt-4">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Hardware & Embedded Programming</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Corporate Technical Workshops</li>
              </ul>
            </div>

            {/* Pillar 6: Electronic Component Supply */}
            <div className="bg-background border border-border/60 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Cpu className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Electronic Component Supply</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Direct retail and wholesale supply of genuine microcontrollers, sensors, development boards, displays, power modules, and specialized robotics components.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-foreground border-t border-border/50 pt-4">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Arduino, ESP32, Raspberry Pi & STM32</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Nationwide Express Shipping</li>
              </ul>
            </div>

            {/* Pillar 7: 3D Printing & CAD Modeling */}
            <div className="bg-background border border-border/60 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Printer className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">3D Printing & CAD Modeling</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Precision 3D printing, rapid prototyping, and custom CAD modeling for industrial parts, electronic enclosures, robotics, and mechanical prototypes.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-foreground border-t border-border/50 pt-4">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Custom Enclosures & Mechanical Parts</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> High-Precision CAD 3D Design</li>
              </ul>
            </div>

            {/* Pillar 8: Branding, Banners & Flyers */}
            <div className="bg-background border border-border/60 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Palette className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Branding, Banners & Flyers</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  High-impact print graphic design and commercial branding. We produce durable flex banners, promotional roll-up stands, flyers, business cards, and identity assets.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-foreground border-t border-border/50 pt-4">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Flex Banners & Roll-up Stands</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Promotional Flyers & Corporate Branding</li>
              </ul>
            </div>

            {/* Pillar 9: Custom Souvenirs & Jotters */}
            <div className="bg-background border border-border/60 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Gift className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Custom Souvenirs & Jotters</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Premium customized jotters, branded souvenirs, and celebratory gift packages tailored for university graduations, weddings, seminars, and corporate events.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-foreground border-t border-border/50 pt-4">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Graduation & Wedding Souvenirs</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Customized Branded Jotters</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ELECTRONIC COMPONENTS STORE PREVIEW (DYNAMIC FROM DB) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">Direct Supply</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Featured Electronic Components</h2>
              <p className="text-muted-foreground mt-2">Quality microcontrollers, development boards, and hardware modules ready for deployment.</p>
            </div>
            <Link 
              href="/shop" 
              className="mt-6 md:mt-0 inline-flex items-center gap-2 font-bold text-sm text-primary hover:underline"
            >
              View Full Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="relative h-56 bg-muted overflow-hidden">
                  <img 
                    src={product.images[0] || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600"} 
                    alt={product.name}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" 
                  />
                  {product.category && (
                    <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-md text-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {product.category.name}
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/50 flex flex-col justify-between gap-4 mt-2">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs text-muted-foreground block">Price</span>
                      <span className="text-xl font-extrabold text-foreground">
                        ₦{product.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 w-full mt-1">
                      <AddToCartBtn 
                        product={{
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          sku: product.sku,
                          stock: product.stock,
                          images: product.images
                        }} 
                      />
                      <Link 
                        href={`/shop/${product.id}`}
                        className="w-full py-1.5 text-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                      >
                        View Details &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <div className="col-span-full py-16 text-center bg-muted/20 rounded-2xl border border-dashed border-border">
                <p className="text-muted-foreground">No products available at the moment. Admin can add items from the portal.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. FEATURED ENGINEERING PROJECTS / PORTFOLIO (DYNAMIC FROM DB) */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">Track Record</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Featured Engineering Projects</h2>
              <p className="text-muted-foreground mt-2">A glimpse into our recent fiber network, solar, CCTV, and smart house deployments.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolios.map((item) => (
              <div key={item.id} className="bg-background border border-border/60 rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row group">
                <div className="sm:w-2/5 h-60 sm:h-auto bg-muted relative overflow-hidden">
                  <img 
                    src={item.images[0] || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600"} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="sm:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-2">
                      <Building2 className="w-3.5 h-3.5" /> {item.client || "Enterprise Client"}
                      {item.industry && <span className="text-muted-foreground">• {item.industry}</span>}
                    </div>
                    <h3 className="font-bold text-xl text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
                    {item.technologies.map((tech: any, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-muted/60 text-foreground text-[11px] font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {portfolios.length === 0 && (
              <div className="col-span-full py-16 text-center bg-muted/20 rounded-2xl border border-dashed border-border">
                <p className="text-muted-foreground">No portfolio projects uploaded yet. Admin can add projects from the portal.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. LATEST NEWS & ARTICLES (DYNAMIC FROM DB) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">Knowledge Hub</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Technical Insights & News</h2>
              <p className="text-muted-foreground mt-2">Latest updates on capacity building, renewable energy guides, and engineering standards.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog`} 
                className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/50 transition-all flex flex-col group"
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img 
                    src={post.imageUrl || "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600"} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.createdAt.toLocaleDateString()}
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-4">
                      {post.content}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:underline">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}

            {blogs.length === 0 && (
              <div className="col-span-full py-16 text-center bg-muted/20 rounded-2xl border border-dashed border-border">
                <p className="text-muted-foreground">No blog articles published yet. Admin can publish news from the portal.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/10 opacity-30" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Ready to initiate your next project?</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you require high-precision fiber termination, commercial solar engineering, custom 3D printing, event souvenirs, or corporate tech training—our team is ready.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-stretch sm:items-center">
            <a 
              href="https://wa.me/2349067285522?text=Hello%20MIKFAH%20TECH%2C%20I%20would%20like%20to%20discuss%20a%20project%20inquiry." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-xl font-bold text-base md:text-lg shadow-lg transition-all transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 fill-current shrink-0" /> Chat with Engineering on WhatsApp
            </a>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold text-base md:text-lg transition-all w-full sm:w-auto"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
