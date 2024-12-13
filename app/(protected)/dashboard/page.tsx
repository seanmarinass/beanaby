import FadeIn from "@/components/fadeIn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardInfoCard from "./DashboardInfoCard";
import { PieChartSegment } from "./PieChartWithLegend";
import PieChartWithLegend from "./PieChartWithLegend";
import { TransactionColour } from "@/shared/constants";

interface Transaction {
  date: string;
  title: string;
  description: string;
  amount: number;
  type: string;
}

const transactions: Transaction[] = [
  {
    date: "20th December 2024",
    title: "Electricity Bill",
    description: "Monthly electricity payment",
    amount: 150.0,
    type: "bill",
  },
  {
    date: "21st December 2024",
    title: "Client Contract Payment",
    description: "Payment from ACME Corp for services rendered",
    amount: 2500.0,
    type: "contract",
  },
  {
    date: "22nd December 2024",
    title: "Water Bill",
    description: "Monthly water supply charges",
    amount: 60.0,
    type: "bill",
  },
  {
    date: "23rd December 2024",
    title: "New Software Project",
    description: "Advance payment for website development project",
    amount: 1200.0,
    type: "contract",
  },
  {
    date: "24th December 2024",
    title: "Internet Bill",
    description: "Monthly internet service charges",
    amount: 80.0,
    type: "bill",
  },
];

export default async function DashboardPage() {
  function createSegments(transactions: Transaction[]): PieChartSegment[] {
    const { billsAmount, contractsAmount } = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "bill") {
          acc.billsAmount += transaction.amount;
        } else if (transaction.type === "contract") {
          acc.contractsAmount += transaction.amount;
        }
        return acc;
      },
      { billsAmount: 0, contractsAmount: 0 }
    );

    const segments: PieChartSegment[] = [
      { name: "Bills", color: TransactionColour.BILL, value: billsAmount },
      {
        name: "Contracts",
        color: TransactionColour.CONTRACT,
        value: contractsAmount,
      },
    ];

    return segments;
  }

  return (
    <section className="grid grid-cols-2 w-full gap-[2rem] h-fit">
      <FadeIn tagKey="div" className="grid grid-cols-2 gap-[1rem]">
        <DashboardInfoCard title="Total Bills Amount" amount={3000.29} />
        <DashboardInfoCard title="Total Contracts Amount" amount={400.32} />

        <Card className="grid col-span-2">
          <CardHeader>
            <CardTitle>Amount Breakdown</CardTitle>
            <CardDescription>December 2024</CardDescription>
          </CardHeader>

          <div className="max-h-[25rem]">
            <PieChartWithLegend segments={createSegments(transactions)} />
          </div>
        </Card>
      </FadeIn>

      <FadeIn tagKey="div" className="h-full">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Latest Transactions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-[0.25rem]">
            {transactions.map((transaction, index) => (
              <Card
                key={index}
                className="grid grid-cols-3 py-[1rem] px-[0.5rem] shadow-none border-none"
              >
                <CardDescription className="font-medium">
                  {transaction.date}
                </CardDescription>
                <CardTitle className="font-semibold">
                  {transaction.title}
                </CardTitle>
                <div
                  className={`text-right ${
                    transaction.type === "bill"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  ${transaction.amount.toFixed(2)}
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </FadeIn>
    </section>
  );
}
