import BillsOverviewProvider from "@/providers/BillsOverviewProvider";
import "../globals.css";
import NavbarProvider from "@/providers/NavbarProvider";
import Navbar from "@/shared/Navbar/Navbar";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NavbarProvider>
        <BillsOverviewProvider>
          <body
            className={`antialiased w-full min-h-screen p-[1rem] flex flex-col`}
          >
            <Navbar />
            {children}
          </body>
        </BillsOverviewProvider>
      </NavbarProvider>
    </html>
  );
}
