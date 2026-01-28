---
title: arctl mcp deploy
weight: 10
---

Deploy an MCP server to the runtime.

## Usage

```sh
arctl mcp deploy <server-name> [flags]
```

Example: 
```sh
arctl mcp deploy my-server --version latest
arctl mcp deploy my-server --runtime kubernetes --namespace my-namespace
arctl mcp deploy my-server -e KEY=VALUE -a ARG=value
```

## Command-specific flags

```sh
-a, --arg stringArray: Runtime arguments (KEY=VALUE)
-e, --env stringArray: Environment variables (KEY=VALUE)
--header stringArray: HTTP headers for remote servers (KEY=VALUE)
--namespace string: Kubernetes namespace for deployment (only used with --runtime kubernetes) (default "default")
--prefer-remote: Prefer remote deployment over local
--runtime string: Deployment runtime target (local, kubernetes) (default "local")
--version string: Version to deploy (default "latest")
-y, --yes: Automatically accept all prompts (use default/latest version)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
