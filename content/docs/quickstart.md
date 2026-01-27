---
title: Get started
weight: 5
description:
---

Agentregistry is an open source, secure, and centralized AI artifact registry that helps you build, package, publish, discover, and govern AI artifacts, including agents, skills, and MCP servers. With agentregistry, you can seamlessly deploy AI artifacts to any environment and share them among teams. 

Want to learn more about agentregistry? Check out the [About](/docs/about/) section. 

## Before you begin

1. Set up a Docker Engine on your local machine, such as [Docker Desktop](https://docs.docker.com/desktop/). 
2. Start the Docker Engine. 

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

With our agentregistry up and running, you can explore how to build, publish,deploy, and curate agents, MCP servers, skills, and LLMs. Check out the following guides: 

* [Build and run an agent on your local machine](/docs/agents/build/)
* [Publish an agent image to agentregistry](/docs/agents/publish/)
* [Deploy an agent to your environment](/docs/agents/deploy)
  
