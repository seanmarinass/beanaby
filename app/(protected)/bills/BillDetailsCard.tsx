import { Card, CardContent } from "@/components/ui/card";
import { BillDto } from "@/lib/dtos";
import { formatToLocaleDateString } from "@/lib/utils";

interface BillDetailsCardProps {
  selectedBill: BillDto;
}

export function BillDetailsCard({ selectedBill }: BillDetailsCardProps) {
  return (
    <CardContent className="flex flex-col gap-[1rem] w-full">
      <div className="flex flex-col w-[50%] text-sm self-center">
        <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
          <span>Due date:</span>
          <span className="font-bold">{selectedBill.localeDueDateString}</span>
        </Card>

        <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
          <span>Amount due:</span>
          <span className="font-bold">${selectedBill.amount.toFixed(2)}</span>
        </Card>

        <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
          <span>Recipient:</span>
          <span className="font-bold">{selectedBill.recipientName}</span>
        </Card>

        <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
          <span>Recipient address:</span>
          <span className="text-wrap font-bold">
            {selectedBill.recipientAddress}
          </span>
        </Card>

        <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
          <span>Recipient Bank:</span>
          <span className="text-wrap font-bold">
            {selectedBill.recipientBankName}
          </span>
        </Card>

        <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
          <span>Recipient Bank Account No:</span>
          <span className="text-wrap font-bold">
            {selectedBill.recipientBankAccountNo}
          </span>
        </Card>

        <Card className="flex gap-[2rem] justify-between align-middle items-center rounded-none p-[0.5rem] px-[1.5rem]">
          <span>Date Created:</span>
          <span className="font-bold">
            {formatToLocaleDateString(selectedBill.createdDateString)}
          </span>
        </Card>
      </div>
    </CardContent>
  );
}
