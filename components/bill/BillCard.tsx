import { TransactionStatus } from "@/shared/constants";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { getBillStatusColour } from "@/lib/badge-utils";

export interface BillCardProps {
  title: string;
  description: string;
  amount: number;
  dueDateString: string;

  category: string;
  status: TransactionStatus;
}

export default function BillCard({
  title,
  description,
  amount,
  dueDateString,
  category,
  status,
}: BillCardProps) {
  const badgeColour = getBillStatusColour(status);

  return (
    <Card className="p-[1rem] flex flex-col gap-[0.5rem]">
      <div className="flex w-full justify-between">
        <Badge className="bg-slate-500">{category}</Badge>
        <Badge
          className={`${badgeColour} w-fit items-center align-center justify-center flex`}
        >
          {status}
        </Badge>
      </div>

      <div>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <span>${amount}.00</span>
        </CardTitle>
        <CardDescription className="flex justify-between items-center">
          <span>{description}</span>
          <span>{dueDateString}</span>
        </CardDescription>
      </div>
    </Card>
  );
}
