import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import clsx from "clsx";

interface BillListItemProps {
  amount: number;
  title: string;
  description: string;
  dueDateString: string;
  isSelected: boolean;

  onClick: () => void;
}

export default function BillListItem({
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
        "flex flex-col p-[1rem] rounded-none gap-[0.5rem] shadow-none",
        { "hover:opacity-50": !isSelected },
        { "bg-primary text-white": isSelected }
      )}
      onClick={onClick}
    >
      <CardTitle>{title}</CardTitle>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <CardDescription className={clsx({ "text-white": isSelected })}>
            {description}
          </CardDescription>
          <CardDescription className={clsx({ "text-white": isSelected })}>
            {dueDateString}
          </CardDescription>
        </div>

        <span className="font-bold">${amount.toFixed(2)}</span>
      </div>
    </Card>
  );
}
