---
title: Get started
weight: 5
description:
---

Agentregistry is an open-source orchestrator and registry designed to provide a deployment mechanism for Agents, Agent Skills, and MCP Servers. You can use agentregistry to deploy agents that are written in any framework (CrewAI, Agentic Development Kit, Kagent) to agentic platforms and Kubernetes. Before deploying to agentic platforms, you can select the MCP servers, tools, and agent skills that you want to attach to your agent.

## Before you begin

Set up a Docker Engine on your local machine. For example, you can use [Docker Desktop](https://docs.docker.com/desktop/). The engine is required to run agentregistry locally. 

Before starting, you will need a Docker Engine running locally on your machine. The easiest/most universal approach is most likely going to be [Dockerhub](https://hub.docker.com/welcome). 

## Setup

1. Install the agentregistry `arctl` binary on your local machine. The binary is automatically added to the `usr/local/bin/arctl` directory. 
   ```
   curl -fsSL https://raw.githubusercontent.com/agentregistry-dev/agentregistry/main/scripts/get-arctl | bash
   ```

2. Start the agentregistry daemon by running any `arctl` command, such as `arctl version`. 
   ```sh
   arctl version
   ```

   Example output when the agentregistry daemon starts: 
   ```console
   Starting agentregistry daemon...
   ✓ agentregistry daemon started successfully
   ```

   Example output when the agentregistry daemon already runs:
   ```console
   arctl version 0.1.13
   Git commit: f193977
   Build date: 2026-01-26
   Server version: 0.1.13
   Server git commit: f193977
   Server build date: 2026-01-25
   Server or local version is not a valid semantic version, not sure if update require: 0.1.13 or 0.1.13
   ```

## Access agentregistry

[Open the agentregistry UI](http://localhost:12121/) in your browser. 

When you started the agentregistry daemon, the UI is automatically forwarded on port 12121. 
{{< reuse-image src="img/ar-local.png"  >}}
{{< reuse-image-dark srcDark="img/ar-local.png" >}}

## Next

Check out the following guides to push an agent to your registry. 

* [Create and push an agent to agentregistry](/docs/agents/push/)
* [Deploy an agent to your environment](/docs/agents/deploy)
  
