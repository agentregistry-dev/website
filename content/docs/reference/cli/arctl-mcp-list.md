---
title: arctl mcp list
weight: 10
---

Lists all Model Context Protocol (MCP) servers published in the registry.

## Usage

```sh
arctl mcp list [flags]
```

Examples:
```sh
arctl mcp list
arctl mcp list --type npm
arctl mcp list --sortBy version --output json
```

## Command-specific flags

```sh
-a, --all             Show all items without pagination
-o, --output string   Output format (table, json, yaml) (default "table")
-p, --page-size int   Number of items per page (default 15)
-s, --sortBy string   Sort by column (name, version, type, status, updated) (default "name")
-t, --type string     Filter by registry type (e.g., npm, pypi, oci, sse, streamable-http)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
