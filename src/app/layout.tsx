import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Splits POC",
  description: "Splits POC Demo for Finance Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
