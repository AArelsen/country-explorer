import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import {Footer} from "@/components/Footer/Footer";

export const metadata: Metadata ={
  title: "Country Explorer",
  description: "Explore countries from around the world"
};

interface RootLayoutProps{
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>){
  return (
    <html lang="en">
      <body>
        <Header/>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}