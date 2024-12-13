"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarPageType } from "./NavbarPageTypes";
import { useNavbarStore } from "@/stores/useNavbarStore";
import { useEffect } from "react";

export default function NavbarNavigationMenu() {
  const pathName = usePathname();
  const formattedPathName = pathName.substring(1) as NavbarPageType;
  const { currentPage, setCurrentPage } = useNavbarStore();

  useEffect(() => {
    if (formattedPathName !== currentPage) {
      setCurrentPage(formattedPathName);
    }
  }, [formattedPathName, currentPage, setCurrentPage]);

  const handleButtonClick = (page: NavbarPageType) => {
    setCurrentPage(page);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/dashboard" passHref>
            <Button
              variant={currentPage === "dashboard" ? "default" : "ghost"}
              onClick={() => handleButtonClick("dashboard")}
            >
              Dashboard
            </Button>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/bills" passHref>
            <Button
              variant={currentPage === "bills" ? "default" : "ghost"}
              onClick={() => handleButtonClick("bills")}
            >
              Bills
            </Button>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Button
            disabled={true}
            variant={currentPage === "contracts" ? "default" : "ghost"}
          >
            Contracts (Coming Soon)
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
