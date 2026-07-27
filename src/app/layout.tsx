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
  metadataBase: new URL("https://limoautomation.com"),

  title: {
    default: "LIMO AUTOMATION | Custom Industrial Automation",
    template: "%s | LIMO AUTOMATION",
  },

  description:
    "LIMO AUTOMATION provides custom industrial automation equipment, inspection systems, experimental fixtures, machine vision and engineering solutions.",

  keywords: [
    "LIMO AUTOMATION",
    "industrial automation",
    "custom automation equipment",
    "automation machinery",
    "inspection systems",
    "machine vision",
    "experimental fixtures",
    "custom machinery",
    "automation engineering",
    "Taiwan automation company",
  ],

  authors: [
    {
      name: "LIMO AUTOMATION",
      url: "https://limoautomation.com",
    },
  ],

  creator: "LIMO AUTOMATION",
  publisher: "LIMO AUTOMATION",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "LIMO AUTOMATION",
    title: "LIMO AUTOMATION | Custom Industrial Automation",
    description:
      "Custom industrial automation equipment, inspection systems, experimental fixtures, machine vision and engineering solutions.",
  },

  twitter: {
    card: "summary_large_image",
    title: "LIMO AUTOMATION | Custom Industrial Automation",
    description:
      "Custom industrial automation equipment, inspection systems, experimental fixtures, machine vision and engineering solutions.",
  },
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