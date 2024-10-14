/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSession } from "next-auth/react";
import { BillFormSchema } from "@/app/api/bills/schemas/bill-form.schema";
import { useBillsProvider } from "@/providers/BillsOverviewProvider";

export const useSubmitBill = (formData: BillFormSchema) => {
  const { data } = useSession();
  const { selectedBill } = useBillsProvider();

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleResponse = async (
    response: Response,
    successMessageText: string
  ) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred");
    }

    setSuccessMessage(successMessageText);
    return true;
  };

  const createBill = async () => {
    if (!data?.user?.email) {
      throw new Error("User email is not available.");
    }

    try {
      const response = await fetch(`/api/bills/create/${data.user.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      return handleResponse(response, "Bill created successfully");
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      return false;
    }
  };

  const updateBill = async () => {
    if (!selectedBill) {
      throw new Error("No bill selected");
    }

    const id = selectedBill._id;

    try {
      const response = await fetch(`/api/bills/${id}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      return handleResponse(response, "Bill updated successfully");
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      return false;
    }
  };

  return { error, successMessage, createBill, updateBill };
};
