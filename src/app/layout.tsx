import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Toaster } from "sonner";
import AuthProvider from "@/providers/AuthProvider";
import ModalProvider from "@/providers/ModalProvider";

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
      <body>
        <AuthProvider>
          <Toaster richColors />
          <ModalProvider />
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
