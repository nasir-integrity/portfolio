import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-header-google",
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

const jetbrainsMonoLocal = localFont({
  src: [
    {
      path: "../../public/fonts/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/JetBrainsMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-header-local",
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
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${jetbrainsMonoLocal.variable}`}
    >
      <body className="min-h-screen bg-paper text-obsidian antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
