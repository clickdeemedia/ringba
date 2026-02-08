import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ringba - Workflow Builder",
  description: "Visual workflow builder for call routing and campaign management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
