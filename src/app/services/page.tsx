import { Cpu, Globe, Code, Smartphone, Bot, Zap, PenTool, Database, Monitor, Send, Printer, Gift, Palette } from "lucide-react";
import Link from "next/link";
import { ProjectRequestForm } from "@/components/services/ProjectRequestForm";

const services = [
  { id: "iot", icon: <Globe className="w-8 h-8" />, title: "IoT Solutions", description: "End-to-end Internet of Things infrastructure, from edge devices to cloud dashboards." },
  { id: "embedded", icon: <Cpu className="w-8 h-8" />, title: "Embedded Systems", description: "Custom firmware and hardware integration for microcontrollers and microprocessors." },
  { id: "pcb", icon: <PenTool className="w-8 h-8" />, title: "PCB Design", description: "Professional Printed Circuit Board design, prototyping, and manufacturing support." },
  { id: "web", icon: <Monitor className="w-8 h-8" />, title: "Website Development", description: "Modern, responsive, and performant web applications tailored to your business needs." },
  { id: "mobile", icon: <Smartphone className="w-8 h-8" />, title: "Mobile Apps", description: "Cross-platform mobile applications for iOS and Android using modern frameworks." },
  { id: "ai", icon: <Bot className="w-8 h-8" />, title: "AI Projects & Robotics", description: "Artificial Intelligence integration and custom robotics prototyping for industrial automation." },
  { id: "3d-printing", icon: <Printer className="w-8 h-8" />, title: "3D Printing & CAD Modeling", description: "Precision 3D printing, rapid prototyping, and custom mechanical CAD modeling for enclosures, robotics, and industrial designs." },
  { id: "branding-printing", icon: <Palette className="w-8 h-8" />, title: "Branding, Banners & Flyers", description: "High-impact print graphic design, flex banners, roll-up display stands, promotional flyers, business cards, and corporate branding." },
  { id: "souvenirs-jotters", icon: <Gift className="w-8 h-8" />, title: "Custom Souvenirs & Jotters", description: "Premium customized jotters, branded souvenirs, and celebratory gift packages tailored for graduations, weddings, ceremonies, and corporate events." },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 max-w-7xl">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Our Technical Services</h1>
        <p className="text-lg text-muted-foreground">
          From bare-metal firmware and custom 3D printing to print branding, event souvenirs, and cloud architectures, MIKFAH TECH LTD provides comprehensive engineering and creative services.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {services.map((service) => (
          <div key={service.id} className="bg-card border border-border/50 p-8 rounded-2xl shadow-sm hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-md group">
            <div className="bg-primary/10 text-primary w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-muted-foreground mb-6 line-clamp-3">
              {service.description}
            </p>
            <a href="#request-form" className="text-primary font-medium flex items-center gap-2 hover:underline">
              Request Quote &rarr;
            </a>
          </div>
        ))}
      </div>

      {/* Custom Project Request Form */}
      <div id="request-form" className="max-w-4xl mx-auto bg-card border border-border/50 rounded-2xl p-5 sm:p-8 md:p-12 shadow-lg scroll-mt-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Custom Project</h2>
          <p className="text-muted-foreground">Fill out the form below with your project requirements and our engineering team will get back to you with a comprehensive proposal.</p>
        </div>

        <ProjectRequestForm />
      </div>
    </div>
  );
}
