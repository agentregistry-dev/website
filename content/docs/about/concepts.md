---
title: Core concepts
weight: 11
description: "Understand the key concepts of agentregistry, including the artifact catalog, artifact types, runtimes, and management interfaces."
---

Agentregistry addresses the AI artifact management challenges that arise as development teams grow: artifacts scattered across environments, tribal knowledge about which agents exist, and version drift of AI artifacts. 

Review the following core concepts and what they cover in agentregistry. Then, dive deeper into each concept. 

| Concept | What it covers |
| -- | -- |
| [Catalog](#catalog) | A centralized, searchable inventory that replaces ad-hoc artifact sharing across Slack, email, and personal machines |
| [Artifacts](#artifacts) | The AI building blocks the catalog stores: agents, MCP servers, prompts, and skills |
| [Runtimes](#runtimes) | Agentic platforms the registry connects to for deployment, agent discovery, and MCP traffic governance |
| [Management interfaces](#management-interfaces) | The registry UI, `arctl` CLI, and REST API |

## Catalog

An **artifact catalog** is a centralized, searchable inventory of all AI building blocks your team uses, including agents, MCP servers, prompts, and skills. Think of it as a package registry for AI, similar to how Docker Hub or `npm` manage container images and code libraries, but designed for the lifecycle management challenges that are unique to AI systems.

Without a catalog, teams end up with fragmented artifact sprawl. AI building blocks are scattered across GitHub repos, internal wikis, container registries, and personal machines. MCP server endpoints get shared over Slack and skill files get passed over email. When someone iterates on a skill, colleagues who received an earlier copy have no way of knowing whether a newer version exists.

The agentregistry catalog solves this by giving every artifact a single authoritative home and making discovery straightforward. Developers publish artifacts to the catalog with a version tag. Any team member can then search artifacts by name, description, or tag to find what is available.

## Artifacts

The catalog stores different types of AI artifacts so that they can be consumed, deployed, maintained, and shared between different teams. Each type has its own lifecycle, versioning semantics, and deployment options.

### Agents

An **agent** is a deployable unit that you publish, version, and deploy to a runtime through the registry. When you add an agent to the catalog, other teams can discover it, reuse it, or compose it into multi-agent workflows.

### MCP servers

An **MCP server** exposes tools that agents can call at runtime. Agentregistry supports the full development lifecycle for MCP servers: scaffold a server, build and package it as a Docker image, publish it to the catalog, and deploy it to a Kubernetes cluster.

### Skills

A **skill** is a reusable instruction set or slash command for AI agents that you can store as a versioned artifact in the catalog. Instead of sharing skill files ad-hoc, developers publish skills to the registry with a version tag. Consumers pull the latest version with a single `arctl pull` command. When the author iterates on a skill, they publish a new version to the catalog so that consumers can pull the update at any time.

Skills can be registered directly from a GitHub or GitLab repository or a local folder. No Docker image is required.

### Prompts

A **prompt** is a versioned system prompt or instruction template stored in the catalog. Prompts let teams publish shared baselines—such as safety guardrails, agent persona guidelines, or reasoning frameworks that developers can reference from their agent configurations. Like other artifact types, prompts are versioned so consumers can always see which iteration they are using and when a newer version becomes available.

### Plugins

A **plugin** is a versioned bundle of agent capabilities, including skills, MCP server declarations, and lifecycle hooks that you publish to the catalog as a single unit. Plugins follow the same packaging format that coding harnesses like [Claude Code](https://code.claude.com/docs/en/plugins) use to distribute and install reusable agent extensions.

> [!NOTE]
> Plugin management is available through the REST API and `arctl` CLI. A UI for plugins is not yet available in the open source release.

## Runtimes

A **runtime** is a platform where agentregistry deploys and manages agents and MCP servers. The following runtime types are supported. 

| Runtime | Description |
|---|---|
| **Kubernetes** | Deploy agents and MCP servers to a Kubernetes cluster by using the [kagent open source project](https://kagent.dev). This is the recommended runtime for shared team environments. |

## Management interfaces

Agentregistry exposes three interfaces for interacting with the registry. Each is suited to different personas and workflows.

### Registry UI

The registry UI is a browser-based dashboard for browsing and searching the catalog, managing artifacts, and deploying agents and MCP servers. It is served by the registry server on port `12121` by default.

### `arctl` CLI

`arctl` is the command-line interface for developers and operators who prefer scripting or terminal-based workflows. It covers the full artifact lifecycle, from scaffolding and publishing to querying the catalog and managing deployments. The CLI is the right choice for CI/CD pipelines, automated testing, and day-to-day developer tasks.

### REST API

The REST API exposes the full capabilities of the registry as HTTP endpoints, making it the right interface for automation engineers and teams that need to integrate the registry into custom tooling. Any action available in the UI or CLI is also available through the API.

## Next steps

{{< cards >}}
{{< card link="/docs/about/architecture/" title="Architecture" description="Review the components that make up agentregistry and the role that each one plays." >}}
{{< /cards >}}
