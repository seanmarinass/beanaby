import prisma from "@/prisma/db";
import { ZodError } from "zod";
import { billFormSchema, BillFormSchema } from "../../schemas/bill-form.schema";
import {
  apiErrorResponse,
  apiSuccessResponse,
} from "../../../lib/api-response";

export async function POST(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    if (!req.body) {
      return apiErrorResponse(400, "No data provided");
    }

    const { email } = params;

    const formData: BillFormSchema = await req.json();

    billFormSchema.parse(formData);

    const currentISOData = new Date().toISOString();
    const newBill = await prisma.bill.create({
      data: {
        title: formData.title,
        amount: formData.amount,
        description: formData.description,
        billType: formData.billType,
        status: formData.status,
        dueDate: formData.dueDate,
        recipientAddress: formData.recipientAddress,
        recipientName: formData.recipientName,
        recipientBankName: formData.recipientBankName,
        recipientBankAccountNo: formData.recipientBankAccountNo,
        createdAt: currentISOData,
        updatedAt: currentISOData,
      },
    });

    await prisma.user.update({
      where: { email: email },
      data: {
        billIds: {
          push: newBill.id,
        },
      },
    });

    return apiSuccessResponse(201, { id: newBill.id });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.errors);
      return apiErrorResponse(400, "Validation error", error.errors);
    }

    console.error(error);
    return apiErrorResponse(500, "Internal service error");
  }
}
