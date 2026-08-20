---
title: Get started
weight: 5
description: Install agentregistry in a Kubernetes cluster by using the Helm package manager. 
---

Agentregistry is an open source, centralized AI artifact catalog that helps you build, package, publish, and discover AI artifacts, including agents, skills, MCP servers, prompts, and plugins. It provides a single source of truth for the AI building blocks your teams share and deploy.

> [!TIP]
> Want to learn more about agentregistry? Check out the [About agentregistry]({{< link path="/about/" >}}) section.


## Before you begin

1. Install the following CLIs: 
   - [`kubectl`](https://kubernetes.io/docs/tasks/tools/)
   - [Helm](https://helm.sh/docs/intro/install/) v3 or later
2. Create or use an existing Kubernetes cluster. For local test setup, you can use [Kind](https://kind.sigs.k8s.io/). 
   ```sh
   kind create cluster
   ```

## Install agentregistry

{{< reuse "ar-docs/kubernetes.md" >}}

## Install the `arctl` CLI

{{< reuse "ar-docs/arctl.md" >}}

## Next steps

With agentregistry up and running, start adding AI artifacts to build out your AI artifact catalog. 

{{< cards >}}
{{< card link="/docs/agents/" title="Agents" description="Build, run, and publish agents." >}}
{{< card link="/docs/mcp/" title="MCP servers" description="Create and run MCP tool servers and publish them to the catalog." >}}
{{< card link="/docs/skills/" title="Skills" description="Build and publish skills that you can add to your agents." >}}
{{< card link="/docs/prompts/" title="Prompts" description="Build and publish prompts that you can add to your agents." >}}
{{< /cards >}}
