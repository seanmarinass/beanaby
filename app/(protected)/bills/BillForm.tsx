"use client";

import InputField from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { useSession } from "next-auth/react";
import { useBillForm } from "./hooks/useBillForm";
import { useSubmitBill } from "./hooks/useSubmitBill";
import ClipLoader from "react-spinners/ClipLoader";

export enum BillFormType {
  CREATE = "create",
  UPDATE = "update",
}

interface BillFormProps {
  formType: BillFormType;

  onClose: () => void;
}

export default function BillForm({ formType, onClose }: BillFormProps) {
  const { data } = useSession();
  const {
    formData,
    handleChange,
    error: formError,
    successMessage,
    validationErrors,
    resetForm,
    validateForm,
  } = useBillForm();

  const {
    createBill,
    updateBill,
    error: submitError,
    submitIsLoading,
  } = useSubmitBill(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const action = formType === BillFormType.CREATE ? createBill : updateBill;
    const success = await action();
    if (success) {
      resetForm();
      onClose();
    }
  };

  if (!data?.user?.email) return <Alert>{JSON.stringify(data)}</Alert>;

  return (
    <form className="flex flex-col gap-[1rem] w-full" onSubmit={handleSubmit}>
      {(formError || submitError) && (
        <div className="text-red-500">{formError || submitError}</div>
      )}
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

      <Button type="submit" className="mt-4 p-[0.5rem] text-white rounded]">
        {submitIsLoading ? <ClipLoader color="white" /> : <span>Save</span>}
      </Button>
    </form>
  );
}
