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
import { BillDetailsCard } from "./BillDetailsCard";

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

      <BillDetailsCard selectedBill={selectedBill} />
    </Card>
  );
}
