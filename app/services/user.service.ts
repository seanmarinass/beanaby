import prisma from "@/prisma/db";
import { billDocumentToUserTransactionTransformer } from "./transformer.service";
import { UserTransaction } from "@/lib/types";

export async function getUserTransactionsByEmail(
  email: string
): Promise<UserTransaction[]> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { billIds: true },
    });

    if (!user) {
      throw new Error(`User not found`);
    }

    if (user.billIds.length === 0) {
      return [];
    }

    const userBillDocuments = await prisma.bill.findMany({
      where: {
        id: {
          in: user.billIds,
        },
      },
    });

    const userBills = userBillDocuments.map((document) =>
      billDocumentToUserTransactionTransformer(document)
    );

    return userBills;
  } catch (error) {
    console.error(`Error fetching user bills`);
    throw error;
  }
}
