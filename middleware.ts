import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { PROTECTED_PATHS, RECIRECT_PATH } from "./lib/auth.routes";

export async function middleware(request: Request) {
  const session = await auth();

  if (PROTECTED_PATHS.some((path) => request.url.includes(path))) {
    if (!session) {
      return NextResponse.redirect(new URL(RECIRECT_PATH, request.url));
    }
  }

  return NextResponse.next();
}
