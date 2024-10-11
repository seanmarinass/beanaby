"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import AppLogo from "../icons/AppLogo";
import ProfileIcon from "../icons/ProfileIcon";
import { SettingsIcon } from "lucide-react";
import NavbarNavigationMenu from "./NavbarNavigationMenu";
import ExitIcon from "../icons/ExitIcon";
import Link from "next/link";
import { signOut } from "@/auth";

export default function Navbar() {
  return (
    <section className="w-full">
      <Card className="flex justify-between p-[1rem] items-center">
        <div className="flex justify-center align-middle items-center gap-[1rem]">
          <CardTitle>
            <AppLogo />
          </CardTitle>

          <NavbarNavigationMenu />
        </div>

        <div className="flex gap-[1rem]">
          <Button variant="ghost" size="icon">
            <ProfileIcon />
          </Button>

          <Button variant="ghost" size="icon">
            <SettingsIcon />
          </Button>

          <Link href="/login">
            <Button
              variant="ghost"
              size="icon"
              formAction={async () => {
                await signOut({ redirectTo: "/" });
              }}
            >
              <ExitIcon />
            </Button>
          </Link>
        </div>
      </Card>
    </section>
  );
}
