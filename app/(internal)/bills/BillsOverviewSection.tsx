"use client";

import { FAKE_BILL_DATA } from "@/components/bill/fake-bill-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useBillsProvider } from "@/providers/BillsOverviewProvider";
import FilterIcon from "@/shared/icons/FilterIcon";
import BillListItem from "./BillListItem";
import { BillDto } from "@/lib/dtos";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState, useEffect } from "react";

export default function BillsOverviewSection() {
  const { billList, setSelectedBill, selectedBill } = useBillsProvider();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedBillList, setSearchedBillList] =
    useState<BillDto[]>(FAKE_BILL_DATA);

  const handleBillSelect = (bill: BillDto) => {
    setSelectedBill(bill);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (searchValue === "") {
      setSearchedBillList(FAKE_BILL_DATA);
    } else {
      const filteredBills = FAKE_BILL_DATA.filter((bill) =>
        bill.title.toLowerCase().includes(searchValue)
      );
      setSearchedBillList(filteredBills);
    }
  };

  useEffect(() => {
    if (billList) {
      setSearchedBillList(billList);
    }
  }, [billList]);

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
          <Button variant="outline" size="icon">
            <FilterIcon />
          </Button>
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
            const { status, amount, title, description, dueDateString } = data;
            const isSelected = selectedBill === data;

            return (
              <BillListItem
                key={index}
                status={status}
                amount={amount}
                title={title}
                description={description}
                deadlineDateString={dueDateString}
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
