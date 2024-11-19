import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      authorization: {
        params: {
          redirect_uri: "http://localhost:3000/api/auth/callback/github",
        },
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
} satisfies NextAuthConfig;
