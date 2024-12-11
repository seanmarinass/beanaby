"use client";
import { BillDto } from "@/lib/dtos";
import { create } from "zustand";

type State = {
  billList: BillDto[] | null;
  selectedBill: BillDto | null;
};

type Action = {
  setBillList: (billList: State["billList"]) => void;
  setSelectedBill: (selectedBill: State["selectedBill"]) => void;
};

export const useBillStore = create<State & Action>((set) => ({
  billList: null,
  selectedBill: null,

  setBillList: (billList) => set(() => ({ billList })),
  setSelectedBill: (selectedBill) => set(() => ({ selectedBill })),
}));
