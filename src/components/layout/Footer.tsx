import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.jpg" alt="MIKFAH TECH LTD Logo" className="h-10 w-auto" />
              <h3 className="text-lg font-bold text-primary tracking-tight">MIKFAH TECH</h3>
            </div>
            <p className="text-sm text-muted-foreground">Engineering Tomorrow with Smart Technology.</p>
            <p className="text-sm text-muted-foreground">RC Number: 8879106</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-md font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-primary">Shop Components</Link></li>
              <li><Link href="/services" className="hover:text-primary">Request a Project</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary">Our Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-md font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Head Office: Abubakar Usman Road, Jama'a, Zango Shanu, Zaria, Kaduna State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>09069384731 / 07089459265</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>mikfahtech@gmail.com</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-md font-semibold">Newsletter</h4>
            <p className="text-sm text-muted-foreground">Subscribe to get the latest tech news and product updates.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MIKFAH TECH LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
