import { ReactNode } from 'react';
import { DiscordLink, GithubRepoLink } from "@/lib/links";

interface Props {
  children?: ReactNode;
}

export function Hero({ children }: Props) {
  return (
    <section className="bg-gradient-to-br from-[#151927] via-[#1a1f30] to-[#8023C3]/20 text-white px-8 py-20">
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </section>
  );
}

export function MainContent({ children }: Props) {
  return (
    <section className="bg-[#151927] py-16 px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {children}
      </div>
    </section>
  );
}

export function H1({ children }: Props) {
  return <h1 className="text-5xl md:text-6xl font-bold mb-6">{children}</h1>;
}

export function H2({ children }: Props) {
  return <h2 className="text-3xl font-bold text-white mb-6">{children}</h2>;
}

export function H3({ children }: Props) {
  return <h3 className="text-2xl font-bold text-white mb-4">{children}</h3>;
}

export function P({ children }: Props) {
  return <p className="text-slate-300 leading-relaxed">{children}</p>;
}

export function Lead({ children }: Props) {
  return <p className="text-xl text-slate-300 font-light leading-relaxed">{children}</p>;
}

export function LargeP({ children }: Props) {
  return <p className="text-lg text-slate-300 leading-relaxed">{children}</p>;
}

export function Strong({ children }: Props) {
  return <strong className="text-slate-200">{children}</strong>;
}

export function Code({ children }: Props) {
  return <code className="text-slate-300 bg-[#202535] px-2 py-1 rounded">{children}</code>;
}

export function CodeBlock({ children }: Props) {
  return (
    <div className="bg-[#0f1219] border border-[#202535] rounded-lg p-6 overflow-x-auto">
      <code className="text-slate-300 font-mono">{children}</code>
    </div>
  );
}

export function Note({ children }: Props) {
  return (
    <div className="bg-[#202535] border border-[#202535] rounded-lg p-6">
      {children}
    </div>
  );
}

export function InfoBox({ children }: Props) {
  return (
    <div className="bg-[#1a1f30] border border-[#202535] rounded-lg p-6">
      {children}
    </div>
  );
}

export function Kbd({ children }: Props) {
  return <kbd className="bg-[#202535] px-2 py-1 rounded border border-[#202535]">{children}</kbd>;
}

interface LinkProps {
  href: string;
  children: ReactNode;
}

export function ExternalLink({ href, children }: LinkProps) {
  return (
    <a 
      href={href} 
      className="text-[#8023C3] hover:text-[#9945d4] underline" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

interface ScenarioNumberProps {
  number: number;
  title: string;
}

export function ScenarioHeader({ number, title }: ScenarioNumberProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-xl font-bold">
        {number}
      </div>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
    </div>
  );
}

export function ScenarioContent({ children }: Props) {
  return <div className="ml-16 space-y-6">{children}</div>;
}

export function UL({ children }: Props) {
  return <ul className="text-slate-300 space-y-3 list-disc list-inside">{children}</ul>;
}

export function OL({ children }: Props) {
  return <ol className="text-slate-300 space-y-4 list-decimal ml-6">{children}</ol>;
}

export function LI({ children }: Props) {
  return <li className="text-slate-300">{children}</li>;
}

export function NextSteps() {
  return (
    <div className="border-t border-[#202535] pt-12 text-center">
      <h2 className="text-3xl font-bold text-white mb-6">Next Steps</h2>
      <p className="text-xl text-slate-300 mb-10 leading-relaxed">
        Join the agentregistry community and contribute to the future of AI development.
      </p>
      <div className="flex gap-6 justify-center flex-wrap">
        <a
          href={DiscordLink}
          className="inline-flex items-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-xl hover:-translate-y-1"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          Join Discord
        </a>
        <a
          href={GithubRepoLink}
          className="inline-flex items-center gap-3 bg-[#1a1f30] hover:bg-[#202535] text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-[#202535] transition-all hover:shadow-xl hover:-translate-y-1"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  );
}

