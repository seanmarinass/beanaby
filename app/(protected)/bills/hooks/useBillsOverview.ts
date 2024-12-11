import { useEffect, useState } from "react";
import { BillDto } from "@/lib/dtos";
import { useBillStore } from "@/stores/useBillStore";

export const useBillsOverview = (initialBillList: BillDto[]) => {
  const { selectedBill, setSelectedBill } = useBillStore();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchedBillList, setSearchedBillList] =
    useState<BillDto[]>(initialBillList);
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

    if (searchValue === "") {
      setSearchedBillList(initialBillList);
    } else {
      const filteredBills = initialBillList.filter((bill) =>
        bill.title.toLowerCase().includes(searchValue)
      );
      setSearchedBillList(filteredBills);
    }
  };

  useEffect(() => {
    if (initialBillList) {
      setSearchedBillList(initialBillList);
    }
  }, [initialBillList]);

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
