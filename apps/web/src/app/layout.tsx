import SideBar from "@/components/side-bar";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
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
      <body className={`${lato.className} antialiased`}>
        <div className={"flex flex-row h-screen "}>
          <SideBar />
          <main className="flex flex-col py-16 px-16 w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
