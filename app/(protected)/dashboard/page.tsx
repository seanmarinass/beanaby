"use client";

import FadeIn from "@/components/fadeIn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChartSegment } from "./PieChartWithLegend";
import PieChartWithLegend from "./PieChartWithLegend";
import { TransactionColour } from "@/shared/constants";
import DashboardInfoCard from "./DashboardInfoCard";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { swrConfig } from "@/swr.config";
import { Alert } from "@/components/ui/alert";
import { UserTransaction } from "@/lib/types";

function createSegments(transactions: UserTransaction[]): {
  segments: PieChartSegment[];
  billsAmount: number;
  contractsAmount: number;
} {
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

  return {
    segments,
    billsAmount,
    contractsAmount,
  };
}

export default function DashboardPage() {
  const { data } = useSession();
  const email = data?.user?.email;
  const swrUrl = email ? `/api/users/${email}/transactions` : null;

  const {
    data: transactions,
    isLoading,
    error,
  } = useSWR<UserTransaction[]>(swrUrl, swrConfig);

  if (isLoading || !swrUrl) {
    return <Alert>Fetching dashboard info</Alert>;
  }
  if (error || !transactions) {
    return (
      <Alert variant="destructive">
        Error retrieving dashboard info {error.message}
      </Alert>
    );
  }
  const { segments, billsAmount, contractsAmount } =
    createSegments(transactions);

  return (
    <section className="grid grid-cols-2 w-full gap-[2rem] h-fit">
      <FadeIn tagKey="div" className="grid grid-cols-2 gap-[1rem]">
        <DashboardInfoCard title="Total Bills Amount" amount={billsAmount} />
        <DashboardInfoCard
          title="Total Contracts Amount"
          amount={contractsAmount}
        />

        <Card className="grid col-span-2">
          <CardHeader>
            <CardTitle>Amount Breakdown</CardTitle>
            <CardDescription>December 2024</CardDescription>
          </CardHeader>

          {transactions.length === 0 ? (
            <CardContent>
              <CardDescription>
                Add a transaction to view the breakdown
              </CardDescription>
            </CardContent>
          ) : (
            <div className="max-h-[25rem]">
              <PieChartWithLegend segments={segments} />
            </div>
          )}
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
                  {transaction.localeDueDateString}
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
