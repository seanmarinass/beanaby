import BillCard from "@/components/bill/BillCard";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { userBillList } from "@/actions/useBills";
import FadeIn from "@/components/fadeIn";
import { auth } from "@/auth";

export default async function MonthlyBillsSection() {
  const session = await auth();

  const billList = await userBillList(session?.user?.email!);

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
              <FadeIn key={index} delay={index * 0.1} duration={0.8}>
                <BillCard
                  key={key}
                  title={bill.title}
                  description={bill.description}
                  amount={bill.amount}
                  dueDateString={bill.dueDateString}
                  billType={bill.billType}
                  status={bill.status}
                />
              </FadeIn>
            );
          })
        )}
      </Card>
    </section>
  );
}
