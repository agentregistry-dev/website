---
title: arctl mcp init
weight: 10
---

Initialize a new MCP server project with dynamic tool loading.

This command provides subcommands to initialize a new MCP server project
by using one of the supported frameworks.

## Usage

```sh
arctl mcp init [project-type] [project-name] [flags]
arctl mcp init [command]
```

## Available Commands

- `go`: Initialize a new Go MCP server project
- `python`: Initialize a new Python MCP server project

## Command-specific flags

```sh
--author string: Author name for the project
--description string: Description for the project
--email string: Author email for the project
--force: Overwrite existing directory
--no-git: Skip git initialization
--non-interactive: Run in non-interactive mode
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
