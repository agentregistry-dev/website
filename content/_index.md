---
toc: false
---

<div class="w-screen max-w-none relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] not-prose -mt-4 -mb-8">
{{< hackathon-banner >}}

<!-- Hero Section -->
<section class="bg-gradient-to-br from-[#151927] via-[#1a1f30] to-[#8023C3]/20 text-white text-center px-8 py-32 relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-tr from-[#8023C3]/10 via-transparent to-purple-500/5 pointer-events-none"></div>
  <div class="relative z-10 max-w-5xl mx-auto">
    <h1 class="text-6xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-white">
      Fast-track AI innovation
    </h1>
    <p class="text-2xl md:text-3xl text-slate-300 font-light mb-12 tracking-wide">
      With a centralized, trusted, curated registry
    </p>
    <div class="flex gap-4 justify-center flex-wrap">
      <a href="/docs/quickstart" class="inline-block<h bg-white text-[#8023C3] px-10 py-4 rounded-lg font-semibold text-lg transition-transform hover:-translate-y-1 hover:shadow-2xl">
        Get Started
      </a>
      <a href="https://github.com/agentregistry-dev/agentregistry/" target="_blank" rel="noopener noreferrer" class="inline-block bg-transparent text-white px-10 py-4 rounded-lg font-semibold text-lg border-2 border-white transition-all hover:bg-white/10">
        View on GitHub
      </a>
    </div>
  </div>
</section>

<!-- Diagrams Section -->
<section class="py-20 px-8 bg-[#151927]">
  <div class="max-w-7xl mx-auto">
    <div class="grid md:grid-cols-2 gap-12">
      <!-- Organization Card -->
      <div class="bg-[#1a1f30] rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-transform">
        <div class="px-8 pt-8 pb-4">
          <div class="inline-block bg-[#202535]/50 text-slate-300 text-sm font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
            For Organizations
          </div>
          <h3 class="text-3xl text-white mb-2">Curate & Deploy</h3>
          <p class="text-lg text-slate-300">
            Package, collect, and enrich AI artifacts from any source in a single centralized registry
          </p>
        </div>
        <div class="bg-gradient-to-br from-[#202535] to-[#1a1f30] border-t border-b border-[#202535] cursor-pointer hover:from-[#252a3f] hover:to-[#202535] transition-all relative overflow-hidden group" onclick="openLightbox('org')">
          <img src="/img/operator-scenario.svg" alt="Organization workflow diagram" class="w-full h-90 object-contain">
          <div class="absolute bottom-6 right-6 bg-[#8023C3]/90 text-slate-200 px-4 py-2 rounded-md text-sm font-semibold group-hover:bg-[#8023C3] transition-colors">
            Click to expand ↗
          </div>
        </div>
        <div class="p-8">
          <ul class="space-y-4">
            <li class="pb-4 border-b border-[#202535] text-slate-300 leading-relaxed">
              <strong class="text-white font-semibold">Centralized Control</strong> – Package and collect AI artifacts from any source into a single registry
            </li>
            <li class="pb-4 border-b border-[#202535] text-slate-300 leading-relaxed">
              <strong class="text-white font-semibold">Security & Governance</strong> – Curate and approve agents, servers, and skills before company-wide deployment
            </li>
            <li class="text-slate-300 leading-relaxed">
              <strong class="text-white font-semibold">Enriched Metadata</strong> – Add context to help assess trustworthiness and security
            </li>
          </ul>
        </div>
      </div>
      <!-- Developer Card -->
      <div class="bg-[#1a1f30] rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-transform">
        <div class="px-8 pt-8 pb-4">
          <div class="inline-block bg-[#202535]/50 text-slate-300 text-sm font-semibold px-4 py-2 rounded-full mb-4 uppercase tracking-wider">
            For Developers
          </div>
          <h3 class="text-3xl text-white mb-2">Build & Publish</h3>
          <p class="text-lg text-slate-300">
            Build, test, and publish and deploy AI artifacts with minimal dependencies
          </p>
        </div>
        <div class="bg-gradient-to-br from-[#202535] to-[#1a1f30] border-t border-b border-[#202535] cursor-pointer hover:from-[#252a3f] hover:to-[#202535] transition-all relative overflow-hidden group" onclick="openLightbox('dev')">
          <img src="/img/dev-scenario.svg" alt="Developer workflow diagram" class="w-full h-90 object-contain">
          <div class="absolute bottom-6 right-6 bg-[#8023C3]/90 text-slate-200 px-4 py-2 rounded-md text-sm font-semibold group-hover:bg-[#8023C3] transition-colors">
            Click to expand ↗
          </div>
        </div>
        <div class="p-8">
          <ul class="space-y-4">
            <li class="pb-4 border-b border-[#202535] text-slate-300 leading-relaxed">
              <strong class="text-white font-semibold">Local Development</strong> – Create and test agents, skills, and MCP servers locally
            </li>
            <li class="pb-4 border-b border-[#202535] text-slate-300 leading-relaxed">
              <strong class="text-white font-semibold">Easy Publishing</strong> – Publish your artifacts to a registry with a single command
            </li>
            <li class="pb-4 border-b border-[#202535] text-slate-300 leading-relaxed">
              <strong class="text-white font-semibold">Pull & Run Anywhere</strong> – Pull artifacts from the registry and run them in any environment instantly
            </li>
            <li class="text-slate-300 leading-relaxed">
              <strong class="text-white font-semibold">Discover & Consume</strong> – Find new artifacts to add to registry or optimize existing artifacts
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Video Tutorial Section -->
<section class="py-20 px-8 bg-[#0f1219]">
  <div class="max-w-5xl mx-auto text-center">
    <h2 class="text-4xl font-bold text-white mb-4">
      See It In Action
    </h2>
    <p class="text-xl text-slate-300 mb-10 leading-relaxed">
      Learn how to create an Anthropic Skill, publish it to agentregistry, and use it in Claude Code
    </p>
    <div class="bg-[#1a1f30] rounded-2xl overflow-hidden shadow-2xl">
      <div class="relative pb-[56.25%] h-0">
        <iframe
          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/l6QicyGg46A"
          title="agentregistry Tutorial: Create and Publish an Anthropic Skill"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
      <div class="p-8 text-left">
        <p class="text-slate-300 text-lg leading-relaxed">
          In this video, you'll learn how to use agentregistry to create an Anthropic Skill, push and publish it to the agentregistry and then pull it and use it in Claude Code.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Centralized Registry Section -->
