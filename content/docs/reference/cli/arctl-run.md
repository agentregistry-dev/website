---
title: arctl run
description: "Run the agent or MCP server defined in the current project directory."
weight: 10
---

Run the agent or MCP server defined by the declarative YAML in the project directory (defaults to `.`).

Reads `arctl.yaml` to look up the matching framework by `(framework, language)` and dispatches to its run command. Loads `.env` (if present) and validates that the framework's required env vars are set.

**For Agent projects:** starts the runtime in the background, waits until the agent's HTTP endpoint is reachable, then launches an interactive A2A chat. When the chat exits, the runtime is torn down. Use `--no-chat` to run in the foreground without chat.

**For MCP server projects:** chat does not apply; the framework's run command runs in the foreground until interrupted. Pass `--inspector` to launch the MCP Inspector alongside the server.

## Usage

```sh
arctl run [DIRECTORY] [flags]
```

Examples:
```sh
arctl run
arctl run ./myagent
arctl run -e FOO=bar -e BAZ=qux
arctl run --no-chat              # agent without chat
arctl run --watch                # iterative dev loop
arctl run mymcp --inspector      # MCP with MCP Inspector launched
```

## Command-specific flags

```sh
    --dry-run           Skip actual exec; useful for tests
-e, --env strings       KEY=VALUE env override (repeatable)
    --inspector         Launch MCP Inspector alongside the server; it connects when ready
                        (MCP projects only; errors on agent projects)
    --no-chat           Skip chat for Agents; run the framework command in the foreground
                        (agent projects only; errors on MCP projects)
    --watch             Rebuild and restart on file change (skips chat for agents;
                        for chat open a second terminal)
```

## Global flags

```sh
-h, --help                    Display help information for the command.
    --registry-token string   Registry bearer token (defaults to value of ARCTL_API_TOKEN env var)
    --registry-url string     Registry URL (overrides ARCTL_API_BASE_URL env var; defaults to http://localhost:12121)
```
