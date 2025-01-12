import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { LeftSideBar, RightSideBar } from "@/components/sidebars";
import { DataProvider } from "@/contexts/DataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "reddit",
  description: "Reddit app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-svh flex flex-col`}
      >
        <DataProvider>
          <Header />
          <section className="flex flex-1 bg-[#F2F7FB] overflow-hidden">
            <LeftSideBar />
            <main className="flex-1">{children}</main>
            <RightSideBar />
          </section>
        </DataProvider>
      </body>
    </html>
  );
}
