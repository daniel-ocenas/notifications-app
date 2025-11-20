import { ApolloWrapper } from "@/components/apollo-wrapper";
import SideBar from "@/components/side-bar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";
import "./globals.css";

const lato = localFont({
  src: [
    {
      path: "../../public/static/fonts/Lato-Light.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/static/fonts/Lato-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Announcements App",
  description: "Demo Announcements App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable}`}>
        <ApolloWrapper>
          <div className={"flex flex-row min-h-screen"}>
            <SideBar />
            <main className="flex flex-col py-16 px-16 w-full">{children}</main>
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}
