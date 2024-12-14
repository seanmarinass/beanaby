"use client"

import "../globals.css";
import Navbar from "@/shared/Navbar/Navbar";
import { useThemeStore } from "@/stores/useThemeStore";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {theme} = useThemeStore()

  return (
    <html lang="en">
      <body
        className={`${theme} antialiased w-full min-h-screen p-[1rem] flex flex-col`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
