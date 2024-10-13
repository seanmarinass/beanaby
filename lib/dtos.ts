import { BillStatus } from "@/shared/constants";

export interface BillDto {
  title: string;
  description: string;
  amount: number;
  recipientName: string;
  recipientAddress: string;
  recipientBankName: string;
  recipientBankAccountNo: string;

  billType: string;
  status: BillStatus;

  dueDateString: string;
  createdDateString: string;
}
