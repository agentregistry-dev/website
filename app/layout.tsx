import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import Header from "./components/Header";
import HackathonBanner from "@/components/HackathonBanner";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "agentregistry - From registry to runtime. Fast development, curated artifacts.",
  description: "Agentregistry helps organizations package, collect, and enrich AI artifacts from any source in a single centralized registry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <GoogleTagManager gtmId="GTM-M9B72GP2" />
      <body className={`${openSans.variable} font-sans antialiased`}>
        <Header />
        {children}
        <HackathonBanner />
        <footer className="bg-slate-950 text-slate-400 py-8 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Solo.io. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

