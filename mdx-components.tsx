import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/CodeBlock';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-5xl md:text-6xl font-bold mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-white mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-white mb-4">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-slate-300 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-slate-300 space-y-3 list-disc list-inside">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="text-slate-300 space-y-3 list-decimal list-inside ml-4">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-slate-300">{children}</li>
    ),
    code: ({ children, className }) => {
      // Inline code (no className means it's inline)
      if (!className) {
        return <code className="text-slate-300 bg-[#202535] px-2 py-1 rounded font-mono text-sm">{children}</code>;
      }
      // Code block (has className like "language-shell")
      return <code className="text-slate-300 font-mono text-sm">{children}</code>;
    },
    pre: ({ children }) => (
      <CodeBlock>{children}</CodeBlock>
    ),
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="text-[#8023C3] hover:text-[#9945d4] underline" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="text-slate-200 font-semibold">{children}</strong>
    ),
    kbd: ({ children }) => (
      <kbd className="bg-[#202535] px-2 py-1 rounded border border-[#202535]">{children}</kbd>
    ),
    blockquote: ({ children }) => (
      <div className="bg-[#202535] border border-[#202535] rounded-lg p-6">
        {children}
      </div>
    ),
    ...components,
  };
}

