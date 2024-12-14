import { BillDto } from "@/lib/dtos";
import { UserTransaction } from "@/lib/types";
import {
  determineTransactionStatus,
  formatToLocaleDateString,
} from "@/lib/utils";
import { Bill } from "@prisma/client";

export function billDocumentToUserTransactionTransformer(
  bill: Bill
): UserTransaction {
  return {
    localeDueDateString: formatToLocaleDateString(bill.isoDueDateString),
    title: bill.title,
    description: bill.description,
    amount: bill.amount,
    type: "bill",
    category: bill.category,
    status: determineTransactionStatus(bill.isoDueDateString, bill.status),
  };
}

export function billDocumentToBillDtoTransformer(bill: Bill): BillDto {
  return {
    id: bill.id,
    title: bill.title,
    description: bill.description,
    amount: bill.amount,
    recipientName: bill.recipientName,
    recipientAddress: bill.recipientAddress,
    recipientBankName: bill.recipientBankName,
    recipientBankAccountNo: bill.recipientBankAccountNo,
    category: bill.category,
    status: determineTransactionStatus(bill.isoDueDateString, bill.status),
    localeDueDateString: formatToLocaleDateString(bill.isoDueDateString),
    createdDateString: bill.createdAt,
  };
}
