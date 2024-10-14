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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
              <DialogDescription>
                Click Save Changes when done
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-[1rem] w-full">
              <div className="flex flex-col gap-[0.25rem] ">
                <Label className="font-bold">Bill Title</Label>
                <Input placeholder={selectedBill.title} />
              </div>

              <div className="flex flex-col gap-[0.25rem] ">
                <Label className="font-bold">Due Date</Label>
                <Input placeholder={selectedBill.dueDateString} />
              </div>

              <div className="flex flex-col gap-[0.25rem] ">
                <Label className="font-bold">Amount Due</Label>
                <Input placeholder={selectedBill.amount.toString()} />
              </div>

              <div className="flex flex-col gap-[0.25rem] ">
                <Label className="font-bold">Recipient Name</Label>
                <Input placeholder={selectedBill.recipientName} />
              </div>

              <div className="flex flex-col gap-[0.25rem] ">
                <Label className="font-bold">Recipient Address</Label>
                <Input placeholder={selectedBill.recipientAddress} />
              </div>

              <div className="flex gap-[1rem] w-full">
                <div className="flex flex-col gap-[0.25rem] ">
                  <Label className="font-bold">Recipient Bank</Label>
                  <Input placeholder={selectedBill.recipientBankName} />
                </div>
                <div className="flex flex-col gap-[0.25rem] flex-grow">
                  <Label className="font-bold">Recipient Bank Account No</Label>
                  <Input placeholder={selectedBill.recipientBankAccountNo} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button>Save Changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <BillDetailsCard selectedBill={selectedBill} />
    </Card>
  );
}
