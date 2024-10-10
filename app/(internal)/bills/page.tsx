import BillDetailsSection from "./BillDetailsSection";
import BillsOverviewSection from "./BillsOverviewSection";

export default function BillsPage() {
  return (
    <section className="flex flex-grow h-full w-full gap-[1rem] items-center">
      <div className="flex w-1/3 h-full">
        <BillsOverviewSection />
      </div>

      <div className="flex w-2/3 h-full">
        <BillDetailsSection />
      </div>
    </section>
  );
}
