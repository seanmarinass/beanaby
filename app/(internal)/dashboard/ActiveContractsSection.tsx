import ContractCard from "@/components/contract/ContractCard";
import { FAKE_CONTRACT_DATA } from "@/components/contract/fake-contract-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
// import { Card } from "@/components/ui/card";

export default function ActiveContractsSection() {
  return (
    <section className="flex flex-col w-full gap-[0.5rem] h-full">
      <h1 className="font-bold text-xl">Your Active Contracts</h1>

      <Card className="flex flex-col p-[1.5rem] gap-[0.5rem] h-full">
        <CardContent className="flex flex-col h-full w-full justify-center align-middle items-center">
          <CardTitle>Section in development</CardTitle>
          <CardDescription>Will be deployed in next patch</CardDescription>
        </CardContent>
        {/* {FAKE_CONTRACT_DATA.map((contract, index) => {
          const key = `${contract.contractName}-${index}}`;

          return (
            <ContractCard
              key={key}
              contractName={contract.contractName}
              holderName={contract.holderName}
              holderContactNumber={contract.holderContactNumber}
              amount={contract.amount}
              startDateString={contract.startDateString}
              endDateString={contract.endDateString}
              status={contract.status}
              contractType={contract.contractType}
            />
          );
        })} */}
      </Card>
    </section>
  );
}
