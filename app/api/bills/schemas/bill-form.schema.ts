import { z } from "zod";

export const billFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be 255 characters or fewer"),
  amount: z
    .number()
    .positive("Amount must be greater than 0")
    .max(1_000_000, "Amount cannot exceed 1 million"),
  description: z
    .string()
    .max(500, "Description must be 500 characters or fewer"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(100, "Category must be 100 characters or fewer"),
  status: z
    .string()
    .min(1, "Status is required")
    .max(50, "Status must be 50 characters or fewer"),
  isoDueDateString: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  recipientAddress: z
    .string()
    .min(1, "Recipient address is required")
    .max(255, "Recipient address must be 255 characters or fewer"),
  recipientName: z
    .string()
    .min(1, "Recipient name is required")
    .max(100, "Recipient name must be 100 characters or fewer"),
  recipientBankName: z
    .string()
    .min(1, "Recipient bank name is required")
    .max(100, "Recipient bank name must be 100 characters or fewer"),
  recipientBankAccountNo: z
    .string()
    .min(5, "Recipient bank account number must be at least 5 characters")
    .max(20, "Recipient bank account number must be 20 characters or fewer"),
});

export type BillFormSchema = z.infer<typeof billFormSchema>;
