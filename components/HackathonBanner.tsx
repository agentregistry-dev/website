"use client";

import { useState, useEffect } from "react";

export default function HackathonBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed top-24 right-6 z-50 max-w-xs rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background:
          "linear-gradient(135deg, #0a0e1a 0%, #111833 50%, #0a0e1a 100%)",
        border: "1px solid rgba(0, 255, 255, 0.3)",
        animation: "cyber-glow 3s ease-in-out infinite",
      }}
    >
      {/* Scanline texture overlay (::after equivalent) */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background:
            "linear-gradient(transparent 50%, rgba(0, 255, 255, 0.03) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Animated scanline bar */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: "8px",
          background:
            "linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.1), transparent)",
          animation: "scanline 3s linear infinite",
        }}
      />

      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-3 text-cyan-400/60 hover:text-cyan-300 text-lg leading-none cursor-pointer z-10 transition-colors"
        aria-label="Dismiss"
      >
        &times;
      </button>

      <div className="p-5 relative">
        {/* Subtitle */}
        <div
          className="text-[10px] uppercase tracking-[0.3em] mb-2"
          style={{ color: "rgba(0, 255, 255, 0.6)" }}
        >
          // Virtual Hackathon
        </div>

        {/* Title */}
        <div
          className="text-xl font-bold mb-2"
          style={{
            color: "#00ffff",
            fontFamily: "monospace",
            animation: "flicker 4s infinite",
            textShadow:
              "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.4)",
          }}
        >
          MCP_HACK//26
        </div>

        {/* Description */}
        <p
          className="text-xs leading-relaxed mb-4"
          style={{ color: "rgba(200, 210, 255, 0.7)" }}
        >
          Build with <span style={{ color: "#00ffff" }}>MCP</span> &{" "}
          <span style={{ color: "#ff00ff" }}>AI Agents</span>.
          <br />
          $5,000 in prizes. Feb 2 – Mar 1, 2026.
        </p>

        {/* CTA */}
        <a
          href="https://aihackathon.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center text-sm font-bold rounded px-4 py-2.5 transition-all duration-200 uppercase tracking-[0.1em]"
          style={{
            background: "linear-gradient(90deg, #00ffff, #00ccff)",
            color: "#0a0e1a",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #00ffff, #ff00ff)";
            e.currentTarget.style.boxShadow =
              "0 0 20px rgba(0,255,255,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #00ffff, #00ccff)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Register Now →
        </a>
      </div>
    </div>
  );
}
