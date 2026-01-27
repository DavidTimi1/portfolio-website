import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Philosopher } from "next/font/google";
import "./globals.css";
import { GlassNav } from "@/components/ui/glass-nav";
import { MobileNav } from "@/components/ui/mobile-nav";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { CliWindow } from "@/components/terminal/cli-window";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const philosopher = Philosopher({
  weight: ["400", "700"],
  variable: "--font-glyph",
  subsets: ["latin"],
});

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
        className={`${inter.variable} ${jetbrainsMono.variable} ${philosopher.variable} antialiased font-sans`}
      >
        <div className="fixed inset-0 z-[-1] bg-zinc-900" />
        <GlassNav />
        <MobileNav />
        <CustomCursor />
        <CliWindow />
        {children}
      </body>
    </html>
  );
}
