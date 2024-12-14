import { TransactionStatus } from "@/shared/constants";

export interface BillDto {
  id: string;
  title: string;
  description: string;
  amount: number;
  recipientName: string;
  recipientAddress: string;
  recipientBankName: string;
  recipientBankAccountNo: string;

  category: string;
  status: TransactionStatus;

  localeDueDateString: string;
  createdDateString: string;
}
