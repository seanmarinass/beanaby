import {
  apiErrorResponse,
  apiSuccessResponse,
} from "@/app/api/lib/api-response";
import prisma from "@/prisma/db";
import { Prisma } from "@prisma/client";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.bill.delete({
      where: { id },
    });
    return apiSuccessResponse(200, {
      message: "Bill deleted successfully",
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return apiErrorResponse(500, `Error deleting bill: ${error.message}`);
    }

    console.error(error);
    return apiErrorResponse(500, "Internal service error");
  }
}
