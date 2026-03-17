---
title: About agentregistry
weight: 10
description:
---

Agentregistry is an open source, centralized AI artifact catalog that helps you build, package, publish, discover, and govern AI artifacts—including agents, skills, MCP servers, and prompts—spread across multiple container registries and GitHub repositories. It provides a single source of truth for the AI building blocks your teams are allowed to share, deploy, and compose into applications.

## Challenges with AI Artifacts

As organizations build AI applications, they face significant challenges in discovering, managing, and governing AI artifacts across different environments and teams. These challenges apply broadly to all types of AI artifacts—agents, MCP servers, skills, prompts, and other AI components—regardless of the protocols or frameworks they use.

### Discovery across environments

One of the most pressing challenges is discovering which AI artifacts are available and where they can be found. AI artifacts are often scattered across multiple container registries, GitHub repositories, internal development environments, and third-party sources. This fragmentation makes it difficult for teams to:

- **Find available artifacts**: Without a centralized catalog, developers struggle to discover what agents, MCP servers, skills, or prompts already exist and are approved for use. This leads to duplicate work and inconsistent implementations.

- **Search and filter**: Without proper metadata and search capabilities, finding the right artifact for a specific use case becomes a time-consuming manual process.

### Governance and approval

Organizations need to ensure that only approved, secure, and validated AI artifacts are used in production environments. However, the current landscape lacks mechanisms for:

- **Approval workflows and cross-environment governance**: There's no standardized way to review, approve, and control which artifacts are available to teams. With artifacts spread across multiple environments, repositories, and registries, enforcing consistent security policies, quality standards, and compliance requirements is difficult.

- **Visibility into artifact status**: Teams often don't know which artifacts are approved for use. This lack of visibility can lead to security risks and compliance violations.

- **Audit and compliance**: Maintaining audit trails that show who approved an artifact and when becomes crucial to meet legal and compliance requirements.

### Artifact registry infrastructure

The infrastructure for managing AI artifacts at scale is fragmented and incomplete:

- **No standardized storage**: There's no unified way to store, version, and distribute AI artifacts across organizations and teams. Artifacts end up in different container registries, code repositories, or internal systems.

- **Naming and resolution**: Without a centralized naming and resolution system, it's unclear how to resolve artifact names to their actual locations, versions, or deployment endpoints across different environments.

- **Lifecycle management**: Managing the complete lifecycle of artifacts—from creation through deployment, updates, and deprecation—requires bundling together multiple tools and processes.

- **Metadata enrichment**: While some artifacts have basic metadata, there's no systematic way to enrich artifacts with validation scores, security assessments, usage analytics, or other contextual information that helps teams make informed decisions.

These challenges make it difficult for organizations to build production-ready AI applications where teams can confidently discover, deploy, and manage AI artifacts at scale. Without proper discovery and governance mechanisms, organizations risk security vulnerabilities, compliance issues, duplicated effort, and inconsistent implementations.

## How agentregistry fills the gaps

Learn how agentregistry allows you to overcome the challenge of managing AI artifacts across an organization.

### Build, package, and deploy

Agentregistry provides built-in tooling—both a CLI (`arctl`) and a web UI—to help developers manage the entire lifecycle of AI artifacts, including agents, MCP servers, skills, and prompts.

With `arctl`, you can scaffold new artifacts from templates, build and package them as Docker images, run them locally to verify they work, and publish them to agentregistry with a single command. Once published, artifacts can be pulled from the registry and deployed to a developer's local machine or a Kubernetes cluster, without any complex deployment configuration.

Skills and prompts have lightweight publishing options beyond Docker images: skills can be registered directly from a GitHub repository or a local folder, and prompts can be published as versioned text directly from the CLI.

Before deploying agents to agentic platforms, developers can use agentregistry to compose agents by selecting specific MCP servers, skills, and prompts to attach. This composition approach lets developers assemble powerful, customized agents from proven, tested registry components rather than building everything from scratch.

### Centralized governance and curation

Agentregistry enables organizations to establish comprehensive governance, maintain security standards, and ensure quality across all AI artifacts used within the company. Organizations can collect AI artifacts from any source—developed internally, sourced from open-source repositories, or obtained from third-party vendors—into a single registry that the organization controls. This eliminates fragmentation and provides a single source of truth for all AI artifacts.

You can implement review and approval workflows for artifacts before they become available to teams, ensuring that agents, servers, skills, and prompts meet security, quality, and compliance requirements. Only artifacts that are approved and published to agentregistry can be deployed into environments, preventing untested or potentially insecure artifacts from reaching production.

Agentregistry also tracks and manages multiple versions of artifacts, allowing teams to use stable versions while new versions are being tested and approved.

### Discovery

Agentregistry makes it easy for developers to discover, pull, and share AI artifacts across the organization through both the web UI and the `arctl` CLI. Artifacts can be searched by name, description, tags, or metadata. Agentregistry also supports semantic search powered by vector embeddings, so developers can find relevant artifacts by describing what they need rather than knowing exact names.

You can also track dependencies between artifacts—for example, which MCP servers or skills an agent depends on.

### Client integration

Once artifacts are in the registry, agentregistry can generate ready-to-use client configurations for popular AI development tools, including Claude Desktop, Cursor, and VS Code. This means developers can immediately start using approved MCP servers and agents in their local environments without manual configuration. Agentregistry also integrates with Agent Gateway to provide a unified MCP infrastructure access layer for teams deploying at scale.

### Data enrichment

Agentregistry automatically validates and scores ingested artifacts to provide deeper insights for both organizations and developers. When AI artifacts are imported from any source into agentregistry, the platform performs scoring and validation that enriches each artifact with contextual information—such as validation scores, security assessments, and metadata quality signals—helping teams make informed decisions about which artifacts to trust and deploy.

