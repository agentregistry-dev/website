---
title: arctl mcp delete
weight: 10
---

Delete an MCP server from agentregistry. If the server is published or deployed, you must use the `--force` option. 

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
--force: Force deletion, even if the MCP server is published or deployed
--version string: Specify the version to delete (required)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
