import type { Metadata } from "next";
import { Inter, Michroma } from "next/font/google";
import "./globals.css";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const corporateFont = Michroma({
  variable: "--font-corporate",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "LIMO AUTOMATION",
  description:
    "Custom automation equipment, inspection systems and experimental fixtures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${corporateFont.variable}`}>
        {children}
      </body>
    </html>
  );
}