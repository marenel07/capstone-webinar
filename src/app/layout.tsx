import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Toaster } from "sonner";
import AuthProvider from "@/providers/AuthProvider";

const poppins = Poppins({
  subsets: ["devanagari"],
  weight: ["400", "600"],
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "SorSU-BC Webinar Mangaement System",
  description: "A capstone project for SorSU-BC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Toaster richColors />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
