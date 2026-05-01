---
title: Install with Docker
weight: 10
description:
---

Use this guide to install agentregistry for local development with Docker. This approach is useful if you want to run agentregistry from your local machine, an on-prem environment, or a VM. Agentregistry is spun up using Docker containers and you can use this installation to build, publish, and deploy AI artifacts to your local environment and Kubernetes clusters.

To install agentregistry in a Kubernetes cluster instead, see the [Install in Kubernetes](/docs/install/kubernetes) guide.

## Before you begin

1. Set up and start a Docker Engine on your local machine, such as [Docker Desktop](https://docs.docker.com/desktop/). Agentregistry uses Docker Compose to build Docker images and spin up AI artifacts.
2. If you want to use agentregistry to push images to a Docker image registry, log in to your registry. For example, you might use Docker Hub (`docker.io`) or GitHub Container Registry (`ghcr.io`). This step is only required if you want to build and push images to a remote registry. For local testing, you can skip this step and build images locally only.
   ```sh
   docker login
   ```

## Install

1. Install the `arctl` binary on your local machine. The binary is automatically added to `/usr/local/bin/arctl`.
   ```sh
   curl -fsSL https://raw.githubusercontent.com/agentregistry-dev/agentregistry/main/scripts/get-arctl | bash
   ```

2. Start the agentregistry daemon. This starts the Docker containers that power agentregistry.
   ```sh
   arctl daemon start
   ```

   Example output:
   ```console
   Starting agentregistry daemon...
   ✓ agentregistry daemon started successfully
   ```

3. Verify the installation by checking the version.
   ```sh
   arctl version
   ```

   Example output:
   ```console
   arctl version 0.1.13
   Git commit: f193977
   Build date: 2026-01-26
   Server version: 0.1.13
   Server git commit: f193977
   Server build date: 2026-01-25
   ```

4. [Open the agentregistry UI](http://localhost:12121/) in your browser. The UI is automatically exposed on port `12121` when the daemon starts.

   {{< reuse-image src="img/ar-local.png" width="800px" >}}
   {{< reuse-image-dark srcDark="img/ar-local-dark.png" width="800px" >}}

## Next steps

With agentregistry up and running, you can explore how to build, publish, and deploy AI artifacts:

* [**Agents**](/docs/agents/): Build, run, and publish Docker images for agents.
* [**MCP servers**](/docs/mcp/): Create and run MCP tool servers, add tools, and publish them as Docker images.
* [**Skills**](/docs/skills/): Build and publish skills that you can add to your agents.
* [**Prompts**](/docs/prompts/): Build and publish prompts that you can add to your agents.
