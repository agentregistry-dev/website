---
title: arctl deployments create
weight: 10
---

Create a deployment for an agent or MCP server from the registry.

## Usage

```sh
arctl deployments create <name> [flags]
```

Example:
```sh
arctl deployments create my-agent --type agent --version latest
arctl deployments create my-agent --type agent --version 1.2.3
arctl deployments create my-agent --type agent --provider-id kubernetes-default --namespace my-namespace
arctl deployments create my-mcp-server --type mcp --version 1.0.0
arctl deployments create my-mcp-server --type mcp -e KEY=VALUE -a ARG=value
```

## Command-specific flags

```sh
--type string: Resource type to deploy (agent or mcp) (required)
--version string: Version to deploy (default "latest")
--provider-id string: Deployment target provider ID (default "local")
--namespace string: Kubernetes namespace for deployment
--wait: Wait for the deployment to become ready before returning (default true)
--prefer-remote: Prefer using a remote source when available
-e, --env stringArray: Environment variables to set (KEY=VALUE)
-a, --arg stringArray: Runtime arguments for MCP servers (KEY=VALUE)
--header stringArray: HTTP headers for remote MCP servers (KEY=VALUE)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
