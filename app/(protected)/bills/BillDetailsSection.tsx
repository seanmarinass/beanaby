"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { BillStatus } from "@/shared/constants";
import { useBillForm } from "./hooks/useBillForm";

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
        <div className="flex flex-row gap-[0.5rem]">
          <CardTitle className="text-2xl">{selectedBill.title}</CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Badge
                className={`${getBillStatusColour(
                  selectedBill.status
                )} hover:opacity-50 hover:${getBillStatusColour(
                  selectedBill.status
                )}`}
              >
                {selectedBill.status}
              </Badge>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
              {Object.values(BillStatus).map((status, index) => {
                const dropdownBadgeColour = getBillStatusColour(status);
                const isDisabled = status === selectedBill.status;

                return (
                  <DropdownMenuItem
                    className="outline-none justify-center align-middle items-center w-full"
                    key={index}
                    disabled={isDisabled}
                  >
                    <Badge
                      className={`${dropdownBadgeColour} w-full text-center`}
                      onClick={() => updateBill(status)}
                      aria-disabled={isDisabled}
                    >
                      {status}
                    </Badge>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
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
    </Card>
  );
}
