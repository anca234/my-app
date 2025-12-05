import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Pastikan import ini ada agar Tailwind jalan

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gmail Clone",
  description: "Frontend Engineer Bootcamp Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}