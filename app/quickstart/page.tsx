"use client";

import { DiscordLink, GithubRepoLink } from "@/lib/links";

export default function Quickstart() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#151927] via-[#1a1f30] to-[#8023C3]/20 text-white px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get Started with agentregistry
          </h1>
          <p className="text-xl text-slate-300 font-light leading-relaxed">
            Follow this guide to set up agentregistry and explore different scenarios for working with MCP servers and skills.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[#151927] py-16 px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Prerequisites */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Prerequisites</h2>
            <div className="space-y-4">
              <div className="bg-[#1a1f30] border border-[#202535] rounded-lg p-6">
                <ul className="text-slate-300 space-y-3 list-disc list-inside">
                  <li>Docker and docker-compose</li>
                  <li>Claude code with Anthropic key set up (for the skill scenario)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Setup */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Setup</h2>
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Go to the <a href="https://github.com/agentregistry-dev/agentregistry/releases" className="text-[#8023C3] hover:text-[#9945d4] underline" target="_blank" rel="noopener noreferrer">releases page</a> and find the latest release (e.g., <code className="text-slate-300 bg-[#202535] px-2 py-1 rounded">v0.0.4</code>).
              </p>
              <p className="text-slate-300 leading-relaxed">
                Find the CLI version that corresponds to your architecture and download it, then optionally move it to <code className="text-slate-300 bg-[#202535] px-2 py-1 rounded">/usr/local/bin</code>
              </p>
              <div className="bg-[#202535] border border-[#202535] rounded-lg p-6">
                <p className="text-slate-300 mb-2">
                  <strong>Note:</strong> On initial launch, the database will be automatically seeded. You'll need to wait for this to finish before using the CLI/UI – it shouldn't take more than a minute.
                </p>
                <p className="text-slate-300">
                  You can check the status by running:
                </p>
                <div className="bg-[#0f1219] rounded-lg p-4 mt-3 overflow-x-auto">
                  <code className="text-slate-300 font-mono">docker ps</code>
                </div>
                <p className="text-slate-300 mt-3">
                  Then check the logs with:
                </p>
                <div className="bg-[#0f1219] rounded-lg p-4 mt-3 overflow-x-auto">
                  <code className="text-slate-300 font-mono">docker logs [containerid]</code>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario 1 */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-xl font-bold">
                1
              </div>
              <h2 className="text-3xl font-bold text-white">Run an MCP server from the registry</h2>
            </div>
            <div className="ml-16 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                In this demo you'll run an MCP server from a registry, locally on your computer.
              </p>
              
              <p className="text-slate-300 leading-relaxed">
                If you try to list the MCP servers from the registry, you'll get an empty list because we haven't published any servers yet:
              </p>
              <div className="bg-[#0f1219] border border-[#202535] rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">arctl list mcp -A</code>
              </div>

              <p className="text-slate-300 leading-relaxed">
                <strong>Let's publish an MCP server using the UI:</strong>
              </p>
              <ol className="text-slate-300 space-y-3 list-decimal list-inside ml-4">
                <li>Go to the UI and search for "io.github.Asthanaji05/pokeapi-mcp-server"</li>
                <li>Open the server details and click on the <strong>Publish</strong> button to publish the server and make it available in the registry</li>
              </ol>

              <p className="text-slate-300 leading-relaxed">
                Back in the CLI, you can now run <code className="bg-[#202535] px-2 py-1 rounded">arctl list mcp -A</code> to see the server we published. Let's pull the server from the registry and run it locally:
              </p>
              <div className="bg-[#0f1219] border border-[#202535] rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">arctl run mcp io.github.Asthanaji05/pokeapi-mcp-server --version 1.12.0 --inspector</code>
              </div>

              <p className="text-slate-300 leading-relaxed">
                You'll get prompted whether to run the latest version - press enter to continue. The server will start locally and the MCP inspector will automatically launch. You can connect to the server (select the "Streamable HTTP" transport type), list the tools and invoke them.
              </p>

              <div className="bg-[#202535] border border-[#202535] rounded-lg p-6">
                <p className="text-slate-300">
                  <strong>Try it out:</strong> Use the <code className="bg-[#0f1219] px-2 py-1 rounded">getPokemonByName</code> tool, use "ditto" for the Pokemon name and check you get a response back.
                </p>
              </div>

              <p className="text-slate-300 leading-relaxed">
                Press <kbd className="bg-[#202535] px-2 py-1 rounded border border-[#202535]">CTRL+C</kbd> to stop running the server and MCP inspector.
              </p>
            </div>
          </div>

          {/* Scenario 2 */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-xl font-bold">
                2
              </div>
              <h2 className="text-3xl font-bold text-white">Add an MCP server to the registry</h2>
            </div>
            <div className="ml-16 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                In this section we'll use the UI to add an MCP server to the registry. We will use the <code className="bg-[#202535] px-2 py-1 rounded">@modelcontextprotocol/server-everything</code> as an example server to add.
              </p>

              <ol className="text-slate-300 space-y-4 list-decimal ml-6">
                <li>
                  <span className="text-slate-200">Open the UI</span>
                </li>
                <li>
                  <span className="text-slate-200">Click the <strong>Add</strong> dropdown and select <strong>Add Server</strong></span>
                </li>
                <li>
                  <span className="text-slate-200">Fill out the server information:</span>
                  <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>Server name: "mycompany.com/server-everything"</li>
                    <li>Display title: "server everything"</li>
                    <li>Version: "0.0.1"</li>
                    <li>Description: "Server everything example entry"</li>
                  </ul>
                </li>
                <li>
                  <span className="text-slate-200">Click the <strong>Add Package</strong> button:</span>
                  <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>Package identifier: @modelcontextprotocol/server-everything</li>
                    <li>Version: 2025.9.25</li>
                  </ul>
                </li>
                <li>
                  <span className="text-slate-200">Click <strong>Create Server</strong></span>
                </li>
              </ol>

              <p className="text-slate-300 leading-relaxed">
                The server will be added to your registry – you can find it in the list and click <strong>Publish</strong> to publish it. You'll see it in the "Published" tab in the UI or by running the <code className="bg-[#202535] px-2 py-1 rounded">arctl list mcp -A</code> command.
              </p>
            </div>
          </div>

          {/* Scenario 3 */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-xl font-bold">
                3
              </div>
              <h2 className="text-3xl font-bold text-white">Deploy an MCP server and connect to Claude code</h2>
            </div>
            <div className="ml-16 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                You can deploy a published MCP server from the registry UI. Let's deploy the Pokemon and server-everything servers.
              </p>

              <ol className="text-slate-300 space-y-4 list-decimal ml-6">
                <li>Open the UI</li>
                <li>Click on the <strong>Published</strong> tab</li>
                <li>Click the <strong>Deploy</strong> button on the pokeapi-mcp-server and the server-everything entries</li>
              </ol>

              <p className="text-slate-300 leading-relaxed">
                You'll see the deployed servers in the "Deployed" tab. Servers deployed in the registry have a well-known port they are accessible on, so they can be used in clients like VS Code, Cursor, Claude code and so on.
              </p>

              <p className="text-slate-300 leading-relaxed">
                For example, you can run the following command in your project opened in Cursor:
              </p>
              <div className="bg-[#0f1219] border border-[#202535] rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">arctl configure cursor --url http://localhost:21212/mcp</code>
              </div>

              <p className="text-slate-300 leading-relaxed">
                This command configures Cursor to connect to all MCP servers running in the registry. You'll be prompted by Cursor to enable the MCP server. You can click <strong>Enable</strong> and then open the "Tools & MCP" tab in the Cursor Settings to see the discovered tools and other resources from the MCP server.
              </p>
            </div>
          </div>

          {/* Scenario 4 */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-xl font-bold">
                4
              </div>
              <h2 className="text-3xl font-bold text-white">Publish and pull a skill, then use it in Claude Code</h2>
            </div>
            <div className="ml-16 space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                Next, we'll deploy an existing skill to the agentregistry from the UI. We'll deploy an internal communications skill from Anthropic's skills demo repository.
              </p>

              <ol className="text-slate-300 space-y-4 list-decimal ml-6">
                <li>
                  <span className="text-slate-200">From the admin tab, click the <strong>Add</strong> dropdown and select <strong>Skill</strong></span>
                </li>
                <li>
                  <span className="text-slate-200">Enter the skill information:</span>
                  <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li>Name: "my-internal-comms-skill"</li>
                    <li>Description: "My internal communications skill"</li>
                    <li>Version: "latest"</li>
                    <li>Docker image: "docker.io/pj3677/internal-comms"</li>
                  </ul>
                </li>
                <li>
                  <span className="text-slate-200">Click <strong>Add Skill</strong></span>
                </li>
              </ol>

              <p className="text-slate-300 leading-relaxed">
                From the CLI you can check that the skill now shows up:
              </p>
              <div className="bg-[#0f1219] border border-[#202535] rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">arctl list skill -A</code>
              </div>

              <p className="text-slate-300 leading-relaxed">
                Let's pull the skill:
              </p>
              <div className="bg-[#0f1219] border border-[#202535] rounded-lg p-6 overflow-x-auto">
                <code className="text-slate-300 font-mono">skill pull my-internal-comms-skill ~/.claude/skills/my-internal-comms-skill</code>
              </div>

              <p className="text-slate-300 leading-relaxed">
                We're pulling the skill directly to the <code className="bg-[#202535] px-2 py-1 rounded">~/.claude/skills</code> folder which makes the skill automatically available to Claude Code.
              </p>

              <p className="text-slate-300 leading-relaxed">
                You can now launch Claude with <code className="bg-[#202535] px-2 py-1 rounded">claude</code> and say something like:
              </p>
              <div className="bg-[#0f1219] border border-[#202535] rounded-lg p-6">
                <p className="text-slate-300 italic">"can you help me write a company newsletter"</p>
              </div>

              <p className="text-slate-300 leading-relaxed">
                Claude will prompt you before using the "internal-comms" skill. You can select <strong>Yes</strong> to continue and have Claude go through the skill instructions and help you create a company newsletter.
              </p>
            </div>
          </div>

          {/* Next Steps */}
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

        </div>
      </section>
    </>
  );
}

