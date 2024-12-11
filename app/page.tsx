import { auth } from "@/auth";
import LoginPage from "./login/page";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session && session.user) return redirect("/dashboard");

  return (
    <div className="p-[1rem] min-h-screen w-full">
      <LoginPage />
    </div>
  );
}
