import { transformBillDocumentToDto } from "@/lib/document-to-dto.transformer";
import { BillDto } from "@/lib/dtos";
import prisma from "@/prisma/db";
import { Bill } from "@prisma/client";

export async function useBills(): Promise<BillDto[]> {
  try {
    const billDocuments: Bill[] = await prisma.bill.findMany();
    const billDtos: BillDto[] = billDocuments.map((document) =>
      transformBillDocumentToDto(document)
    );

    return billDtos;
  } catch (error) {
    throw error;
  }
}
