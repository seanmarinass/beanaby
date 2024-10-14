import { Bill } from "@prisma/client";
import { BillDto } from "./dtos";
import { BillStatus } from "@/shared/constants";
import { formatToLocaleDateString } from "./utils";

export function transformBillDocumentToDto(document: Bill): BillDto {
  return {
    _id: document.id,
    title: document.title,
    description: document.description,
    amount: document.amount,
    recipientName: document.recipientName,
    recipientAddress: document.recipientAddress,
    recipientBankAccountNo: document.recipientBankAccountNo,
    recipientBankName: document.recipientBankName,
    billType: document.billType,
    status: document.status as BillStatus,
    dueDateString: formatToLocaleDateString(document.dueDate),
    createdDateString: new Date(document.createdAt).toISOString(),
  };
}
