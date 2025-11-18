"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: React.ReactNode;
}

export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Extract text content from the code element
    const codeElement = (children as any)?.props?.children;
    const textContent = typeof codeElement === 'string' 
      ? codeElement 
      : codeElement?.props?.children || '';
    
    try {
      await navigator.clipboard.writeText(textContent.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group">
      <div className="bg-[#0f1219] border border-[#202535] rounded-lg p-6 overflow-x-auto">
        {children}
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-md bg-[#202535] hover:bg-[#2a2f45] border border-[#202535] transition-all opacity-0 group-hover:opacity-100"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-slate-400" />
        )}
      </button>
    </div>
  );
}

