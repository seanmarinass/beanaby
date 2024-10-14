import { transformBillDocumentToDto } from "@/lib/document-to-dto.transformer";
import { BillDto } from "@/lib/dtos";
import prisma from "@/prisma/db";

export async function userBillList(email: string): Promise<BillDto[]> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const billDocuments = await prisma.bill.findMany({
        where: {
          id: {
            in: user.billIds,
          },
        },
      });

      const billDtos: BillDto[] = billDocuments.map((document) =>
        transformBillDocumentToDto(document)
      );

      return billDtos;
    }

    throw new Error("User does not exist");
  } catch (error) {
    throw error;
  }
}
