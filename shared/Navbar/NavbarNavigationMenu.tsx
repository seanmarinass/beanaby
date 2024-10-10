"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { NavbarContextType, useNavbar } from "@/providers/NavbarProvider";
import Link from "next/link";

export default function NavbarNavigationMenu() {
  const { currentPage, setCurrentPage } = useNavbar();

  const handleButtonClick = (page: NavbarContextType) => {
    setCurrentPage(page);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {/* <NavigationMenuLink href="dashboard"> */}
          <Link href="/dashboard" passHref>
            <Button
              variant={currentPage === "Dashboard" ? "default" : "ghost"}
              onClick={() => handleButtonClick("Dashboard")}
            >
              Dashboard
            </Button>
          </Link>
          {/* </NavigationMenuLink> */}
        </NavigationMenuItem>

        <NavigationMenuItem>
          {/* <NavigationMenuLink href="contacts"> */}
          <Link href="/contracts" passHref>
            <Button
              variant={currentPage === "Contracts" ? "default" : "ghost"}
              onClick={() => handleButtonClick("Contracts")}
            >
              Contracts
            </Button>
          </Link>
          {/* </NavigationMenuLink> */}
        </NavigationMenuItem>

        <NavigationMenuItem>
          {/* <NavigationMenuLink> */}
          <Link href="/bills" passHref>
            <Button
              variant={currentPage === "Bills" ? "default" : "ghost"}
              onClick={() => handleButtonClick("Bills")}
            >
              Bills
            </Button>
            {/* </NavigationMenuLink> */}
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
