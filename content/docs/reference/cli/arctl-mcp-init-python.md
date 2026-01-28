---
title: arctl mcp init python
weight: 10
---

Initialize a new MCP server project using the fastmcp-python framework.

This command will create a new directory with a basic fastmcp-python project structure,
including a pyproject.toml file, a main.py file, and an example tool.

## Usage

```sh
arctl mcp init python [project-name] [flags]
```

Example: 
```sh
arctl mcp init python my-mcp-server
arctl mcp init python my-mcp-server --author "John Doe" --email "john@example.com"
```

## Command-specific flags

No command-specific flags beyond the positional arguments.

## Global flags
```sh
--author string: Author name for the project
--description string: Description for the project
--email string: Author email for the project
--force: Overwrite existing directory
--no-git: Skip git initialization
--non-interactive: Run in non-interactive mode
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
