import BillDetailsSection from "./BillDetailsSection";
import BillsOverviewSection from "./BillsOverviewSection";
import FadeIn from "@/components/fadeIn";

export default async function BillsPage() {
  return (
    <FadeIn
      className="flex flex-grow h-full w-full gap-[1rem] items-center"
      tagKey="section"
      delay={0.3}
    >
      <div className="flex w-1/3 h-full">
        <BillsOverviewSection />
      </div>

      <div className="flex w-2/3 h-full">
        <BillDetailsSection />
      </div>
    </FadeIn>
  );
}
