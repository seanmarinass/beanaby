import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatMonetaryAmount, getCurrentMonthAndYear } from "@/lib/utils";

interface DashboardInfoCardProps {
  title: string;
  amount: number;
}

export default function DashboardInfoCard({
  title,
  amount,
}: DashboardInfoCardProps) {
  const currentMonthAndYear = getCurrentMonthAndYear();
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl font-bold text-primary">
          ${formatMonetaryAmount(amount)}
        </CardTitle>
        <CardDescription>As of {currentMonthAndYear}</CardDescription>
      </CardHeader>
    </Card>
  );
}
