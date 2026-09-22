import type { Metadata } from "next";
import { JetBrains_Mono, Ubuntu_Sans } from "next/font/google";
import "../globals.css";
import { GlassNav } from "@/components/ui/glass-nav";
import { MobileNav } from "@/components/ui/mobile-nav";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { CliWindow } from "@/components/terminal/cli-window";
import { Toaster } from "@/components/ui/sonner";
import { ActiveSectionProvider } from "@/components/providers/active-section-context";
import { QCProvider } from "@/components/providers/query-client-context";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const ubuntu = Ubuntu_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
})

const title = "David Uwagbale | Full Stack Engineer | Dev_id";
const description = "20x JS Developer | Python Programmer | Claude's Mentor"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://davidtimi.tech";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: title,
  description: description,
  keywords: 'software engineer, 20x dev, dev_id, user experience, pwa',
  openGraph: {
    type: "article",
    title: title,
    description: description,
    images: '/assets/banner.png'
  },
  twitter: {
  // field to add other socials of me
    card: "summary_large_image",
    site: "@DavidTimi_1",
    creator: "@DavidTimi_1",
    images: '/assets/banner.png'
  },
  alternates: {
    canonical: 'https://davidtimi1-github-io.vercel.app'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${ubuntu.variable} antialiased font-sans custom-cursor`}
      >
        <Toaster />
        <div className="fixed inset-0 z-[-1] bg-zinc-900" />
        <QCProvider>
          <ActiveSectionProvider>
            <GlassNav />
            <MobileNav />
            <CustomCursor />
            <CliWindow />
            {children}
          </ActiveSectionProvider>
        </QCProvider>
      </body>
    </html>
  );
}
