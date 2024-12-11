"use client";
import { AppTheme } from "@/shared/constants";
import { create } from "zustand";

type State = {
  theme: AppTheme;
};

type Action = {
  setTheme: () => void; // No argument needed, it toggles the theme
};

function getDefaultTheme(): AppTheme {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light";
}

export const useThemeStore = create<State & Action>((set) => ({
  theme: getDefaultTheme(),
  setTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
