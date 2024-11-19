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
  ...authConfig,
});