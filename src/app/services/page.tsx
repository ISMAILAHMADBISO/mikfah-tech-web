import { Cpu, Globe, Code, Smartphone, Bot, Zap, PenTool, Database, Monitor, Send } from "lucide-react";
import Link from "next/link";

const services = [
  { id: "iot", icon: <Globe className="w-8 h-8" />, title: "IoT Solutions", description: "End-to-end Internet of Things infrastructure, from edge devices to cloud dashboards." },
  { id: "embedded", icon: <Cpu className="w-8 h-8" />, title: "Embedded Systems", description: "Custom firmware and hardware integration for microcontrollers and microprocessors." },
  { id: "pcb", icon: <PenTool className="w-8 h-8" />, title: "PCB Design", description: "Professional Printed Circuit Board design, prototyping, and manufacturing support." },
  { id: "web", icon: <Monitor className="w-8 h-8" />, title: "Website Development", description: "Modern, responsive, and performant web applications tailored to your business needs." },
  { id: "mobile", icon: <Smartphone className="w-8 h-8" />, title: "Mobile Apps", description: "Cross-platform mobile applications for iOS and Android using modern frameworks." },
  { id: "ai", icon: <Bot className="w-8 h-8" />, title: "AI Projects & Robotics", description: "Artificial Intelligence integration and custom robotics prototyping for industrial automation." },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 max-w-7xl">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Our Technical Services</h1>
        <p className="text-lg text-muted-foreground">
          From bare-metal firmware to global cloud architectures, MIKFAH TECH LTD provides comprehensive engineering and software development services.
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
      <div id="request-form" className="max-w-4xl mx-auto bg-card border border-border/50 rounded-2xl p-8 md:p-12 shadow-lg scroll-mt-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Custom Project</h2>
          <p className="text-muted-foreground">Fill out the form below with your project requirements and our engineering team will get back to you with a comprehensive proposal.</p>
        </div>

        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name *</label>
              <input required type="text" className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address *</label>
              <input required type="email" className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" placeholder="john@company.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number *</label>
              <input required type="tel" className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" placeholder="+234 900 000 0000" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Company / Organization</label>
              <input type="text" className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" placeholder="Optional" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Project Type *</label>
              <select required className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer">
                <option value="">Select a service category</option>
                <option value="web">Website Development</option>
                <option value="software">Custom Software Development</option>
                <option value="mobile">Mobile App Development</option>
                <option value="iot">IoT & Embedded Systems</option>
                <option value="pcb">PCB Design & Prototyping</option>
                <option value="ai">AI / Machine Learning</option>
                <option value="automation">Industrial Automation</option>
                <option value="final_year">Final Year Academic Project</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Estimated Budget (₦) *</label>
              <select required className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer">
                <option value="">Select budget range</option>
                <option value="50k-200k">₦50,000 - ₦200,000</option>
                <option value="200k-500k">₦200,000 - ₦500,000</option>
                <option value="500k-2m">₦500,000 - ₦2,000,000</option>
                <option value="2m+">₦2,000,000+</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Project Description *</label>
            <textarea required rows={5} className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-y" placeholder="Please describe your project requirements in detail..."></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Upload Files / Schematics (Optional)</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/10 hover:bg-muted/30 transition-colors cursor-pointer">
              <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, ZIP, JPG, PNG (Max 10MB)</p>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-md font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <Send className="h-5 w-5" /> Submit Project Request
            </button>
            <p className="text-xs text-muted-foreground mt-4 text-center sm:text-left">
              By submitting this form, you agree to our Privacy Policy. Our team typically responds within 24-48 business hours.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