<section class="py-20 px-8 bg-gradient-to-br from-[#1a1f30] to-purple-900/30">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-4xl font-bold text-center text-white mb-2">
      Bring control and velocity to your AI infrastructure
    </h2>
    <div class="grid md:grid-cols-3 gap-12 mt-12">
      <div class="bg-[#1a1f30] p-10 rounded-xl shadow-lg text-center">
        <div class="text-6xl mb-6">✨</div>
        <h3 class="text-2xl text-white mb-4">Enriched Data</h3>
        <p class="text-slate-300 leading-relaxed text-lg">
          Import AI artifacts from any registry into Agentregistry, where automatic scoring and validation enriches datasets and delivers deeper insights for operators.
        </p>
      </div>
      <div class="bg-[#1a1f30] p-10 rounded-xl shadow-lg text-center">
        <div class="text-6xl mb-6">🔒</div>
        <h3 class="text-2xl text-white mb-4">Controlled Curation</h3>
        <p class="text-slate-300 leading-relaxed text-lg">
          Build curated artifact collections within agentregistry. Publish items selectively, and maintain end-to-end audit and control from a centralized registry.
        </p>
      </div>
      <div class="bg-[#1a1f30] p-10 rounded-xl shadow-lg text-center">
        <div class="text-6xl mb-6">⚡</div>
        <h3 class="text-2xl text-white mb-4">Build Fast</h3>
        <p class="text-slate-300 leading-relaxed text-lg">
          Accelerate applications to production by empowering developers to create, run, and deploy agents, MCP servers, and skills from agent registry with confidence
        </p>
      </div>
    </div>
  </div>
