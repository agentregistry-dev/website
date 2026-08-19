---
title: What is agentregistry?
weight: 10
description: "Learn more about agentregisty."
---

Agentregistry is an open source, centralized AI artifact catalog that helps you build, package, publish, and discover AI artifacts, including agents, skills, MCP servers, prompts, and plugins that are spread across multiple container registries and GitHub repositories. It provides a single source of truth for the AI building blocks your teams are allowed to share, deploy, and compose into applications.

## Challenges with AI Artifacts

As development teams build AI applications, they face significant challenges in discovering and managing AI artifacts across different environments. These challenges apply broadly to all types of AI artifacts, regardless of the protocols or frameworks they use.

### Tribal knowledge and informal sharing

Without a registry, teams fall back on informal channels: MCP server endpoints shared in Slack, skill files passed over email, and word-of-mouth about which prompts work best. This tribal knowledge breaks down as teams grow:

- Developers can't tell which artifacts exist or which are still actively maintained.
- A developer builds a useful skill and shares it with a colleague. When they iterate and improve it, the colleague is still running the old version, with no way to know that a newer version exists.
- MCP servers get stood up ad-hoc and shared informally. Over time, no one knows which are vetted by security, which are still running, or which expose sensitive capabilities.

This kind of fragmentation leads to duplicated work, inconsistent implementations, and security blind spots.

### Discovery across environments

One of the most pressing challenges is discovering which AI artifacts are available and where they can be found. AI artifacts are often scattered across multiple container registries, GitHub repositories, internal development environments, and third-party sources. This fragmentation makes it difficult for teams to:

- **Find available artifacts**: Without a centralized catalog, developers struggle to discover what agents, MCP servers, skills, or prompts already exist. This leads to duplicate work and inconsistent implementations.

- **Search and filter**: Without proper metadata and search capabilities, finding the right artifact for a specific use case becomes a time-consuming manual process.

### Skills and prompt version drift

Skills and prompts evolve constantly. A developer iterates on a skill ten times, but everyone they originally shared it with is still on version one. There is no way to notify consumers that a newer version exists, no single place to publish the latest iteration, and no mechanism to ensure that agents built by different teams are using the same approved prompt baseline.

### Artifact registry infrastructure

The infrastructure for managing AI artifacts at scale is fragmented and incomplete:

- **No standardized storage**: There's no unified way to store, version, and distribute AI artifacts across teams and registries. Artifacts end up in different container registries, code repositories, or personal machines.

- **Naming and resolution**: Without a centralized naming and resolution system, it's unclear how to resolve artifact names to their actual locations, versions, or deployment endpoints across different environments.

- **Lifecycle management**: Managing the complete lifecycle of artifacts, from creation through deployment, updates, and deprecation, requires bundling together multiple tools and processes.

These challenges make it difficult for teams to confidently discover, deploy, and manage AI artifacts. Without proper discovery mechanisms, teams risk duplicated effort and inconsistent implementations.

## How agentregistry fills the gaps

Learn how agentregistry allows you to overcome the challenge of managing AI artifacts across your team.

### Build, package, and deploy

Agentregistry provides built-in tooling to help developers manage the entire lifecycle of AI artifacts, including agents, MCP servers, skills, prompts, and plugins.

With the `arctl` CLI, you can scaffold new artifacts from templates, build and package them as Docker images, run them locally to verify they work, and publish them to agentregistry with a single command. Once published, artifacts can be pulled from the registry and deployed to a Kubernetes cluster, without any complex deployment configuration.

Before deploying agents to agentic platforms, developers can use agentregistry to compose agents by selecting specific MCP servers, skills, and prompts to attach. This composition approach lets developers assemble powerful, customized agents from proven, tested registry components rather than building everything from scratch.

### Centralized governance and curation

Agentregistry helps teams maintain standards and ensure quality across all AI artifacts they use. Teams can collect AI artifacts from multiple sources—internally developed, sourced from open-source repositories, or obtained from third-party vendors—into a single registry. This eliminates fragmentation and provides a single source of truth for all AI artifacts.

Agentregistry tracks and manages multiple versions of artifacts, allowing teams to use stable versions while new versions are being reviewed and updated.

### Discovery

Agentregistry makes it easy for developers to discover, pull, and share AI artifacts across the team through both the web UI and the `arctl` CLI. Artifacts can be searched by name, description, tags, or metadata. Agentregistry also supports semantic search powered by vector embeddings, so developers can find relevant artifacts by describing what they need rather than knowing exact names.

You can also track dependencies between artifacts, such as MCP servers or skills that an agent depends on.

## Next steps

{{< cards >}}
{{< card link="/docs/about/concepts/" title="Core concepts" description="Understand the catalog, artifact types, runtimes, and management interfaces." >}}
{{< /cards >}}
