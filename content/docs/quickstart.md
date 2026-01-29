---
title: Get started
weight: 5
description:
---

Agentregistry is an open source, secure, and centralized AI artifact catalog that helps you build, package, publish, discover, and govern Docker images for AI artifacts, including agents, skills, and MCP servers that are spread across multiple container registries and GitHub repositories. It provides a centralized view of the images you allow your teams to share and deploy into their environments. 

Want to learn more about agentregistry? Check out the [About](/docs/about/) section. 

## Before you begin

1. Set up and start a Docker Engine on your local machine, such as [Docker Desktop](https://docs.docker.com/desktop/). Agentregistry uses Docker compose to build Docker images and spin up AI artifacts.
2. If you want to use agentregistry to push images to your Docker image registry, log in to your registry. For example, you might use Dockerhub (`docker.io`) or GitHub Container Registry (`ghcr.io`) as your image registry. Note that this step is required if you want to use agentregistry to build and push images to your registry. For local testing, you can skip this step and instead build images locally only.  
   ```sh
   docker login
   ```

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

3. [Open the agentregistry UI](http://localhost:12121/) in your browser. The UI is automatically exposed on port 12121 on your local machine when you start the agentregistry daemon. 

   {{< reuse-image src="img/ar-local.png" width="800px" >}}
   {{< reuse-image-dark srcDark="img/ar-local.png" width="800px" >}}

## Next

With agentregistry up and running, you can explore how to build, publish, and deploy AI artifacts. Check out the following guides for more information: 

* [**Agents**](/docs/agents/): Explore how to build, run, and publish Docker images for agents. 
* [**MCP servers**](/docs/mcp/): Create and run MCP tool servers, add tools, and publish them as Docker images in agentregistry. 
* [**Skills**](/docs/skills/): Build and publish skills that you can add to your agents. 
  
