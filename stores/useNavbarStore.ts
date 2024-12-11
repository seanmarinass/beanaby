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
  currentPage: "dashboard",

  setCurrentPage: (currentPage) => set(() => ({ currentPage })),
}));
