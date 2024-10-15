import { useState } from "react";

export function useBillDetails() {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  function toggleDialog() {
    setDialogIsOpen(!dialogIsOpen);
  }

  return {
    dialogIsOpen,
    setDialogIsOpen,
    toggleDialog,
  };
}
