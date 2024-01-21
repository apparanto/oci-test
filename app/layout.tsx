import type { Metadata } from "next";
import { Sintony } from "next/font/google";
import "./globals.css";

const font = Sintony({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Mock OCI App",
  description: "For testing webshops with OCI Punchout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
