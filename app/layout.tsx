import "@/styles/globals.css";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { geistSans, geistMono, lexend, eduSaBeginner } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Manuality",
  description:
    "Free customizable worksheets for your children’s early education, ranging from basic fine motor skills to handwriting practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} ${eduSaBeginner.variable} antialiased font-sans`}
      >
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-col flex-1 relative pb-12">
            <div className="-z-10 pointer-events-none absolute inset-0 h-full w-full bg-background bg-radial bg-[radial-gradient(var(--color-blue-200)_1px,transparent_1px)] [background-size:1rem_1rem] print:hidden" />
            <Header />
            <div className="p-4 md:p-8 lg:p-12 flex flex-1 flex-col">
              {children}
            </div>
          </div>
        </SidebarProvider>
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  );
}
