import BillCard from "@/components/bill/BillCard";
import { FAKE_BILL_DATA } from "@/components/bill/fake-bill-data";
import { Card } from "@/components/ui/card";

export default function MonthlyBillsSection() {
  return (
    <section className="flex flex-col w-full gap-[0.5rem] h-full">
      <h1 className="font-bold text-xl">Monthly Bills</h1>
      <Card className="flex flex-col p-[1.5rem] gap-[0.5rem] h-full">
        {FAKE_BILL_DATA.map((bill, index) => {
          const key = `${bill.title}-${index}}`;

          return (
            <BillCard
              key={key}
              title={bill.title}
              description={bill.description}
              amount={bill.amount}
              deadlineDateString={bill.deadlineDateString}
              billType={bill.billType}
              status={bill.status}
            />
          );
        })}
      </Card>
    </section>
  );
}
