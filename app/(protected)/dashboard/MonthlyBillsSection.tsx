import BillCard from "@/components/bill/BillCard";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { useBills } from "@/actions/useBills";

export default async function MonthlyBillsSection() {
  const billList = await useBills();

  return (
    <section className="flex flex-col w-full gap-[0.5rem] h-full">
      <h1 className="font-bold text-xl">Monthly Bills</h1>
      <Card className="flex flex-col p-[1.5rem] gap-[0.5rem] h-full">
        {billList === null ? (
          <Alert variant="destructive">
            <AlertTitle>Error fetching bill list</AlertTitle>
          </Alert>
        ) : billList.length === 0 ? (
          <Alert>
            <AlertTitle>Bill list is empty</AlertTitle>
          </Alert>
        ) : (
          billList.map((bill, index) => {
            const key = `${bill.title}-${index}}`;

            return (
              <BillCard
                key={key}
                title={bill.title}
                description={bill.description}
                amount={bill.amount}
                dueDateString={bill.dueDateString}
                billType={bill.billType}
                status={bill.status}
              />
            );
          })
        )}
      </Card>
    </section>
  );
}
