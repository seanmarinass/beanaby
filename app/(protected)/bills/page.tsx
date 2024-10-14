import { userBillList } from "@/actions/bill-actions";
import BillDetailsSection from "./BillDetailsSection";
import BillsOverviewSection from "./BillsOverviewSection";
import { BillDto } from "@/lib/dtos";
import FadeIn from "@/components/fadeIn";
import { useSession } from "next-auth/react";
import { Alert } from "@/components/ui/alert";
import { auth } from "@/auth";

export default async function BillsPage() {
  const session = await auth();
  if (!session?.user?.email) return <Alert>No email</Alert>;

  const billList = await userBillList(session.user.email!);
  return (
    <FadeIn
      className="flex flex-grow h-full w-full gap-[1rem] items-center"
      tagKey="section"
      delay={0.3}
    >
      <div className="flex w-1/3 h-full">
        <BillsOverviewSection billList={billList} />
      </div>

      <div className="flex w-2/3 h-full">
        <BillDetailsSection />
      </div>
    </FadeIn>
  );
}
