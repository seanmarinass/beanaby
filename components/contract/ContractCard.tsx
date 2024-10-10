import { ContractStatus } from "../../shared/constants";
import { Badge } from "../ui/badge";
import { Card, CardDescription, CardTitle } from "../ui/card";

export interface ContractInfo {
  contractName: string;
  holderName: string;
  holderContactNumber: string;

  amount: number;
  startDateString: string;
  endDateString: string;

  contractType: string;
  status: ContractStatus;
}

export default function ContractCard({
  contractName,
  holderName,
  amount,
  startDateString,
  endDateString,
  contractType,
  status,
}: ContractInfo) {
  const badgeColour =
    status === ContractStatus.ACTIVE ? "bg-green-500" : "bg-red-500";

  return (
    <Card className="p-[1rem] flex flex-col gap-[0.5rem]">
      <div className="flex w-full justify-between">
        <Badge className="bg-slate-500">{contractType}</Badge>
        <Badge
          className={`${badgeColour} w-fit items-center align-center justify-center flex`}
        >
          {status}
        </Badge>
      </div>

      <div>
        <CardTitle className="flex justify-between items-center">
          <span>{contractName}</span>
          <span>${amount}.00</span>
        </CardTitle>
        <CardDescription className="flex justify-between items-center">
          <span>{holderName}</span>
          <span>
            {startDateString} - {endDateString}
          </span>
        </CardDescription>
      </div>
    </Card>
  );
}
