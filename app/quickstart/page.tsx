"use client";

export default function Quickstart() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#8023C3]/20 text-white px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get Started with agentregistry
          </h1>
          <p className="text-xl text-slate-300 font-light leading-relaxed">
            Follow this guide to install agentregistry, create your first AI artifact, and publish it to the registry.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-slate-900 py-16 px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Installation */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-xl font-bold">
                1
              </div>
              <h2 className="text-3xl font-bold text-white">Installation</h2>
            </div>
            <div className="ml-16 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Install the agentregistry CLI tool using pip:
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">
                  pip install agentregistry
                </code>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed">
                Verify the installation:
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">
                  agentregistry --version
                </code>
              </div>
            </div>
          </div>

          {/* Authentication */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-xl font-bold">
                2
              </div>
              <h2 className="text-3xl font-bold text-white">Authentication</h2>
            </div>
            <div className="ml-16 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Log in to your agentregistry account:
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">
                  agentregistry login
                </code>
              </div>
              <p className="text-slate-300">
                This will prompt you for your credentials and store an authentication token locally.
              </p>
            </div>
          </div>

          {/* Create Your First Artifact */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-xl font-bold">
                3
              </div>
              <h2 className="text-3xl font-bold text-white">Create Your First Artifact</h2>
            </div>
            <div className="ml-16 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Initialize a new artifact project:
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">
                  agentregistry init my-first-agent
                </code>
              </div>
              <p className="text-slate-300">
                This creates a new directory with a template structure. Navigate to the directory:
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">
                  cd my-first-agent
                </code>
              </div>
              <p className="text-slate-300">
                The generated structure includes configuration files and example code to get you started quickly.
              </p>
            </div>
          </div>

          {/* Test Locally */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-xl font-bold">
                4
              </div>
              <h2 className="text-3xl font-bold text-white">Test Locally</h2>
            </div>
            <div className="ml-16 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Run your artifact locally to test it:
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">
                  agentregistry run
                </code>
              </div>
              <p className="text-slate-300">
                This launches your artifact in a local development environment where you can test and debug before publishing.
              </p>
            </div>
          </div>

          {/* Publish to Registry */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-xl font-bold">
                5
              </div>
              <h2 className="text-3xl font-bold text-white">Publish to Registry</h2>
            </div>
            <div className="ml-16 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Once you're satisfied with your artifact, publish it to the registry:
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">
                  agentregistry publish
                </code>
              </div>
              <p className="text-slate-300">
                Your artifact is now available in the registry for others to discover and use.
              </p>
            </div>
          </div>

          {/* Pull and Run */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-xl font-bold">
                6
              </div>
              <h2 className="text-3xl font-bold text-white">Pull and Run Artifacts</h2>
            </div>
            <div className="ml-16 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Pull an artifact from the registry:
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">
                  agentregistry pull username/artifact-name
                </code>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Run the pulled artifact:
              </p>
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">
                  agentregistry run username/artifact-name
                </code>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="border-t border-slate-800 pt-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Next Steps</h2>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Join the agentregistry community and contribute to the future of AI development.
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-slate-700 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

