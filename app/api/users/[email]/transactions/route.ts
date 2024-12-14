import { apiErrorResponse } from "@/app/api/lib/api-response";
import { NextRequest, NextResponse } from "next/server";
import { getUserTransactionsByEmail } from "@/app/services/transaction.service";

export async function GET(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const pathSegments = pathname.split("/");

  const email = pathSegments[pathSegments.indexOf("users") + 1];

  if (!email) {
    return apiErrorResponse(400, "Email parameter is required");
  }

  try {
    const bills = await getUserTransactionsByEmail(email);

    return NextResponse.json(bills, { status: 200 });
  } catch (error) {
    console.error("Error fetching user transactions:");
    return NextResponse.json({ error }, { status: 500 });
  }
}
