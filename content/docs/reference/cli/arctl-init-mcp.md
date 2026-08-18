---
title: arctl init mcp
description: "Scaffold a new MCP server project with declarative YAML and framework stubs."
weight: 10
---

Scaffold a new MCP server project.

Picks a framework and language interactively (or via `--framework` / `--language`).

The name must be a DNS-1123 subdomain: lowercase alphanumeric, hyphens, and dots; max 253 chars; each dot-separated segment must start and end with alphanumeric (max 63 chars per segment).

## Usage

```sh
arctl init mcp NAME [flags]
```

Examples:
```sh
arctl init mcp my-mcp
arctl init mcp my-mcp --framework fastmcp --language python
arctl init mcp my-stdio --framework fastmcp --language python --transport stdio
```

## Command-specific flags

```sh
    --description string   MCP server description
    --framework string     Framework. Skips picker.
    --image string         Image tag override
    --language string      Language. Skips picker.
    --port int             HTTP port the MCP server binds to (and that arctl run maps) (default 3000)
    --transport string     MCP transport: "http" (Streamable HTTP, listens on --port) or "stdio" (stdin/stdout).
                           Defaults to http when omitted.
```

## Global flags

```sh
-h, --help                  Display help information for the command.
    --output-dir string     Parent directory under which the project is created (defaults to the current directory)
```
