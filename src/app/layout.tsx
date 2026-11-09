import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NASIR — Nusantara Asset Integrity & Risk Platform | Engineering Case Study",
  description:
    "Single-page scrollytelling engineering portfolio of NASIR: connecting operational sensor telemetry with API 580 risk-based maintenance prioritization and OGMP 2.0 traceable methane emissions quantification for oil and gas facilities.",
  keywords: [
    "NASIR",
    "Asset Integrity Management",
    "API 580",
    "OGMP 2.0",
    "Methane Emissions Quantification",
    "Oil and Gas Telemetry",
    "Three.js Digital Twin",
    "Pertamuda",
  ],
  authors: [{ name: "NASIR Integrity Engineering Team" }],
  openGraph: {
    title: "NASIR — Nusantara Asset Integrity & Risk Platform",
    description:
      "API 580 Risk-Based Inspection & OGMP 2.0 Traceable Fugitive Methane Quantification Platform for Oil & Gas Facilities.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D0D0D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-paper text-obsidian antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
