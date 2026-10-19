import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata ={
  title: "Country Explorer",
  description: "Explore countries from around the world"
};

interface RootLayoutProops{
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProops>){
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>

    </html>
  );
}