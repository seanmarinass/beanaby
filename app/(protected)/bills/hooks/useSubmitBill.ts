/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSession } from "next-auth/react";
import { BillFormSchema } from "@/app/api/bills/schemas/bill-form.schema";
import { useBillStore } from "@/stores/useBillStore";

export const useSubmitBill = (formData?: BillFormSchema) => {
  const { data } = useSession();
  const { selectedBill } = useBillStore();

  const [submitIsLoading, setSubmitIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  async function handleResponse(
    response: Response,
    successMessageText: string
  ) {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred");
    }

    setSuccessMessage(successMessageText);
    return true;
  }

  async function createBill() {
    setSubmitIsLoading(true);

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
    } finally {
      setSubmitIsLoading(false);
    }
  }

  async function updateBill() {
    setSubmitIsLoading(true);

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
    } finally {
      setSubmitIsLoading(false);
    }
  }

  async function deleteBill() {
    setSubmitIsLoading(true);

    if (!selectedBill) {
      throw new Error("No bill selected");
    }

    const id = selectedBill._id;

    try {
      const response = await fetch(`/api/bills/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return handleResponse(response, "Bill delete successfully");
    } catch (err: any) {
      setError(err.message || "An unkonwn error occured");
      return false;
    } finally {
      setSubmitIsLoading(false);
    }
  }

  return {
    error,
    successMessage,
    createBill,
    updateBill,
    deleteBill,
    submitIsLoading,
  };
};
