---
title: arctl mcp deploy
weight: 10
---

Deploy an MCP server to a provider.

## Usage

```sh
arctl mcp deploy <server-name> [flags]
```

Examples:
```sh
arctl mcp deploy my-server --version latest
arctl mcp deploy my-server --version 1.0.0 --provider-id kubernetes-default
arctl mcp deploy my-server -e KEY=VALUE -a ARG=value
```

## Command-specific flags

```sh
-a, --arg stringArray      Runtime arguments (KEY=VALUE)
-e, --env stringArray      Environment variables (KEY=VALUE)
    --header stringArray   HTTP headers for remote servers (KEY=VALUE)
    --namespace string     Kubernetes namespace for deployment (if provider targets Kubernetes)
    --prefer-remote        Prefer remote deployment over local
    --provider-id string   Deployment target provider ID (defaults to local when omitted)
    --version string       Version to deploy (default "latest")
    --wait                 Wait for the deployment to become ready before returning (default true)
-y, --yes                  Automatically accept all prompts (use default/latest version)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
