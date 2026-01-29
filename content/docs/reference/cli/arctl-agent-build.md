---
title: arctl agent build
weight: 10
---

Build Docker images for an agent project that you created with the `arctl agent init` command.

This command looks for an `agent.yaml` file in the specified directory. It uses the file to generate template artifacts and to invoke the `docker build` command for both the agent and referenced MCP servers. You can optionally use the `--push` option to push the image to your container registry. 

## Usage

```sh
arctl agent build [project-directory] [flags]
```

Example: 
```sh
arctl agent build ./my-agent
arctl agent build ./my-agent --push --platform linux/amd64
arctl agent build ./my-agent --image ghcr.io/myorg/my-agent:v1.0.0
```

## Command-specific flags

```sh
--image string: Full image specification (e.g., ghcr.io/myorg/my-agent:v1.0.0)
--platform string: Target platform for Docker build (e.g., linux/amd64, linux/arm64)
--push: Push the image to the registry
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```