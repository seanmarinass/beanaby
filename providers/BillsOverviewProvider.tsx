"use client";

import React, { createContext, useContext, useState } from "react";
import { ProviderProps } from "./utils";
import { BillDto } from "@/lib/dtos";

export const BillsOverviewProviderContext = createContext<{
  billList: BillDto[] | null;
  selectedBill: BillDto | null;

  setBillList: (billList: BillDto[]) => void;
  setSelectedBill: (bill: BillDto) => void;
}>({
  billList: null,
  selectedBill: null,

  setBillList: () => {},
  setSelectedBill: () => {},
});

export function useBillsProvider() {
  const context = useContext(BillsOverviewProviderContext);

  if (context === undefined) {
    throw new Error(
      "useBillsProvider must be used within a BillsOverviewProvider"
    );
  }

  return context;
}

export default function BillsOverviewProvider({ children }: ProviderProps) {
  const [billList, setBillList] = useState<BillDto[] | null>(null);
  const [selectedBill, setSelectedBill] = useState<BillDto | null>(null);

  return (
    <BillsOverviewProviderContext.Provider
      value={{ billList, selectedBill, setBillList, setSelectedBill }}
    >
      {children}
    </BillsOverviewProviderContext.Provider>
  );
}
