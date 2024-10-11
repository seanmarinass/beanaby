import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GoogleIcon from "@/shared/icons/GoogleIcon";
import Link from "next/link";

export default function LoginForm() {
  async function handleGoogleLogin() {
    "use server";
    await signIn("google", { redirectTo: "/dashboard" });
  }

  async function handleManualLogin() {
    "use server";
    await signIn();
  }

  return (
    <Card className="p-[1rem] w-fit">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Sign in to BEANABY</CardTitle>
        <CardDescription>
          Please enter your log in details to get started
        </CardDescription>
      </CardHeader>

      <form>
        <CardContent className="flex flex-col gap-[1.5rem]">
          <Button
            className="flex w-full p-[1rem] justify-center align-middle items-center"
            variant="outline"
            size="icon"
            formAction={handleGoogleLogin}
          >
            <div className="flex justify-center align-middle items-center gap-[0.5rem]">
              <GoogleIcon />
              <span>Login with Google</span>
            </div>
          </Button>

          <div className="flex flex-col gap-[0.5rem]">
            <Input type="email" placeholder="Email Address" />
            <Input type="password" placeholder="Password" />
          </div>

          <div className="flex flex-col gap-[0.5rem]">
            <Link href="/dashboard">
              <Button className="w-full" formAction={handleManualLogin}>
                Login
              </Button>
            </Link>

            <Link href="" className="text-sm">
              <span>Forgot Password?</span>
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
