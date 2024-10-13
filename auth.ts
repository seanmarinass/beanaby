import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
});
