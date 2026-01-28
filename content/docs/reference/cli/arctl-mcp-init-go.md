---
title: arctl mcp init go
weight: 10
---

Initialize a new MCP server project using the mcp-go framework.

This command will create a new directory with a basic mcp-go project structure,
including a go.mod file, a main.go file, and an example tool.

You must provide a valid Go module name for the project.

## Usage

```sh
arctl mcp init go [project-name] [flags]
```

Example: 
```sh
arctl mcp init go my-mcp-server --go-module-name github.com/my-org/my-project
```

## Command-specific flags

```sh
--go-module-name string: The Go module name for the project (e.g., github.com/my-org/my-project)
```

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
