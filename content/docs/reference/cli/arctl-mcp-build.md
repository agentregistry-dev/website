---
title: arctl mcp build
weight: 10
---

Build an MCP server from the current project.

This command detects the project type and build the appropriate MCP server Docker image.

## Usage

```sh
arctl mcp build [flags]
```

Example: 
```sh
arctl mcp build                              # Build Docker image from current directory
arctl mcp build ./my-project                  # Build Docker image from specific directory
```

## Command-specific flags

```sh
--platform string: Target platform (e.g., linux/amd64,linux/arm64)
--push: Push Docker image to registry
-t, --tag string: Docker image tag (alias for --output)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
