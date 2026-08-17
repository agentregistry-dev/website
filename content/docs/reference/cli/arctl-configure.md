---
title: arctl configure
description: "Create the JSON configuration each client needs to connect to arctl."
weight: 10
---

Creates the `.json` configuration for each client, so it can connect to `arctl`.

Clients that support OAuth can authenticate interactively without using `--token-env`. For static or direct access, pass `--token-env` with the name of the environment variable holding the MCP bearer token.

## Usage

```sh
arctl configure [client-name] [flags]
```

Examples:
```sh
arctl configure claude-desktop
arctl configure my-client --url http://localhost:21212/mcp --port 21212
arctl configure my-client --token-env ARCTL_MCP_TOKEN
```

## Command-specific flags

```sh
    --port string        Port for the MCP server (default "21212")
    --token-env string   Name of the environment variable holding the MCP bearer token for static/direct access
                         (e.g. ARCTL_MCP_TOKEN); written into the config as a reference the client expands at
                         connect time. Clients that support OAuth can authenticate interactively instead.
    --url string         Custom MCP server URL (default: http://localhost:21212/mcp)
```

## Global flags

```sh
-h, --help                    Display help information for the command.
    --registry-token string   Registry bearer token (defaults to value of ARCTL_API_TOKEN env var)
    --registry-url string     Registry URL (overrides ARCTL_API_BASE_URL env var; defaults to http://localhost:12121)
```
