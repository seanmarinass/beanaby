"use client";

import React, { createContext, useContext, useState } from "react";
import { ProviderProps } from "./utils";

export type NavbarContextType = "Dashboard" | "Contracts" | "Bills";

export const NavbarContext = createContext<{
  currentPage: NavbarContextType;
  setCurrentPage: (page: NavbarContextType) => void;
}>({
  currentPage: "Dashboard",
  setCurrentPage: () => {},
});

export function useNavbar() {
  const context = useContext(NavbarContext);

  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }

  return context;
}

export default function NavbarProvider({ children }: ProviderProps) {
  const [currentPage, setCurrentPage] =
    useState<NavbarContextType>("Dashboard");

  return (
    <NavbarContext.Provider
      value={{
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}