</section>

<!-- How It Works Section -->
<section class="py-20 px-8 bg-[#151927]">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-4xl font-bold text-center text-white mb-4">
      How It Works
    </h2>
    <p class="text-center text-xl text-slate-300 mb-16">
      A complete lifecycle for AI artifacts
    </p>
    <!-- Timeline Flow -->
    <div class="relative">
      <!-- Connecting Line -->
      <div class="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#202535] -translate-y-1/2"></div>
      <div class="grid md:grid-cols-4 gap-8 relative">
        <div class="text-center group cursor-pointer">
          <div class="relative inline-block mb-6">
            <!-- Glow effect on hover -->
            <div class="absolute inset-0 bg-[#8023C3] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div class="relative w-16 h-16 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              1
            </div>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[#8023C3] transition-colors">Import</h3>
          <p class="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
            Collect AI artifacts from any source
          </p>
        </div>
        <div class="text-center group cursor-pointer">
          <div class="relative inline-block mb-6">
            <!-- Glow effect on hover -->
            <div class="absolute inset-0 bg-[#8023C3] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div class="relative w-16 h-16 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              2
            </div>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[#8023C3] transition-colors">Curate</h3>
          <p class="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
            Review curated artifacts and publish to the registry
          </p>
        </div>
        <div class="text-center group cursor-pointer">
          <div class="relative inline-block mb-6">
            <!-- Glow effect on hover -->
            <div class="absolute inset-0 bg-[#8023C3] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div class="relative w-16 h-16 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              3
            </div>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[#8023C3] transition-colors">Deploy</h3>
          <p class="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
            Deploy approved artifacts on managed infrastructure
          </p>
        </div>
        <div class="text-center group cursor-pointer">
          <div class="relative inline-block mb-6">
            <!-- Glow effect on hover -->
            <div class="absolute inset-0 bg-[#8023C3] rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div class="relative w-16 h-16 bg-[#8023C3] rounded-full flex items-center justify-center text-white text-2xl font-bold transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              4
            </div>
          </div>
          <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-[#8023C3] transition-colors">Consume</h3>
          <p class="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
            Pull and run with a single command
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- What You Can Build Section -->
<section class="py-20 px-8 bg-[#0f1219]">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-4xl font-bold text-center text-white mb-2">
      What You Can Build
    </h2>
    <p class="text-center text-xl text-slate-300 mb-12">
      agentregistry supports all your AI artifact types
    </p>
    <div class="grid md:grid-cols-4 gap-8">
      <div class="bg-[#1a1f30]/50 p-10 rounded-xl text-center border border-[#202535] hover:bg-[#1a1f30] transition-colors">
        <div class="flex justify-center mb-6">
          <svg width="80" height="80" viewBox="0 0 378 286" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-slate-300">
            <path d="M283.198 143.037H236.099V190.438H283.198V143.037Z" fill="currentColor" />
            <path d="M189.074 143.037H141.975V190.438H189.074V143.037Z" fill="currentColor" />
            <path d="M330.223 48.3099L283.124 0.90918H236.099H189H141.975H94.8759V48.3099H47.8507V95.6364H0.75177V143.037V190.364L47.8507 237.764L94.8759 285.091H141.975H189H236.099H283.124H330.223V237.764H283.124H236.099H189H141.975H94.8759V190.364V143.037V95.6364H141.975H189H236.099H283.124H330.223V143.037V190.364V237.764H377.248V190.364V143.037V95.6364L330.223 48.3099Z" fill="currentColor" />
          </svg>
        </div>
        <h4 class="text-xl text-white mb-2">AI Agents</h4>
        <p class="text-slate-300 leading-relaxed">
          Autonomous agents that can reason, plan, and execute tasks
        </p>
      </div>
      <div class="bg-[#1a1f30]/50 p-10 rounded-xl text-center border border-[#202535] hover:bg-[#1a1f30] transition-colors">
        <div class="flex justify-center mb-6">
          <svg width="80" height="80" viewBox="0 0 156 174" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-slate-300" stroke="currentColor" stroke-width="12" stroke-linecap="round">
            <path d="M6 81.8528L73.8823 13.9706C83.255 4.598 98.451 4.598 107.823 13.9706C117.196 23.3431 117.196 38.5391 107.823 47.9117L56.5581 99.177" />
            <path d="M57.2653 98.47L107.823 47.9117C117.196 38.5391 132.392 38.5391 141.765 47.9117L142.118 48.2652C151.491 57.6378 151.491 72.8338 142.118 82.2063L80.7248 143.6C77.6006 146.724 77.6006 151.789 80.7248 154.913L93.331 167.52" />
            <path d="M90.8529 30.9411L40.6481 81.1457C31.2756 90.518 31.2756 105.714 40.6481 115.087C50.0207 124.459 65.2168 124.459 74.5894 115.087L124.794 64.8822" />
          </svg>
        </div>
        <h4 class="text-xl text-white mb-2">MCP Servers</h4>
        <p class="text-slate-300 leading-relaxed">
          Model Context Protocol servers for extended AI capabilities
        </p>
      </div>
      <div class="bg-[#1a1f30]/50 p-10 rounded-xl text-center border border-[#202535] hover:bg-[#1a1f30] transition-colors">
        <div class="flex justify-center mb-6">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.2 65" width="80" height="80" class="text-slate-300">
            <path fill="currentColor" d="M66.5,0H52.4l25.7,65h14.1L66.5,0z M25.7,0L0,65h14.4l5.3-13.6h26.9L51.8,65h14.4L40.5,0C40.5,0,25.7,0,25.7,0z M24.3,39.3l8.8-22.8l8.8,22.8H24.3z" />
          </svg>
        </div>
        <h4 class="text-xl text-white mb-2">Skills</h4>
        <p class="text-slate-300 leading-relaxed">
          Reusable capabilities and functions for your AI applications
        </p>
      </div>
      <div class="bg-[#1a1f30]/50 p-10 rounded-xl text-center border border-[#202535] hover:bg-[#1a1f30] transition-colors">
        <div class="flex justify-center mb-6">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="80" height="80" class="text-slate-300">
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
          </svg>
        </div>
        <h4 class="text-xl text-white mb-2">LLMs</h4>
        <p class="text-slate-300 leading-relaxed">
          Large language models for easy consumption by agents
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Community Section -->
<section class="py-20 px-8 bg-[#151927]">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-4xl font-bold text-white mb-6">
      Join the agentregistry community
    </h2>
    <p class="text-xl text-slate-300 mb-10 leading-relaxed">
      Build the future of AIOps and AI application development with us.
    </p>
    <div class="flex gap-6 justify-center flex-wrap">
      <a href="https://discord.gg/Af8bX99dbX" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-xl hover:-translate-y-1">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Discord
      </a>
      <a href="https://github.com/agentregistry-dev/agentregistry" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 bg-[#1a1f30] hover:bg-[#202535] text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-[#202535] transition-all hover:shadow-xl hover:-translate-y-1">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        View on GitHub
      </a>
    </div>
  </div>
</section>

<!-- Lightbox Modal -->
<div id="lightbox" class="fixed inset-0 z-[1000] bg-black/95 hidden items-center justify-center" onclick="closeLightbox()">
  <span class="absolute top-5 right-10 text-white text-6xl font-light cursor-pointer hover:text-[#8023C3] transition-colors" onclick="event.stopPropagation(); closeLightbox();">&times;</span>
  <div class="relative max-w-[95%] max-h-[95%]" onclick="event.stopPropagation()">
    <img id="lightbox-image" src="" alt="" class="w-full h-auto max-h-[90vh] object-contain rounded-lg">
  </div>
</div>

<script>
function openLightbox(type) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-image');
  
  if (type === 'org') {
    img.src = '/img/operator-scenario.svg';
    img.alt = 'Organization Workflow Diagram';
  } else if (type === 'dev') {
    img.src = '/img/dev-scenario.svg';
    img.alt = 'Developer Workflow Diagram';
  }
  
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});
</script>

</div>
