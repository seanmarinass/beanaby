import { auth } from "@/auth";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session && session.user) return redirect("/dashboard");
  return (
    <section className="flex min-h-screen w-full justify-center align-middle items-center">
      <LoginForm />
      <div>{JSON.stringify(session)}</div>
    </section>
  );
}
