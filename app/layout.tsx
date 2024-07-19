import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {jost} from "@/app/ui/fonts";


export const metadata: Metadata = {
  title: "Teal",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>{children}</body>
    </html>
  );
}
