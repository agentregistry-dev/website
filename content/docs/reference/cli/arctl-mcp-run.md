---
title: arctl mcp run
weight: 10
---

Run an MCP server locally.

You can run:
  - A server from agentregistry by specifying the server name, such as 'arctl mcp run @modelcontextprotocol/server-everything'. 
  - A local MCP project by specifying the project path, such as 'arctl mcp run .' or 'arctl mcp run ./my-mcp-server'. 

For local projects, the server must be built first by using the 'arctl mcp build' command.

## Usage

```sh
arctl mcp run <server-name|path> [flags]
```

Example: 
```sh
arctl mcp run @modelcontextprotocol/server-everything
arctl mcp run ./my-mcp-server --inspector
arctl mcp run . -e KEY=VALUE --arg ARG=value
```

## Command-specific flags

```sh
--arg stringArray: Runtime arguments (key=value)
-e, --env stringArray: Environment variables (key=value)
--header stringArray: Headers for remote servers (key=value)
--inspector: Launch MCP Inspector to interact with the server
--verbose: Enable verbose logging
--version string: Specify the version of the server to run
-y, --yes: Automatically accept all prompts (use default values)
```

## Global flags
```sh
-h, --help: Display help information for the command.
```
