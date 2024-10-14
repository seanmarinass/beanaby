"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import AppLogo from "../icons/AppLogo";
import ProfileIcon from "../icons/ProfileIcon";
import NavbarNavigationMenu from "./NavbarNavigationMenu";
import ExitIcon from "../icons/ExitIcon";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { signOut, useSession } from "next-auth/react";
import { ROOT } from "@/lib/auth.routes";
import FadeIn from "@/components/fadeIn";
import DarkModeIcon from "../icons/DarkModeIcon";
import { useThemeProvider } from "@/providers/ThemeProvider";
import LightModeIcon from "../icons/LightModeIcon";

export default function Navbar() {
  const { data } = useSession();
  const { theme, toggleTheme } = useThemeProvider();

  return (
    <FadeIn className="w-full mb-[1rem]" delay={0.2} tagKey="nav">
      <Card className="flex justify-between p-[1rem] items-center">
        <div className="flex justify-center align-middle items-center gap-[1rem]">
          <CardTitle>
            <AppLogo />
          </CardTitle>

          <NavbarNavigationMenu />
        </div>

        <div className="flex gap-[1rem]">
          <Button variant="ghost" size="icon">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
              <AvatarFallback>
                <ProfileIcon />
              </AvatarFallback>
            </Avatar>
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
          </Button>

          <Link href="/api/auth/signout">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ redirectTo: ROOT })}
            >
              <ExitIcon />
            </Button>
          </Link>
        </div>
      </Card>
    </FadeIn>
  );
}
