"use client";

import { useState } from "react";
import { BillStatus } from "@/shared/constants";
import { z } from "zod";
import {
  BillFormSchema,
  billFormSchema,
} from "@/app/api/bills/schemas/bill-form.schema";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import { useSession } from "next-auth/react";
import { Alert } from "@/components/ui/alert";

export default function BillForm() {
  const { data } = useSession();

  const initialFormData: BillFormSchema = {
    title: "",
    amount: 0,
    description: "",
    billType: "",
    status: BillStatus.DUE,
    dueDate: "",
    recipientName: "",
    recipientAddress: "",
    recipientBankName: "",
    recipientBankAccountNo: "",
  };

  const [formData, setFormData] = useState<BillFormSchema>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  if (!data?.user?.email) return <Alert>{JSON.stringify(data)}</Alert>;

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = name === "amount" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setValidationErrors({});

    try {
      billFormSchema.parse(formData);

      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const response = await fetch(`/api/bills/create/${data.user?.email!}`, {
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

      const newBill = await response.json();
      setSuccessMessage(`Bill created successfully with ID: ${newBill.id}`);
      setFormData(initialFormData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.errors.reduce((acc, error) => {
          const field = error.path[0];
          if (field) {
            acc[field] = error.message;
          }
          return acc;
        }, {} as Record<string, string | undefined>);
        setValidationErrors(fieldErrors);
      } else if (err instanceof Error) {
        console.log(err.message);
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <form className="flex flex-col gap-[1rem] w-full" onSubmit={handleSubmit}>
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}

      <div className="flex gap-[1rem] w-full">
        <InputField
          label="Bill Type"
          name="billType"
          value={formData.billType}
          onChange={handleChange}
          error={validationErrors.billType}
          placeholder="Subscription, rent etc..."
        />
        <InputField
          label="Bill Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={validationErrors.title}
          placeholder="Title"
        />
      </div>

      <InputField
        label="Due Date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        error={validationErrors.dueDate}
        placeholder="Due Date (ISO format)"
      />
      <InputField
        label="Amount Due"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        error={validationErrors.amount}
        placeholder="10.00"
      />
      <InputField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={validationErrors.description}
        placeholder="Description"
      />
      <InputField
        label="Recipient Name"
        name="recipientName"
        value={formData.recipientName}
        onChange={handleChange}
        error={validationErrors.recipientName}
        placeholder="John"
      />
      <InputField
        label="Recipient Address"
        name="recipientAddress"
        value={formData.recipientAddress}
        onChange={handleChange}
        error={validationErrors.recipientAddress}
        placeholder="123 Fake Address"
      />

      <div className="flex gap-[1rem] w-full">
        <InputField
          label="Recipient Bank"
          name="recipientBankName"
          value={formData.recipientBankName}
          onChange={handleChange}
          error={validationErrors.recipientBankName}
          placeholder="Fake Bank"
        />
        <InputField
          label="Recipient Bank Account No"
          name="recipientBankAccountNo"
          value={formData.recipientBankAccountNo}
          onChange={handleChange}
          error={validationErrors.recipientBankAccountNo}
          placeholder="12345"
        />
      </div>

      <Button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
        Create Bill
      </Button>
    </form>
  );
}
