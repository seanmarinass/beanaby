import { TransactionStatus, BillStatusColour } from "@/shared/constants";

export function getBillStatusColour(
  status: TransactionStatus
): BillStatusColour {
  switch (status) {
    case TransactionStatus.SETTLED:
      return BillStatusColour.SETTLED;
    case TransactionStatus.OVERDUE:
      return BillStatusColour.OVERDUE;
    default:
      return BillStatusColour.DUE;
  }
}
