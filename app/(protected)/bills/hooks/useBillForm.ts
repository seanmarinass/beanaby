import { useState } from "react";
import {
  billFormSchema,
  BillFormSchema,
} from "@/app/api/bills/schemas/bill-form.schema";
import { BillStatus } from "@/shared/constants";
import { ZodError } from "zod";

export const useBillForm = () => {
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

  const [formState, setFormState] = useState<{
    data: BillFormSchema;
    errors: Record<string, string | undefined>;
    successMessage: string;
    error: string | null;
  }>({
    data: initialFormData,
    errors: {},
    successMessage: "",
    error: null,
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = name === "amount" ? Number(value) : value;

    setFormState((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: newValue },
      errors: { ...prev.errors, [name]: undefined },
    }));
  };

  const resetForm = () => {
    setFormState({
      data: initialFormData,
      errors: {},
      successMessage: "",
      error: null,
    });
  };

  const validateForm = () => {
    try {
      billFormSchema.parse(formState.data);
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.errors.reduce((acc, error) => {
          const field = error.path[0];
          if (field) {
            acc[field] = error.message;
          }
          return acc;
        }, {} as Record<string, string | undefined>);

        setFormState((prev) => ({
          ...prev,
          errors: { ...prev.errors, ...fieldErrors },
        }));
      }
      return false;
    }
  };

  return {
    formData: formState.data,
    handleChange,
    error: formState.error,
    successMessage: formState.successMessage,
    validationErrors: formState.errors,
    resetForm,
    validateForm,
  };
};
