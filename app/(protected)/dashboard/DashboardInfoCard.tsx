import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatMonetaryAmount } from "@/lib/utils";

interface DashboardInfoCardProps {
  title: string;
  amount: number;
}

export default function DashboardInfoCard({
  title,
  amount,
}: DashboardInfoCardProps) {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-bold">
          ${formatMonetaryAmount(amount)}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
