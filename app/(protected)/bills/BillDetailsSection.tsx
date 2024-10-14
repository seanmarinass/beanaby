"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useBillsProvider } from "@/providers/BillsOverviewProvider";
import EditIcon from "@/shared/icons/EditIcon";
import { BillDetailsCard } from "./BillDetailsCard";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,

} from "@/components/ui/dialog";
import BillForm, { BillFormType } from "./BillForm";

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

        <Dialog>
          <DialogTrigger>
            <Button size="icon" variant="ghost" className="m-0">
              <EditIcon />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Details</DialogTitle>
              <DialogDescription>Click Save when done</DialogDescription>
            </DialogHeader>

            <BillForm formType={BillFormType.UPDATE} />
          </DialogContent>
        </Dialog>
      </CardHeader>

      <BillDetailsCard selectedBill={selectedBill} />
    </Card>
  );
}
