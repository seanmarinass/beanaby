import {
  apiErrorResponse,
  apiSuccessResponse,
} from "@/app/api/lib/api-response";
import prisma from "@/prisma/db";

interface RequestBody {
  email: string;
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!req.body) {
    return apiErrorResponse(400, "No data provided");
  }

  try {
    const body: RequestBody = await req.json();
    const { email } = body;
    const { id } = params;

    await prisma.bill.delete({
      where: { id },
    });

    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { billIds: true },
    });

    if (user && user.billIds) {
      const updatedBillIds = user.billIds.filter((billId) => billId !== id);

      await prisma.user.update({
        where: { email: email },
        data: {
          billIds: {
            set: updatedBillIds,
          },
        },
      });
    }

    return apiSuccessResponse(200, {
      message: "Bill deleted successfully",
    });
  } catch (error) {

    console.error(error);
    return apiErrorResponse(500, "Internal service error");
  }
}
