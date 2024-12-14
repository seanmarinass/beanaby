import { useEffect, useState } from "react";
import { BillDto } from "@/lib/dtos";
import { useBillStore } from "@/stores/useBillStore";

export const useBillsOverview = () => {
  const { selectedBill, setSelectedBill, billList } = useBillStore();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchedBillList, setSearchedBillList] = useState<BillDto[]>([]);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const toggleDialog = () => {
    setDialogIsOpen((prev) => !prev);
  };

  const handleBillSelect = (bill: BillDto) => {
    setSelectedBill(bill);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (billList) {
      if (searchValue === "") {
        setSearchedBillList(billList);
      } else {
        const filteredBills = billList.filter((bill) =>
          bill.title.toLowerCase().includes(searchValue)
        );
        setSearchedBillList(filteredBills);
      }
    }
  };

  useEffect(() => {
    if (billList) {
      setSearchedBillList(billList);
    }
  }, [billList]);

  return {
    searchTerm,
    searchedBillList,
    dialogIsOpen,
    toggleDialog,
    handleSearchChange,
    handleBillSelect,
    selectedBill,
  };
};
