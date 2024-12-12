"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import FilterIcon from "@/shared/icons/FilterIcon";
import BillListItem from "./BillListItem";
import { BillDto } from "@/lib/dtos";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AddIcon from "@/shared/icons/AddIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BillForm, { BillFormType } from "./BillForm";
import { useBillsOverview } from "./hooks/useBillsOverview";

interface BillsOverviewSectionProps {
  billList: BillDto[];
}

export default function BillsOverviewSection({
  billList,
}: BillsOverviewSectionProps) {
  const {
    searchTerm,
    handleSearchChange,
    dialogIsOpen,
    toggleDialog,
    searchedBillList,
    selectedBill,
    handleBillSelect,
  } = useBillsOverview(billList);

  return (
    <Card className="flex-grow w-full h-[50rem] rounded-none">
      <CardHeader>
        <CardTitle>Bills Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex gap-[1rem]">
          <Input
            placeholder="Enter bill title"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button variant="ghost" size="icon">
            <FilterIcon />
          </Button>

          <Dialog open={dialogIsOpen} onOpenChange={toggleDialog}>
            <DialogTrigger>
              <Button variant="ghost" size="icon">
                <AddIcon />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bill Details</DialogTitle>
                <DialogDescription>
                  Click Save Changes when done
                </DialogDescription>
              </DialogHeader>

              <BillForm formType={BillFormType.CREATE} onClose={toggleDialog} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>

      <ScrollArea className="flex flex-col max-h-[100%]">
        {searchedBillList === null ? (
          <Alert>
            <AlertTitle>No bills found</AlertTitle>
          </Alert>
        ) : searchedBillList.length === 0 ? (
          <Alert>
            <AlertTitle>Bill list is empty</AlertTitle>
            <AlertDescription>Add a new bill to continue</AlertDescription>
          </Alert>
        ) : (
          searchedBillList.map((data, index) => {
            const { amount, title, description, dueDateString } = data;
            const isSelected = selectedBill === data;

            return (
              <BillListItem
                key={index}
                amount={amount}
                title={title}
                description={description}
                dueDateString={dueDateString}
                isSelected={isSelected}
                onClick={() => handleBillSelect(data)}
              />
            );
          })
        )}
      </ScrollArea>
    </Card>
  );
}
