import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

/*
 *  NextAuth configuration
 *  All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth using this config
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  // callbacks: {
  //   // Ensure that the user id and email is passed to the client's cookie
  //   async jwt({ token, user }) {
  //     token.email = user?.email;
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token) {
  //       if (session.user) {
  //         session.user.email = token.email;
  //       }
  //     }
  //     return session;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  // TODO: Enable pages after testing
  // pages: {
  //   signIn: "/auth?action=login",
  //   newUser: "/dashboard",
  //   signOut: "/auth",
  //   error: "/auth",
  // },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
