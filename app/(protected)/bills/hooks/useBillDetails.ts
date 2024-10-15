import { useState } from "react";

export function useBillDetails() {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(true);

  function toggleDialog() {
    setDialogIsOpen(!dialogIsOpen);
  }

  return {
    dialogIsOpen,
    setDialogIsOpen,
    toggleDialog,
  };
}
