"use client";

import { useSession } from "next-auth/react";
import ActiveContractsSection from "./ActiveContractsSection";
import MonthlyBillsSection from "./MonthlyBillsSection";
import { Alert } from "@/components/ui/alert";

export default function DashboardPage() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    <Alert>Not Authenticated</Alert>;
  }

  return (
    <section className="flex flex-col w-full gap-[1rem]">
      <div className="flex gap-[1rem]">
        <div className="w-[50%]">
          <ActiveContractsSection />
        </div>

        <div className="w-[50%]">
          <MonthlyBillsSection />
        </div>
      </div>
    </section>
  );
}
