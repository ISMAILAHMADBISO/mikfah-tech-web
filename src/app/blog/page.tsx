import Link from "next/link";
import { Search, Calendar, User, ArrowRight, Tag } from "lucide-react";

const blogPosts = [
  {
    id: "esp32-iot-guide",
    title: "Building a Smart Home Sensor Network with ESP32 and MQTT",
    excerpt: "Learn how to deploy a scalable mesh network of environmental sensors using cheap ESP32 microcontrollers and the MQTT protocol. We cover firmware, hardware, and dashboard integration.",
    category: "IoT",
    author: "Aminu Mikfah",
    date: "October 12, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "arduino-robotics",
    title: "Introduction to PID Controllers for Arduino Robotics",
    excerpt: "A deep dive into the mathematics and code behind Proportional-Integral-Derivative controllers for smooth line-following robots and self-balancing vehicles.",
    category: "Robotics",
    author: "Tech Team",
    date: "September 28, 2023",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "pcb-design-tips",
    title: "5 Common PCB Routing Mistakes and How to Avoid Them",
    excerpt: "Designing high-speed digital circuits? Ensure signal integrity and avoid EMI issues with these fundamental PCB layout guidelines.",
    category: "Electronics",
    author: "Hardware Dept",
    date: "September 15, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1592982537447-6f2334208f34?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "nextjs-dashboard",
    title: "Building Real-time Admin Dashboards with Next.js 14",
    excerpt: "A comprehensive tutorial on setting up secure, role-based admin panels using the latest Next.js App Router features and Server Actions.",
    category: "Programming",
    author: "Aminu Mikfah",
    date: "August 30, 2023",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
  }
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Technical Blog</h1>
          <p className="text-lg text-muted-foreground">
            Insights, tutorials, and deep-dives into Electronics, IoT, Software Engineering, and Artificial Intelligence.
          </p>
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-input bg-card text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Main Feed */}
        <div className="flex-1 space-y-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="group flex flex-col md:flex-row gap-8 bg-card border border-border/50 rounded-2xl p-4 pr-6 overflow-hidden hover:border-primary/50 transition-colors shadow-sm">
              <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-square shrink-0 overflow-hidden rounded-xl relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {post.category}
                </div>
              </div>
              
              <div className="flex flex-col justify-center flex-1 py-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-medium">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author}</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                  <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors group/btn">
                    Read Article <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-xs text-muted-foreground font-medium">{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}

          {/* Pagination Placeholder */}
          <div className="flex justify-center pt-8">
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-md border border-input flex items-center justify-center bg-card text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50" disabled>
                &larr;
              </button>
              <button className="w-10 h-10 rounded-md border border-primary flex items-center justify-center bg-primary text-primary-foreground font-medium">
                1
              </button>
              <button className="w-10 h-10 rounded-md border border-input flex items-center justify-center bg-card text-foreground hover:bg-muted transition-colors">
                2
              </button>
              <button className="w-10 h-10 rounded-md border border-input flex items-center justify-center bg-card text-foreground hover:bg-muted transition-colors">
                3
              </button>
              <button className="w-10 h-10 rounded-md border border-input flex items-center justify-center bg-card text-foreground hover:bg-muted transition-colors">
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 shrink-0 space-y-8">
          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b border-border/50 pb-3">
              <Tag className="w-5 h-5 text-primary" /> Topics
            </h3>
            <ul className="space-y-2">
              {['Programming', 'Arduino', 'ESP32', 'Electronics', 'IoT', 'AI', 'Tutorials'].map((cat, i) => (
                <li key={i}>
                  <Link href={`/blog?category=${cat.toLowerCase()}`} className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors py-1.5">
                    <span>{cat}</span>
                    <span className="bg-muted/50 text-xs px-2 py-0.5 rounded-full border border-border/30">
                      {Math.floor(Math.random() * 10) + 1}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 border-b border-border/50 pb-3">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest tech tutorials and engineering insights delivered to your inbox.
            </p>
            <div className="space-y-3">
              <input type="email" placeholder="Email address" className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary" />
              <button className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md hover:bg-primary/90 transition-colors shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
