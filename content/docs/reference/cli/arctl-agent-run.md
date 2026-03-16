---
title: arctl agent run
weight: 10
---

Run an agent project locally via Docker compose. If the argument is a directory,
`arctl` uses the local files. Otherwise, it fetches the agent by name from the registry and
launches the interactive chat interface.

## Usage

```sh
arctl agent run [project-directory-or-agent-name] [flags]
```

Examples:
```sh
arctl agent run ./my-agent
arctl agent run dice
arctl agent run ./my-agent -e KEY=VALUE
```

## Command-specific flags

```sh
    --build             Build the agent and MCP servers before running (default true)
-e, --env stringArray   Environment variables to set when running the agent (KEY=VALUE)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
