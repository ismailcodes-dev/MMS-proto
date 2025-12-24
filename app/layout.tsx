import type { Metadata } from "next";
import "./globals.css";
import AppLayout from "@/app/components/AppLayout"; // Make sure this path matches where you put the file

export const metadata: Metadata = {
  title: "MMS Contracts Module",
  description: "Al-Faytri ERP Prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0f111a] text-slate-200 antialiased">
        {/* The Shell handles the responsive structure (Sidebar, Mobile Header, etc.) */}
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}