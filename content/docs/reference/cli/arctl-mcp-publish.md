---
title: arctl mcp publish
weight: 10
---

Publish an MCP Server to the registry.

This command supports two modes:
1. Build and publish from local folder: Provide a path to a folder containing mcp.yaml
2. Re-publish existing server: Provide a server name from the registry to change its status to published

## Usage

```sh
arctl mcp publish <mcp-server-folder-path|server-name> [flags]
```

Example: 
```sh
# Build and publish from local folder
arctl mcp publish ./my-server --docker-url docker.io/myorg --push

# Re-publish an existing server from the registry
arctl mcp publish io.github.example/my-server
```

## Command-specific flags

```sh
--docker-url string: Docker registry URL (required for local builds). For example: docker.io/myorg. The final image name will be <docker-url>/<mcp-server-name>:<tag>
--dry-run: Show what would be done without actually doing it
--github string: Specify the GitHub repository URL for the MCP server
--platform string: Target platform (e.g., linux/amd64,linux/arm64)
--push: Automatically push to Docker and agent registries (for local builds)
--tag string: Docker image tag to use (for local builds) (default "latest")
--transport string: Transport type: stdio or streamable-http (reads from mcp.yaml if not specified)
--transport-url string: Transport URL for streamable-http transport (default: http://localhost:3000/mcp when transport=streamable-http)
--version string: Specify the version to publish (for re-publishing existing servers, skips interactive selection)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
