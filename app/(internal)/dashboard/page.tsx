import ActiveContractsSection from "./ActiveContractsSection";
import MonthlyBillsSection from "./MonthlyBillsSection";

export default function DashboardPage() {
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
