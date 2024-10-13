import { useBills } from "@/actions/useBills";
import BillDetailsSection from "./BillDetailsSection";
import BillsOverviewSection from "./BillsOverviewSection";
import { BillDto } from "@/lib/dtos";
import FadeIn from "@/components/fadeIn";

export default async function BillsPage() {
  const billList: BillDto[] = await useBills();

  return (
    <section className="flex flex-grow h-full w-full gap-[1rem] items-center">
      <FadeIn className="flex w-1/3 h-full">
        <BillsOverviewSection billList={billList} />
      </FadeIn>

      <FadeIn className="flex w-2/3 h-full">
        <BillDetailsSection />
      </FadeIn>
    </section>
  );
}
