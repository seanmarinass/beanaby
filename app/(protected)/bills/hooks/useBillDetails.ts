import { useState } from "react";

export function useBillDetails() {
  const [editDialogIsOpen, setEditDialogIsOpen] = useState<boolean>(false);
  const [deleteAlertIsOpen, setDeleteAlertIsOpen] = useState<boolean>(false);

  function toggleEditDialog() {
    setEditDialogIsOpen(!editDialogIsOpen);
  }

  function toggleDeleteAlert() {
    setDeleteAlertIsOpen(!deleteAlertIsOpen);
  }

  return {
    editDialogIsOpen,
    deleteAlertIsOpen,

    setEditDialogIsOpen,
    setDeleteAlertIsOpen,

    toggleEditDialog,
    toggleDeleteAlert,
  };
}
