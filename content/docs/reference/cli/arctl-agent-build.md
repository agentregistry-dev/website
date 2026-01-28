---
title: arctl agent build
weight: 10
---

Build Docker images for an agent project created with the init command.

This command looks for agent.yaml in the specified directory, regenerates template artifacts,
and invokes docker build (plus optional push) for both the agent and any command-type MCP servers.

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