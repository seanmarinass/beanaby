import { BillDto } from "@/lib/dtos";
import prisma from "@/prisma/db";
import { billDocumentToBillDtoTransformer } from "./transformer.service";

export async function getUserBillsByEmail(email: string): Promise<BillDto[]> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { billIds: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const userBillDocuments = await prisma.bill.findMany({
      where: {
        id: {
          in: user.billIds,
        },
      },
    });

    const userBills = userBillDocuments.map((document) =>
      billDocumentToBillDtoTransformer(document)
    );

    return userBills;
  } catch (error) {
    console.error(`Error fetching user bills`);
    throw error;
  }
}
