export type AppTheme = "light" | "dark";

export enum ContractStatus {
  ACTIVE = "Active",
  EXPIRED = "Expired",
}

export enum TransactionStatus {
  SETTLED = "Settled",
  DUE = "Due",
  OVERDUE = "Overdue",
}

export enum BillStatusColour {
  SETTLED = "bg-green-500",
  OVERDUE = "bg-red-500",
  DUE = "bg-yellow-500",
}

export enum TransactionColour {
  BILL = "#ef4444",
  CONTRACT = "#22c55e"
}
