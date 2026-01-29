---
title: arctl mcp show
weight: 10
---

Shows detailed information about an MCP server.

## Usage

```sh
arctl mcp show <server-name> [flags]
```

Example: 
```sh
arctl mcp show my-server
arctl mcp show my-server --version 1.0.0 --output json
```

## Command-specific flags

```sh
-o, --output string: Output format (table, json) (default "table")
--version string: Show specific version of the server
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
