import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import authConfig from "./auth.config";

export type AuthUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Saat user login, tambahkan ID ke token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Tambahkan ID dari token ke session
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  ...authConfig,
});
