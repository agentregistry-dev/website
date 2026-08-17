---
title: Get started
weight: 5
description: "Get started with agentregistry."
---

Agentregistry is an open source, secure, and centralized AI artifact catalog that helps you build, package, publish, discover, and govern Docker images for AI artifacts, including agents, skills, and MCP servers that are spread across multiple container registries and GitHub repositories. It provides a centralized view of the images you allow your teams to share and deploy into their environments. 

Want to learn more about agentregistry? Check out the [About](/docs/about/) section. 

## About this guide

In this guide, you learn how to install agentregistry for local development with Docker. This approach is useful if you want to run agentregistry from your local machine, an on-prem environment, or a VM. Agentregistry is spun up by using Docker containers and you can use this installation to deploy AI artifacts to your local environment and Kubernetes clusters. 

To install agentregistry in a Kubernetes cluster instead, see the [Install in Kubernetes](/docs/install/kubernetes) guide. 

## Before you begin

1. Set up and start a Docker Engine on your local machine, such as [Docker Desktop](https://docs.docker.com/desktop/). Agentregistry uses Docker compose to build Docker images and spin up AI artifacts.
2. If you want to use agentregistry to push images to your Docker image registry, log in to your registry. For example, you might use Dockerhub (`docker.io`) or GitHub Container Registry (`ghcr.io`) as your image registry. Note that this step is required if you want to use agentregistry to build and push images to your registry. For local testing, you can skip this step and instead build images locally only.  
   ```sh
   docker login
   ```

## Setup

{{< reuse "ar-docs/setup-docker.md" >}}

## Next

With agentregistry up and running, you can explore how to build, publish, and deploy AI artifacts. Check out the following guides for more information: 

* [**Agents**](/docs/agents/): Explore how to build, run, and publish Docker images for agents. 
* [**MCP servers**](/docs/mcp/): Create and run MCP tool servers, add tools, and publish them as Docker images in agentregistry. 
* [**Skills**](/docs/skills/): Build and publish skills that you can add to your agents. 
* [**Prompts**](/docs/prompts/): Build and publish prompts that you can add to your agents. 

> [!TIP]
> To stop the registry while preserving its data, run `docker compose -f agentregistry-compose.yml down`. If you want to also remove the bundled PostgreSQL volume, add the `-v` flag. 
