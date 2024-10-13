import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./prisma/db";
import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user.email) {
        const userExists = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (!userExists) {
          const currentDate = new Date().toISOString();

          const username: string = user.name ?? "";
          await prisma.user.create({
            data: {
              username,
              email: user.email,
              billIds: [],
              contractIds: [],
              createdAt: currentDate,
              updatedAt: currentDate,
            },
          });
        }
        return true;
      }

      return false;
    },
  },
});
