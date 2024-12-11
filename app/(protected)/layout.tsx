import "../globals.css";
import Navbar from "@/shared/Navbar/Navbar";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased w-full min-h-screen p-[1rem] flex flex-col`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
