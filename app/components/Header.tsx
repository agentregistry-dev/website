"use client";

import { useState } from "react";
import Link from "next/link";
import AgentRegistryLogo from "@/components/icons/AgentRegistry";
import { DiscordLink, GithubRepoLink } from "@/lib/links";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-slate-900 px-4 md:px-8 py-2 shadow-sm sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={closeMobileMenu}>
          <div className="h-16 md:h-20 w-auto cursor-pointer">
            <AgentRegistryLogo />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-slate-300 transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-slate-300 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-slate-300 transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col space-y-4 py-4 px-4">
          <a
            href={DiscordLink}
            className="text-slate-300 hover:text-[#8023C3] transition-colors font-medium py-2"
            onClick={closeMobileMenu}
          >
            Community
          </a>
          <Link
            href="/quickstart"
            className="text-slate-300 hover:text-[#8023C3] transition-colors font-medium py-2"
            onClick={closeMobileMenu}
          >
            Get Started
          </Link>
          <a
            href={GithubRepoLink}
            className="text-slate-300 hover:text-[#8023C3] transition-colors font-medium py-2"
            onClick={closeMobileMenu}
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

