---
title: arctl mcp build
weight: 10
---

Build an MCP server from the current project.

This command detects the project type and builds the appropriate MCP server Docker image.

## Usage

```sh
arctl mcp build [flags]
```

Examples:
```sh
arctl mcp build                    # Build Docker image from current directory
arctl mcp build ./my-project       # Build Docker image from specific directory
arctl mcp build --image docker.io/myorg/my-mcp:v1.0.0 --push
```

## Command-specific flags

```sh
-n, --image string      Full image specification (e.g., docker.io/myorg/my-mcp:v1.0.0)
    --platform string   Target platform (e.g., linux/amd64,linux/arm64)
    --push              Push the image to the container registry, specified by --image
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
