import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = (credentials.email as string).trim().toLowerCase();
        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) return null;

        const pwd = credentials.password as string;
        const passwordsMatch = await bcrypt.compare(pwd, user.passwordHash) || 
                               await bcrypt.compare(pwd.trim(), user.passwordHash);

        if (passwordsMatch) {
          return { id: user.id, email: user.email, name: user.name, role: user.role };
        }

        return null;
      }
    })
  ]
});
