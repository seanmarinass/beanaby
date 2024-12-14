"use client";

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
import { Badge } from "@/components/ui/badge";
import { getBillStatusColour } from "@/lib/badge-utils";
import { formatMonetaryAmount, getCurrentMonthAndYear } from "@/lib/utils";

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

  const bills = transactions.filter(
    (transaction) => transaction.type === "bill"
  );

  const contracts = transactions.filter(
    (transaction) => transaction.type === "contract"
  );

  const monthAndYearString = getCurrentMonthAndYear();

  return (
    <section className="grid grid-cols-5 grid-rows-10 w-full gap-[2rem] max-h-screen">
      <div className="grid grid-rows-4 col-span-1 row-span-8 gap-[1rem]">
        <Card className="border-none shadow-none col-span-2 row-span-1 h-fit">
          <CardHeader>
            <CardDescription className="text-2xl text-primary">
              Welcome back,
            </CardDescription>
            <CardTitle className="text-primary font-bold text-5xl">
              {data?.user?.name}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="col-span-2 row-span-3">
          <CardHeader>
            <CardTitle className="text-xl">Transactions Breakdown</CardTitle>
            <CardDescription>{monthAndYearString}</CardDescription>
          </CardHeader>

          {transactions.length === 0 ? (
            <CardContent>
              <CardDescription>
                Add a transaction to view the breakdown
              </CardDescription>
            </CardContent>
          ) : (
            <PieChartWithLegend segments={segments} />
          )}
        </Card>
      </div>

      <div className="grid grid-cols-2 grid-rows-5 col-span-4 row-span-8 gap-[1rem]">
        <div className="grid grid-cols-2 col-span-2 row-span-1 gap-[1rem]">
          <DashboardInfoCard title="Total Bills Amount" amount={billsAmount} />
          <DashboardInfoCard
            title="Total Contracts Amount"
            amount={contractsAmount}
          />
        </div>

        <Card className="col-span-2 row-span-2">
          <CardHeader className="flex flex-row gap-[0.5rem] align-text-bottom">
            <CardTitle className="text-xl">Latest Transactions</CardTitle>
            <CardDescription>{monthAndYearString}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-[0.25rem]">
            <div className="w-full grid grid-cols-5 gap-[1rem]">
              <CardDescription>Transaction Type</CardDescription>
              <CardDescription>Title</CardDescription>
              <CardDescription>Recipient</CardDescription>
              <CardDescription>Due Date</CardDescription>
              <CardDescription>Amount Transacted</CardDescription>
            </div>

            {transactions.map(
              ({ title, localeDueDateString, amount, type }, index) => {
                const formattedAmount = formatMonetaryAmount(amount);
                const amountColour =
                  type === "bill" ? "text-red-500" : "text-green-500";

                return (
                  <div
                    key={index}
                    className="w-full grid grid-cols-5 gap-[1rem]"
                  >
                    <CardTitle>{type}</CardTitle>
                    <CardTitle>{title}</CardTitle>
                    <CardTitle>Name</CardTitle>
                    <CardTitle>{localeDueDateString}</CardTitle>
                    <CardTitle className={amountColour}>
                      ${formattedAmount}
                    </CardTitle>
                  </div>
                );
              }
            )}
          </CardContent>
        </Card>

        <Card className="gap-[1rem] col-span-1 row-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Upcoming Bills</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col justify-center align-middle items-center gap-[1rem]">
            <div className="w-full grid grid-cols-4 gap-[1rem]">
              <CardDescription>Title</CardDescription>
              <CardDescription>Due Date</CardDescription>
              <CardDescription>Amount Due</CardDescription>
              <CardDescription>Status</CardDescription>
            </div>

            {bills.map(
              ({ title, localeDueDateString, amount, status }, index) => {
                const badgeColour = getBillStatusColour(status);
                const formattedAmount = formatMonetaryAmount(amount);

                console.log(`The status: ${status}`);
                return (
                  <div
                    className="w-full grid grid-cols-4 gap-[1rem] text-lg items-center"
                    key={index}
                  >
                    <CardTitle>{title}</CardTitle>
                    <CardTitle>{localeDueDateString}</CardTitle>
                    <CardTitle>${formattedAmount}</CardTitle>
                    <Badge className={`${badgeColour} w-fit`}>{status}</Badge>
                  </div>
                );
              }
            )}
          </CardContent>
        </Card>

        <Card className="gap-[1rem] col-span-1 row-span-2">
          {contracts.length > 0 ? (
            <CardHeader>
              <CardTitle className="text-xl">Upcoming Contracts</CardTitle>
            </CardHeader>
          ) : (
            <CardContent className="flex h-full justify-center align-middle items-center text-center">
              <CardDescription className="">
                No contracts found. Create a contract to add it to the list of
                upcoming contracts.
              </CardDescription>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  );
}
