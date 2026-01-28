---
title: arctl configure
weight: 10
---

Creates the .json configuration for each client, so it can connect to arctl.

## Usage

```sh
arctl configure [client-name] [flags]
```

Example: 
```sh
arctl configure my-client --url http://localhost:21212/mcp --port 21212
```

## Command-specific flags

```sh
--port string: Port for the MCP server (default "21212")
--url string: Custom MCP server URL (default: http://localhost:21212/mcp)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
