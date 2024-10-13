import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function OnboardingPage() {
  const session = await auth();
  if (session && session.user?.email) {
    return <div>{JSON.stringify(session)}</div>;
  }

  return (
    <section className="min-h-screen flex h-full w-full justify-center align-middle items-center">
      <Card className="p-[2rem]">
        <CardHeader>
          <CardTitle>Welcome to Beanaby</CardTitle>
          <CardDescription>
            Enter some of your personal details to start
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-[1rem]">
          <div className="flex flex-col gap-[0.25rem]">
            <Label>First Name</Label>
            <Input placeholder="John" />
          </div>

          <div className="flex flex-col gap-[0.25rem]">
            <Label>Last Name</Label>
            <Input placeholder="Doe" />
          </div>

          <div className="flex flex-col gap-[0.25rem]">
            <Label>Username</Label>
            <Input placeholder="johndoe1000" />
          </div>
        </CardContent>

        <CardFooter>
          <Link href="/dashboard">
            <Button>Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
