import { useState } from "react";
import { useSession } from "next-auth/react";
import { BillFormSchema } from "@/app/api/bills/schemas/bill-form.schema";

export const useSubmitBill = (formData: BillFormSchema) => {
  const { data } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const submitBill = async () => {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }

      setSuccessMessage("Bill created successfully");
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
      return false;
    }
  };

  return { error, successMessage, submitBill };
};
