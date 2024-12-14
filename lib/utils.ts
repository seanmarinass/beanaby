import { TransactionStatus } from "@/shared/constants";
import { clsx, type ClassValue } from "clsx";
import { format } from "d3-format";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToLocaleDateString(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options).replace(",", "");
}

export function formatToIsoString(formattedDate: string): string {
  const parsedDate = new Date(formattedDate);

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format");
  }

  return parsedDate.toISOString();
}

export function formatMonetaryAmount(amount: number): string {
  return format(".2f")(amount);
}

export function determineTransactionStatus(
  dueDateString: string,
  currentStatus: string
): TransactionStatus {
  const currentDate = new Date();
  const dueDate = new Date(dueDateString);

  const isBeforeNextMonth =
    currentDate <
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  const isOverdue = currentDate > dueDate && dueDate.getDate() > 15;
  const isDueThisMonth = currentDate <= dueDate && dueDate.getDate() <= 15;

  if (currentStatus === TransactionStatus.SETTLED) {
    return isBeforeNextMonth
      ? TransactionStatus.SETTLED
      : TransactionStatus.DUE;
  }

  if (isOverdue) {
    return TransactionStatus.OVERDUE;
  }

  if (isDueThisMonth) {
    return TransactionStatus.DUE;
  }

  return TransactionStatus.OVERDUE;
}
