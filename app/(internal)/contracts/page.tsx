import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import ContractCategoriesSection from "./ContractCategoriesSection";
import YourContractsSection from "./YourContractsSection";

export default function ContractsPage() {
  return (
    <section className="flex flex-col gap-[1rem]">
      <Card className="flex-grow w-full">
        <CardContent className="flex flex-col h-full w-full justify-center align-middle items-center">
          <CardTitle>Section in development</CardTitle>
          <CardDescription>Will be deployed in next patch</CardDescription>
        </CardContent>
      </Card>
      {/* <ContractCategoriesSection />
      <YourContractsSection /> */}
    </section>
  );
}
