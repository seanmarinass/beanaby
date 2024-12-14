import prisma from "@/prisma/db";
import { ZodError } from "zod";
import { billFormSchema, BillFormSchema } from "../../schemas/bill-form.schema";
import {
  apiErrorResponse,
  apiSuccessResponse,
} from "../../../lib/api-response";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!req.body) {
      return apiErrorResponse(400, "No data provided");
    }

    const { id } = params;

    const formData: BillFormSchema = await req.json();
    billFormSchema.parse(formData);

    const currentISOData = new Date().toISOString();

    const updatedBill = await prisma.bill.update({
      where: { id },
      data: {
        title: formData.title,
        amount: formData.amount,
        description: formData.description,
        category: formData.category,
        status: formData.status,
        isoDueDateString: formData.isoDueDateString,
        recipientAddress: formData.recipientAddress,
        recipientName: formData.recipientName,
        recipientBankName: formData.recipientBankName,
        recipientBankAccountNo: formData.recipientBankAccountNo,
        updatedAt: currentISOData,
      },
    });

    return apiSuccessResponse(200, {
      id: updatedBill.id,
      message: "Bill updated successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error.errors);
      return apiErrorResponse(400, "Validation error", error.errors);
    }

    console.error(error);
    return apiErrorResponse(500, "Internal service error");
  }
}
