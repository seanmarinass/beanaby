"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBillsProvider } from "@/providers/BillsOverviewProvider";
import EditIcon from "@/shared/icons/EditIcon";

export default function BillDetailsSection() {
  const { selectedBill } = useBillsProvider();

  return selectedBill === null ? (
    <Alert>
      <AlertTitle className="font-bold text-xl">No bill selected</AlertTitle>
      <AlertDescription>Select a bill to continue</AlertDescription>
    </Alert>
  ) : (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row justify-between items-center align-middle">
        <CardTitle className="text-2xl">{selectedBill.title}</CardTitle>
        <Button size="icon" variant="ghost" className="m-0">
          <EditIcon />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-[1rem]">
        <div className="flex flex-col w-fit text-sm self-center">
          <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
            <span>Due date:</span>
            <span className="font-bold">{selectedBill.dueDateString}</span>
          </Card>

          <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
            <span>Amount due:</span>
            <span className="font-bold">${selectedBill.amount.toFixed(2)}</span>
          </Card>

          <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
            <span>Recipient:</span>
            <span className="font-bold">{selectedBill.recipientName}</span>
          </Card>

          <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
            <span>Recipient address:</span>
            <span className="text-wrap font-bold">
              {selectedBill.recipientAddress}
            </span>
          </Card>

          <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
            <span>Recipient Bank:</span>
            <span className="text-wrap font-bold">BDO</span>
          </Card>

          <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
            <span>Recipient Bank Account No:</span>
            <span className="text-wrap font-bold">123-456-789</span>
          </Card>

          <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
            <span>Date Created:</span>
            <span className="font-bold">{selectedBill.createdDateString}</span>
          </Card>
        </div>

        <div>
          <CardTitle>Notes</CardTitle>
          <CardDescription>{selectedBill.description}</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
