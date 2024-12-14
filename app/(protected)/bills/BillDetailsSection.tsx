"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useBillDetails } from "./hooks/useBillDetails";
import { useBillStore } from "@/stores/useBillStore";
import DeleteIcon from "@/shared/icons/DeleteIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { useSubmitBill } from "./hooks/useSubmitBill";
import { Badge } from "@/components/ui/badge";
import { getBillStatusColour } from "@/lib/badge-utils";

import { TransactionStatus } from "@/shared/constants";
import { useBillForm } from "./hooks/useBillForm";
import { formatMonetaryAmount } from "@/lib/utils";
import InputField from "@/components/ui/input-field";

export default function BillDetailsSection() {
  const { selectedBill } = useBillStore();
  const {
    editDialogIsOpen,
    deleteAlertIsOpen,
    toggleEditDialog,
    toggleDeleteAlert,
  } = useBillDetails();

  const { formData } = useBillForm();

  const { deleteBill, updateBill } = useSubmitBill(formData);

  return selectedBill === null ? (
    <Alert>
      <AlertTitle className="font-bold text-xl">No bill selected</AlertTitle>
      <AlertDescription>Select a bill to continue</AlertDescription>
    </Alert>
  ) : (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row justify-between items-center align-middle">
        <div className="flex flex-col">
          <div className="flex flex-row gap-[0.5rem] items-center">
            <CardTitle className="text-2xl">{selectedBill.title}</CardTitle>
            <span>
              <Badge
                className={`${getBillStatusColour(
                  selectedBill.status
                )} w-full text-center hover:${getBillStatusColour(
                  selectedBill.status
                )}`}
                onClick={() => updateBill(selectedBill.status)}
              >
                {selectedBill.status}
              </Badge>
            </span>
          </div>
          <CardDescription>{selectedBill.description}</CardDescription>
        </div>

        <div className="flex flex-row gap-[0.5rem]">
          <Dialog open={editDialogIsOpen} onOpenChange={toggleEditDialog}>
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

              <BillForm
                formType={BillFormType.UPDATE}
                onClose={toggleEditDialog}
              />
            </DialogContent>

            <AlertDialog
              open={deleteAlertIsOpen}
              onOpenChange={toggleDeleteAlert}
            >
              <AlertDialogTrigger>
                <Button size="icon" variant="ghost" className="m-0">
                  <DeleteIcon />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deleting Bill Item: {selectedBill.title}
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    This cannot be undone and will permanently delete your bill
                    from our database
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteBill}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Dialog>
        </div>
      </CardHeader>

      <BillDetailsCard selectedBill={selectedBill} />

      <CardFooter className="flex justify-center align-middle items-center">
        <AlertDialog>
          <AlertDialogTrigger
            className="w-full"
            disabled={selectedBill.status === TransactionStatus.SETTLED}
          >
            <Button
              className="w-[50%]"
              disabled={selectedBill.status === TransactionStatus.SETTLED}
            >
              Settle Bill
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertTitle>
              You are settling {selectedBill.title} with a total of $
              {formatMonetaryAmount(selectedBill.amount)}
            </AlertTitle>

            <div className="flex flex-col">
              {
                // TODO: Implement adhoc function
              }
              <InputField
                label="Optional: Enter an additional amount if you'd like to pay more"
                name="oneTimeAmount"
                value={0}
                onChange={() => {}}
                placeholder="Enter extra amount"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => updateBill(TransactionStatus.SETTLED)}
              >
                Confirm Payment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
