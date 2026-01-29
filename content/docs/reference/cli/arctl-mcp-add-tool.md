---
title: arctl mcp add-tool
weight: 10
---

Generate an MCP tool scaffold. 

This command creates a new tool file in `src/tools/` directory with a generic template.
The tool is automatically discovered and loaded when the MCP server starts.

Each tool is a Python file containing a function decorated with `@mcp.tool()`.
The function uses the `@mcp.tool()` decorator from FastMCP.

## Usage

```sh
arctl mcp add-tool [tool-name] [flags]
```

Example: 
```sh
arctl mcp add-tool weather
arctl mcp add-tool database --description "Database operations tool"
arctl mcp add-tool weather --force
```

## Command-specific flags

```sh
-d, --description string: Tool description
-f, --force: Overwrite existing tool file
-i, --interactive: Interactive tool creation
--project-dir string: Project directory (default: current directory)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
