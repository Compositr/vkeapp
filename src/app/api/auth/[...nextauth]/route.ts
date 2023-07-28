import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Username & Password",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;
        if (!credentials.username || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
          select: {
            id: true,
            username: true,
            password: true,
          },
        });

        // Incorrect username
        if (!user) return null;

        const { password, ...safeUser } = user;

        try {
          const valid = await bcrypt.compare(password, credentials.password);
          // Incorrect password
          if (!valid) return null;

          return safeUser;
        } catch {
          // Error validating hash, reject login
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
