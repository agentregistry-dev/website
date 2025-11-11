"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import KagentLogo from "@/components/icons/Kagent";
import McpIcon from "@/components/icons/Mcp";
import { Anthropic } from "@/components/icons/Anthropic";
import { OpenAI } from "@/components/icons/OpenAI";
import { DiscordLink, GithubRepoLink } from "@/lib/links";

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState({ src: "", alt: "" });

  const openLightbox = (diagramId: string) => {
    if (diagramId === "org-diagram") {
      setLightboxImage({
        src: "/img/operator-scenario.svg",
        alt: "Organization Workflow Diagram",
      });
    } else if (diagramId === "dev-diagram") {
      setLightboxImage({
        src: "/img/dev-scenario.svg",
        alt: "Developer Workflow Diagram",
      });
    }
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };

    if (lightboxOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [lightboxOpen]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#151927] via-[#1a1f30] to-[#8023C3]/20 text-white text-center px-8 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#8023C3]/10 via-transparent to-purple-500/5 pointer-events-none"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Fast-track AI innovation
          </h1>
          <p className="text-2xl md:text-3xl text-slate-300 font-light mb-12 tracking-wide">
            With a centralized, trusted, curated registry
          </p>
          


          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/quickstart"
              className="inline-block bg-white text-[#8023C3] px-10 py-4 rounded-lg font-semibold text-lg transition-transform hover:-translate-y-1 hover:shadow-2xl"
            >
              Get Started
            </Link>
            <a
              href={GithubRepoLink}
              target="_blank"
              className="inline-block bg-transparent text-white px-10 py-4 rounded-lg font-semibold text-lg border-2 border-white transition-all hover:bg-white/10"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Diagrams Section */}
      <section className="py-20 px-8 bg-[#151927]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Organization Card */}
            <div className="bg-[#1a1f30] rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-transform">
              <div className="px-8 pt-8 pb-4">
                <div className="inline-block bg-[#202535]/50 text-slate-300 text-sm font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
                  For Organizations
                </div>
                <h3 className="text-3xl text-white mb-2">Curate & Deploy</h3>
                <p className="text-lg text-slate-300">
                    Package, collect, and enrich AI artifacts from any source in a single centralized registry
                </p>
              </div>
              <div
                className="bg-gradient-to-br from-[#202535] to-[#1a1f30] border-t border-b border-[#202535] cursor-pointer hover:from-[#252a3f] hover:to-[#202535] transition-all relative overflow-hidden group"
                onClick={() => openLightbox("org-diagram")}
              >
                <img
                  src="/img/operator-scenario.svg"
                  alt="Organization workflow diagram"
                  className="w-full h-90 object-contain"
                />
                <div className="absolute bottom-6 right-6 bg-[#8023C3]/90 text-slate-200 px-4 py-2 rounded-md text-sm font-semibold group-hover:bg-[#8023C3] transition-colors">
                  Click to expand ↗
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="pb-4 border-b border-[#202535] text-slate-300 leading-relaxed">
                    <strong className="text-white font-semibold">Centralized Control</strong> – Package and collect AI artifacts from any source into a single registry
                  </li>
                  <li className="pb-4 border-b border-[#202535] text-slate-300 leading-relaxed">
                    <strong className="text-white font-semibold">Security & Governance</strong> – Curate and approve agents, servers, and skills before company-wide deployment
                  </li>
                  <li className="text-slate-300 leading-relaxed">
                    <strong className="text-white font-semibold">Enriched Metadata</strong> – Add context to help assess trustworthiness and security</li>
                </ul>
              </div>
            </div>

            {/* Developer Card */}
            <div className="bg-[#1a1f30] rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-transform">
              <div className="px-8 pt-8 pb-4">
                <div className="inline-block bg-[#202535]/50 text-slate-300 text-sm font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
                  For Developers
                </div>
                <h3 className="text-3xl text-white mb-2">Build & Publish</h3>
                <p className="text-lg text-slate-300">
                  Build, test, and publish and deploy AI artifacts with minimal dependencies
                </p>
              </div>
              <div
                className="bg-gradient-to-br from-[#202535] to-[#1a1f30] border-t border-b border-[#202535] cursor-pointer hover:from-[#252a3f] hover:to-[#202535] transition-all relative overflow-hidden group"
                onClick={() => openLightbox("dev-diagram")}
              >
                <img
                  src="/img/dev-scenario.svg"
                  alt="Developer workflow diagram"
                  className="w-full h-90 object-contain"
                />
                <div className="absolute bottom-6 right-6 bg-[#8023C3]/90 text-slate-200 px-4 py-2 rounded-md text-sm font-semibold group-hover:bg-[#8023C3] transition-colors">
                  Click to expand ↗
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="pb-4 border-b border-[#202535] text-slate-300 leading-relaxed">
                    <strong className="text-white font-semibold">Local Development</strong> – Create and test agents, skills, and MCP servers locally
                  </li>
                  <li className="pb-4 border-b border-[#202535] text-slate-300 leading-relaxed">
                    <strong className="text-white font-semibold">Easy Publishing</strong> – Publish your artifacts to a registry with a single command
                  </li>
                  <li className="pb-4 border-b border-[#202535] text-slate-300 leading-relaxed">
                    <strong className="text-white font-semibold">Pull & Run Anywhere</strong> – Pull artifacts from the registry and run them in any environment instantly
                  </li>
                  <li className="text-slate-300 leading-relaxed">
                    <strong className="text-white font-semibold">Discover & Consume</strong> – Find new artifacts to add to registry or optimize existing artifacts
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorial Section */}
      <section className="py-20 px-8 bg-[#0f1219]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Learn how to create an Anthropic Skill, publish it to agentregistry, and use it in Claude Code
          </p>
          <div className="bg-[#1a1f30] rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/pWRMoypForM"
                title="agentregistry Tutorial: Create and Publish an Anthropic Skill"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-8 text-left">
              <p className="text-slate-300 text-lg leading-relaxed">
                In this video, you'll learn how to use agentregistry to create an Anthropic Skill, push and publish it to the agentregistry and then pull it and use it in Claude Code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Centralized Registry Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-[#1a1f30] to-purple-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-2">
            Bring control and velocity to your AI infrastructure
          </h2>
          <div className="grid md:grid-cols-3 gap-12 mt-12">
            <div className="bg-[#1a1f30] p-10 rounded-xl shadow-lg text-center">
              <div className="text-6xl mb-6">✨</div>
              <h3 className="text-2xl text-white mb-4">Enriched Data</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
              Import AI artifacts from any registry into Agentregistry, where automatic scoring and validation enriches datasets and delivers deeper insights for operators.
              </p>
            </div>
            <div className="bg-[#1a1f30] p-10 rounded-xl shadow-lg text-center">
              <div className="text-6xl mb-6">🔒</div>
              <h3 className="text-2xl text-white mb-4">Controlled Curation</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
              Build curated artifact collections within agentregistry. Publish items selectively, and maintain end-to-end audit and control from a centralized registry.
              </p>
            </div>
            <div className="bg-[#1a1f30] p-10 rounded-xl shadow-lg text-center">
              <div className="text-6xl mb-6">⚡</div>
              <h3 className="text-2xl text-white mb-4">Build Fast</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
              Accelerate applications to production by empowering developers to create, run, and deploy agents, MCP servers, and skills from agent registry with confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-8 bg-[#151927]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            How It Works
          </h2>
          <p className="text-center text-xl text-slate-300 mb-16">
            A complete lifecycle for AI artifacts
          </p>
          
          {/* Timeline Flow */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#202535] -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="text-center group cursor-pointer">
                <div className="relative inline-block mb-6">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-[#8023C3] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-16 h-16 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#8023C3] transition-colors">Import</h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  Collect AI artifacts from any source
                </p>
              </div>
              
              <div className="text-center group cursor-pointer">
                <div className="relative inline-block mb-6">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-[#8023C3] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-16 h-16 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#8023C3] transition-colors">Curate</h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                Review curated artifacts and publish to the registry
                </p>
              </div>
              
              <div className="text-center group cursor-pointer">
                <div className="relative inline-block mb-6">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-[#8023C3] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-16 h-16 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#8023C3] transition-colors">Deploy</h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  Deploy approved artifacts on managed infrastructure
                </p>
              </div>
              
              <div className="text-center group cursor-pointer">
                <div className="relative inline-block mb-6">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-[#8023C3] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-16 h-16 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    4
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#8023C3] transition-colors">Consume</h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  Pull and run with a single command
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Build Section */}
      <section className="py-20 px-8 bg-[#0f1219]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-2">
            What You Can Build
          </h2>
          <p className="text-center text-xl text-slate-300 mb-12">
            agentregistry supports all your AI artifact types
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-[#1a1f30]/50 p-10 rounded-xl text-center border border-[#202535] hover:bg-[#1a1f30] transition-colors">
              <div className="flex justify-center mb-6">
                <KagentLogo className="w-20 h-20 text-slate-300" />
              </div>
              <h4 className="text-xl text-white mb-2">AI Agents</h4>
              <p className="text-slate-300 leading-relaxed">
                Autonomous agents that can reason, plan, and execute tasks
              </p>
            </div>
            <div className="bg-[#1a1f30]/50 p-10 rounded-xl text-center border border-[#202535] hover:bg-[#1a1f30] transition-colors">
              <div className="flex justify-center mb-6">
                <McpIcon className="w-20 h-20 text-slate-300" />
              </div>
              <h4 className="text-xl text-white mb-2">MCP Servers</h4>
              <p className="text-slate-300 leading-relaxed">
                Model Context Protocol servers for extended AI capabilities
              </p>
            </div>
            <div className="bg-[#1a1f30]/50 p-10 rounded-xl text-center border border-[#202535] hover:bg-[#1a1f30] transition-colors">
              <div className="flex justify-center mb-6">
                <Anthropic className="w-20 h-20 text-slate-300" />
              </div>
              <h4 className="text-xl text-white mb-2">Skills</h4>
              <p className="text-slate-300 leading-relaxed">
                Reusable capabilities and functions for your AI applications
              </p>
            </div>
            <div className="bg-[#1a1f30]/50 p-10 rounded-xl text-center border border-[#202535] hover:bg-[#1a1f30] transition-colors">
              <div className="flex justify-center mb-6">
                <OpenAI className="w-20 h-20 text-slate-300" />
              </div>
              <h4 className="text-xl text-white mb-2">LLMs</h4>
              <p className="text-slate-300 leading-relaxed">
                Large language models for easy consumption by agents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-8 bg-[#151927]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the agentregistry community
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Build the future of AIOps and AI application development with us.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href={DiscordLink}
              target="_blank"
              className="inline-flex items-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Discord
            </a>
            <a
              href={GithubRepoLink}
              target="_blank"
              className="inline-flex items-center gap-3 bg-[#1a1f30] hover:bg-[#202535] text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-[#202535] transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          <span className="absolute top-5 right-10 text-white text-6xl font-light cursor-pointer hover:text-[#8023C3] transition-colors">
            &times;
          </span>
          <div className="relative max-w-[95%] max-h-[95%] animate-zoom-in">
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}

