export type TransactionType = "bill" | "contract";

export interface UserTransaction {
  localeDueDateString: string;
  title: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
}