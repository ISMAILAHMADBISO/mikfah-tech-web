const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const mockProducts = [
  { id: "1", name: "Raspberry Pi 4 Model B", price: 85000, category: "Development Boards", brand: "Raspberry Pi", sku: "RPI4-4GB", image: "https://images.unsplash.com/photo-1601462904263-c750c13ee0c0?auto=format&fit=crop&q=80&w=600", stock: 15, description: "The Raspberry Pi 4 Model B is the latest product in the popular Raspberry Pi range of computers. It offers ground-breaking increases in processor speed, multimedia performance, memory, and connectivity." },
  { id: "2", name: "ESP32 Development Board", price: 6500, category: "Development Boards", brand: "Espressif", sku: "ESP32-DEV", image: "https://images.unsplash.com/photo-1608564697071-ddf911d81370?auto=format&fit=crop&q=80&w=400", stock: 42, description: "Powerful Wi-Fi + Bluetooth/BLE MCU targeting a wide variety of applications." },
  { id: "3", name: "Arduino Uno R3", price: 12000, category: "Development Boards", brand: "Arduino", sku: "ARD-UNO-R3", image: "https://images.unsplash.com/photo-1559819614-81fea9efd090?auto=format&fit=crop&q=80&w=400", stock: 100, description: "The best board to get started with electronics and coding." },
  { id: "4", name: "DHT11 Temperature Sensor", price: 1500, category: "Sensors", brand: "Generic", sku: "DHT11", image: "https://images.unsplash.com/photo-1614917409419-f55da4b10b37?auto=format&fit=crop&q=80&w=400", stock: 200, description: "Basic, ultra low-cost digital temperature and humidity sensor." },
  { id: "5", name: "16x2 LCD Display", price: 3500, category: "Displays", brand: "Generic", sku: "LCD-1602", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400", stock: 50, description: "Basic 16 character by 2 line display." },
  { id: "6", name: "5V Relay Module (1 Channel)", price: 1200, category: "Relays", brand: "Generic", sku: "RELAY-1CH", image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=400", stock: 120, description: "Control high voltage, high current loads such as motor, solenoid valves, lamps and AC load." },
];

const mockPortfolios = [
  {
    title: "Enterprise Fiber Optic Termination & Backbone",
    description: "High-speed fiber optic network termination and structured backbone cabling for commercial offices, guaranteeing zero packet loss and 10Gbps internal throughput.",
    client: "Kano State Secretariat",
    industry: "Telecommunications / IT",
    technologies: ["Fiber Splicing", "OTDR Testing", "Structured Cabling", "Cisco Networking"],
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600"]
  },
  {
    title: "20kVA Commercial Solar Power System",
    description: "Complete off-grid solar inverter installation with lithium battery storage and automated transfer switches for 24/7 uninterrupted clean power.",
    client: "Al-Habib Plaza",
    industry: "Renewable Energy",
    technologies: ["Monocrystalline Panels", "Hybrid Inverter", "LiFePO4 Battery", "Smart Monitoring"],
    images: ["https://images.unsplash.com/photo-1509391365360-bbbi7303f26b?auto=format&fit=crop&q=80&w=600"]
  },
  {
    title: "32-Channel HD CCTV & Perimeter Security",
    description: "Enterprise-grade IP surveillance deployment featuring night-vision PTZ cameras, facial recognition, and remote cloud video archiving.",
    client: "Royal Estate Kano",
    industry: "Security & Surveillance",
    technologies: ["IP CCTV", "NVR Storage", "Motion AI", "Remote Access"],
    images: ["https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600"]
  },
  {
    title: "Smart House IoT Automation & Voice Control",
    description: "Custom residential home automation integrating smart lighting, climate control, automated gates, and remote mobile app control.",
    client: "Private Residence",
    industry: "Smart Home / IoT",
    technologies: ["ESP32 IoT", "Home Assistant", "Z-Wave / Zigbee", "Voice Assistant"],
    images: ["https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600"]
  }
];

const mockBlogs = [
  {
    title: "Why Tech Capacity Building is Critical for Nigerian Engineers",
    slug: "tech-capacity-building-nigerian-engineers",
    content: "At MIKFAH TECH LTD, our capacity building programs bridge the gap between theoretical computer science and practical, hands-on hardware engineering. We train students and corporate teams in embedded systems, IoT architecture, fiber optics splicing, and modern software development to empower the next generation of innovators.",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600",
    published: true
  },
  {
    title: "Choosing the Right Solar Inverter: A Guide for Nigerian Businesses",
    slug: "choosing-right-solar-inverter-nigerian-businesses",
    content: "With frequent power grid challenges, investing in a robust solar inverter system is essential for operational continuity. In this article, our renewable energy team breaks down the differences between hybrid, off-grid, and grid-tied inverters, and why proper load calculation is the secret to a long-lasting solar installation.",
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600",
    published: true
  },
  {
    title: "The Importance of Precision in Fiber Optic Terminations",
    slug: "importance-precision-fiber-optic-terminations",
    content: "A network is only as fast as its weakest connection. Poor fiber splicing and termination can introduce signal attenuation and reflection, leading to sluggish data speeds. Learn how MIKFAH TECH uses advanced fusion splicing and OTDR testing to deliver ultra-low loss network installations.",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    published: true
  }
];

async function seed() {
  console.log("Starting comprehensive seed...");

  // 1. Ensure Admin User exists
  const adminEmail = "admin@mikfahtech.com";
  let adminUser = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!adminUser) {
    const passwordHash = await bcrypt.hash("Admin12345!", 10);
    adminUser = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: adminEmail,
        passwordHash,
        role: "SUPER_ADMIN"
      }
    });
    console.log(`Created Admin user: ${adminEmail}`);
  } else {
    // Ensure role is SUPER_ADMIN
    if (adminUser.role !== "SUPER_ADMIN") {
      await prisma.user.update({
        where: { id: adminUser.id },
        data: { role: "SUPER_ADMIN" }
      });
    }
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  // 2. Ensure Category exists
  let category = await prisma.category.findFirst({ where: { name: "General" } });
  if (!category) {
    category = await prisma.category.create({ data: { name: "General" } });
  }

  // 3. Seed Products
  for (const product of mockProducts) {
    const existing = await prisma.product.findFirst({ where: { sku: product.sku } });
    if (!existing) {
      await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          sku: product.sku,
          stock: product.stock,
          description: product.description,
          images: [product.image],
          categoryId: category.id,
        }
      });
      console.log(`Created product: ${product.name}`);
    }
  }

  // 4. Seed Portfolio
  for (const item of mockPortfolios) {
    const existing = await prisma.portfolio.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.portfolio.create({
        data: {
          title: item.title,
          description: item.description,
          client: item.client,
          industry: item.industry,
          technologies: item.technologies,
          images: item.images
        }
      });
      console.log(`Created portfolio: ${item.title}`);
    }
  }

  // 5. Seed Blogs
  for (const blog of mockBlogs) {
    const existing = await prisma.blog.findUnique({ where: { slug: blog.slug } });
    if (!existing) {
      await prisma.blog.create({
        data: {
          title: blog.title,
          slug: blog.slug,
          content: blog.content,
          imageUrl: blog.imageUrl,
          published: blog.published,
          authorId: adminUser.id
        }
      });
      console.log(`Created blog: ${blog.title}`);
    }
  }

  console.log("Seed complete!");
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
