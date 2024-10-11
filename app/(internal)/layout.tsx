import BillsOverviewProvider from "@/providers/BillsOverviewProvider";
import "../globals.css";
import NavbarProvider from "@/providers/NavbarProvider";
import Navbar from "@/shared/Navbar/Navbar";

export default async function InternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NavbarProvider>
        <BillsOverviewProvider>
          <body
            className={`antialiased w-full min-h-screen p-[1rem] flex flex-col gap-[1rem]`}
          >
            <Navbar />
            {children}
          </body>
        </BillsOverviewProvider>
      </NavbarProvider>
    </html>
  );
}
