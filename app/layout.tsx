import type { Metadata } from "next";
import { JetBrains_Mono, Ubuntu_Sans } from "next/font/google";
import "./globals.css";
import { GlassNav } from "@/components/ui/glass-nav";
import { MobileNav } from "@/components/ui/mobile-nav";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { CliWindow } from "@/components/terminal/cli-window";
import { ActiveSectionProvider } from "@/components/providers/active-section-context";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const ubuntu = Ubuntu_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "David Uwagbale | Full Stack Engineer | Dev_id",
  description: "20x JS Developer | Python Programmer | Claude's Mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${ubuntu.variable} antialiased font-sans`}
      >
        <div className="fixed inset-0 z-[-1] bg-zinc-900" />
        <ActiveSectionProvider>
          <GlassNav />
          <MobileNav />
          <CustomCursor />
          <CliWindow />
          {children}
        </ActiveSectionProvider>
      </body>
    </html>
  );
}
