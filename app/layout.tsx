import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Link from "next/link";
import AgentRegistryLogo from "@/components/icons/AgentRegistry";
import "./globals.css";
import { DiscordLink, GithubRepoLink } from "@/lib/links";

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
      <body className={`${openSans.variable} font-sans antialiased`}>
        {/* Header */}
        <header className="bg-slate-900 px-8 py-2 shadow-sm sticky top-0 z-50 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/">
              <div className="h-20 w-auto cursor-pointer">
                <AgentRegistryLogo />
              </div>
            </Link>
            <nav className="flex items-center gap-8">
              <a
                href={DiscordLink}
                className="text-slate-300 hover:text-[#8023C3] transition-colors font-medium"
              >
                Community
              </a>
              <Link
                href="/quickstart"
                className="text-slate-300 hover:text-[#8023C3] transition-colors font-medium"
              >
                Get Started
              </Link>
              <a
                href={GithubRepoLink}
                className="text-slate-300 hover:text-[#8023C3] transition-colors font-medium"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="bg-slate-950 text-slate-400 py-8 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Solo.io. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

