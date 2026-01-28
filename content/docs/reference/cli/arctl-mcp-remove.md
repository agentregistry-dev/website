---
title: arctl mcp remove
weight: 10
---

Remove a deployed MCP server from the runtime.

## Usage

```sh
arctl mcp remove <server-name> [flags]
```

Example: 
```sh
arctl mcp remove my-server
arctl mcp remove my-server --version 1.0.0
```

## Command-specific flags

```sh
--version string: Specify the version of the deployment to remove (for validation)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
