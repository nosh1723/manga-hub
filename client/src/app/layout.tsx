import type { Metadata } from "next";
import { } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import "../styles/index.css"
import { Toaster } from "@/components/ui/toaster";

// const geistSans = GeistSans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MangaHub",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
