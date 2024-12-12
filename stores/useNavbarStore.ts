"use client";
import { create } from "zustand";

import { NavbarPageType } from "@/shared/Navbar/NavbarPageTypes";

type State = {
  currentPage: NavbarPageType;
};

type Action = {
  setCurrentPage: (page: State["currentPage"]) => void;
};

export const useNavbarStore = create<State & Action>((set) => ({
  // TODO Change back to dashboard when contract section is live
  currentPage: "bills",

  setCurrentPage: (currentPage) => set(() => ({ currentPage })),
}));
