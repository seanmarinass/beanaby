import { getUserBillsByEmail } from "@/app/services/bills.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { email } = params;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const bills = await getUserBillsByEmail(email);

    return NextResponse.json(bills, { status: 200 });
  } catch (error) {
    console.error(`Error fetching user bills`);
    return NextResponse.json({ error }, { status: 500 });
  }
}
