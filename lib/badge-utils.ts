import { BillStatus, BillStatusColour } from "@/shared/constants";

export function getBillStatusColour(status: BillStatus): BillStatusColour {
  switch (status) {
    case BillStatus.SETTLED:
      return BillStatusColour.SETTLED;
    case BillStatus.OVERDUE:
      return BillStatusColour.OVERDUE;
    default:
      return BillStatusColour.DUE;
  }
}
