import FadeIn from "@/components/fadeIn";
import ActiveContractsSection from "./ActiveContractsSection";
import MonthlyBillsSection from "./MonthlyBillsSection";

export default async function DashboardPage() {
  return (
    <section className="flex flex-col w-full gap-[1rem]">
      <div className="flex gap-[1rem]">
        <FadeIn className="w-[50%]" delay={0.3}>
          <ActiveContractsSection />
        </FadeIn>

        <FadeIn className="w-[50%]" delay={0.4}>
          <MonthlyBillsSection />
        </FadeIn>
      </div>
    </section>
  );
}
