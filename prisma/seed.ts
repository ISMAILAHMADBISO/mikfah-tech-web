const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  const adminEmail = "admin@mikfahtech.com";
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existingAdmin) {
    console.log("Admin account already exists. Skipping seed.");
    return;
  }

  const passwordHash = await bcrypt.hash("AdminPassword123!", 10);

  const admin = await prisma.user.create({
    data: {
      name: "MIKFAH SUPER ADMIN",
      email: adminEmail,
      passwordHash: passwordHash,
      role: "SUPER_ADMIN"
    }
  });

  console.log(`Created Super Admin with email: ${admin.email}`);
  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
