export type AppTheme = "light" | "dark";

export enum ContractStatus {
  ACTIVE = "Active",
  EXPIRED = "Expired",
}

export enum BillStatus {
  SETTLED = "Settled",
  DUE = "Due",
  OVERDUE = "Overdue",
}

export enum BillStatusColour {
  SETTLED = "bg-green-500",
  OVERDUE = "bg-red-500",
  DUE = "bg-yellow-500",
}
