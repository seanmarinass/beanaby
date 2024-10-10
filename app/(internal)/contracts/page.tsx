import ContractCategoriesSection from "./ContractCategoriesSection";
import YourContractsSection from "./YourContractsSection";

export default function ContractsPage() {
  return (
    <section className="flex flex-col gap-[1rem]">
      <ContractCategoriesSection />
      <YourContractsSection />
    </section>
  );
}
