---
title: Install on Kubernetes
weight: 10
description: "Install agentregistry in a Kubernetes cluster with Helm for shared team access to a central artifact registry."
---

Use this guide to install agentregistry in a Kubernetes cluster by using Helm. This approach is useful for team environments where multiple developers need shared access to a central artifact registry.

## Before you begin

Make sure you have the following tools installed:

- [kubectl](https://kubernetes.io/docs/tasks/tools/) with access to a Kubernetes cluster
- [Helm](https://helm.sh/docs/intro/install/) v3 or later

## Install with Helm

{{< reuse "ar-docs/kubernetes.md" >}}

### Install the `arctl` CLI

{{< reuse "ar-docs/arctl.md" >}}

## Next steps

With agentregistry up and running, you can explore how to build, publish, and deploy AI artifacts:

* [**Agents**](/docs/agents/): Build, run, and publish Docker images for agents.
* [**MCP servers**](/docs/mcp/): Create and run MCP tool servers, add tools, and publish them as Docker images.
* [**Skills**](/docs/skills/): Build and publish skills that you can add to your agents.
* [**Prompts**](/docs/prompts/): Build and publish prompts that you can add to your agents.
* [**Connect AI development tools**]({{< link path="/setup/mcp-client/" >}}): Connect Claude Code, Cursor, VS Code, or Kiro to the registry catalog.
