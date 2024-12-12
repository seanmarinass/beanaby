import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./prisma/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
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
