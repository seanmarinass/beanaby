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
