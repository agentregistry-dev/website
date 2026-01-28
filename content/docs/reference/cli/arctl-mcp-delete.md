---
title: arctl mcp delete
weight: 10
---

Delete an MCP server from the registry.
The server must not be published or deployed unless --force is used.

## Usage

```sh
arctl mcp delete <server-name> [flags]
```

Example: 
```sh
arctl mcp delete my-server --version 1.0.0
arctl mcp delete my-server --version 1.0.0 --force
```

## Command-specific flags

```sh
--force: Force delete even if published or deployed
--version string: Specify the version to delete (required)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
