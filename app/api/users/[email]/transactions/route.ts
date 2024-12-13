import { apiErrorResponse } from "@/app/api/lib/api-response";
import prisma from "@/prisma/db";
import { formatToLocaleDateString } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const pathSegments = pathname.split("/");

  const email = pathSegments[pathSegments.indexOf("users") + 1];

  if (!email) {
    return apiErrorResponse(400, "Email parameter is required");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { billIds: true },
    });

    if (!user) {
      return apiErrorResponse(404, "User not found");
    }

    if (user.billIds.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    const bills = await prisma.bill.findMany({
      where: {
        id: {
          in: user.billIds,
        },
      },
    });

    const billTransactions: UserTransaction[] = bills.map((bill) => ({
      date: formatToLocaleDateString(bill.dueDate),
      title: bill.title,
      description: bill.description,
      amount: bill.amount,
      type: "bill",
    }));

    return NextResponse.json(billTransactions, { status: 200 });
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    return apiErrorResponse(500, "Internal server error");
  }
}
