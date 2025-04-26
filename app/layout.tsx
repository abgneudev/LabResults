import type React from "react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { PatientProvider } from "@/context/patient-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LabResultsProto",
  description: "View and manage your health lab results",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <PatientProvider>
            <main className="min-h-screen max-w-md mx-auto bg-[#FAFEFF]">
              {children}
            </main>
            <Toaster />
          </PatientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
