"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { NavbarContextType, useNavbar } from "@/providers/NavbarProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarNavigationMenu() {
  const pathName = usePathname();
  const formattedPathName = pathName.substring(1) as NavbarContextType;

  const { currentPage, setCurrentPage } = useNavbar();
  setCurrentPage(formattedPathName);

  const handleButtonClick = (page: NavbarContextType) => {
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
          {/* <Link href="/contracts" passHref> */}
          <Button
            disabled={true}
            variant={currentPage === "contracts" ? "default" : "ghost"}
            // onClick={() => handleButtonClick("Contracts")}
          >
            Contracts (Coming Soon)
          </Button>
          {/* </Link> */}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
