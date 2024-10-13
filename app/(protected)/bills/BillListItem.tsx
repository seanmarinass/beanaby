import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { BillStatus } from "@/shared/constants";
import { Badge } from "lucide-react";
import clsx from "clsx";

interface BillListItemProps {
  status: BillStatus;
  amount: number;
  title: string;
  description: string;
  dueDateString: string;
  isSelected: boolean;

  onClick: () => void;
}

export default function BillListItem({
  status,
  amount,
  title,
  description,
  dueDateString,
  isSelected,

  onClick,
}: BillListItemProps) {
  return (
    <Card
      className={clsx(
        "flex flex-col p-[1rem] rounded-none gap-[0.5rem]",
        { "hover:opacity-50": !isSelected },
        { "bg-black text-white": isSelected }
      )}
      onClick={onClick}
    >
      <div className="flex justify-between align-middle items-center">
        <Badge>{status}</Badge>
        <span>{amount.toFixed(2)}</span>
      </div>

      <CardTitle>{title}</CardTitle>

      <div className="flex flex-col">
        <CardDescription>{description}</CardDescription>
        <CardDescription>{dueDateString}</CardDescription>
      </div>
    </Card>
  );
}
