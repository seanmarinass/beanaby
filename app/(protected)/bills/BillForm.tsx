"use client";

import InputField from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { useSession } from "next-auth/react";
import { useBillForm } from "./hooks/useBillForm";
import { useSubmitBill } from "./hooks/useSubmitBill";

export default function BillForm() {
  const { data } = useSession();
  const {
    formData,
    handleChange,
    error,
    successMessage,
    validationErrors,
    resetForm,
    validateForm,
  } = useBillForm();
  const { submitBill } = useSubmitBill(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = validateForm();
    if (!isFormValid) return;

    const isSuccess = await submitBill();
    if (isSuccess) {
      resetForm();
    }
  };

  if (!data?.user?.email) return <Alert>{JSON.stringify(data)}</Alert>;

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
