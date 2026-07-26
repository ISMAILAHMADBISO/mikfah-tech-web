import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | MIKFAH TECH LTD",
    default: "MIKFAH TECH LTD | Engineering Tomorrow with Smart Technology",
  },
  description: "MIKFAH TECH LTD develops hardware, software, IoT systems, AI-powered solutions, websites, and supplies quality electronic components.",
  keywords: ["MIKFAH TECH", "Electronic Components", "IoT Solutions", "PCB Design", "Software Development", "Web Development", "Nigeria Tech Company"],
  authors: [{ name: "MIKFAH TECH LTD" }],
  creator: "MIKFAH TECH LTD",
  publisher: "MIKFAH TECH LTD",
  openGraph: {
    title: "MIKFAH TECH LTD | Engineering Tomorrow",
    description: "Your trusted partner for electronic components, IoT solutions, and custom software development.",
    url: "https://mikfahtech.com",
    siteName: "MIKFAH TECH LTD",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "MIKFAH TECH LTD Banner",
      }
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIKFAH TECH LTD | Engineering Tomorrow",
    description: "Your trusted partner for electronic components, IoT solutions, and custom software development.",
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&h=630"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
