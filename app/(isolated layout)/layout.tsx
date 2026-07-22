import { JetBrains_Mono, Ubuntu_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { QCProvider } from "@/components/providers/query-client-context";
import "../globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const ubuntu = Ubuntu_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
})


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
        <Toaster />
        <div className="fixed inset-0 z-[-1] bg-zinc-900" />
        <QCProvider>
            {children}
        </QCProvider>
      </body>
    </html>
  );
}
