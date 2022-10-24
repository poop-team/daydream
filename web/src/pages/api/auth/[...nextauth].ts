import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

import { env } from "../../../env/server";
import { prisma } from "../../../server/db/client";

/*
 *  NextAuth configuration
 *  All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth using this config
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_ISSUER,
    }),
  ],

  secret: env.NEXTAUTH_SECRET,
  // TODO: Enable pages after testing
  // pages: {
  //   signIn: "/auth?action=login",
  //   newUser: "/dashboard",
  //   signOut: "/auth",
  //   error: "/auth",
  // },
  //debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
