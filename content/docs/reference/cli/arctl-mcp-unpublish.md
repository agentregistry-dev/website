---
title: arctl mcp unpublish
weight: 10
---

Unpublish an MCP server from the registry.

This marks the server as unpublished, hiding it from public listings.
The server data is not deleted and can be re-published later.

Use --all to unpublish all versions of the server.

## Usage

```sh
arctl mcp unpublish <server-name> [flags]
```

Example: 
```sh
arctl mcp unpublish my-server --version latest
arctl mcp unpublish my-server --all
```

## Command-specific flags

```sh
--all: Unpublish all versions of the server
--version string: Specify the version of the server to unpublish (defaults to latest)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
