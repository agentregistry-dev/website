---
title: arctl init agent
description: "Scaffold a new agent project with declarative YAML and framework stubs."
weight: 10
---

Scaffold a new agent project.

Picks a framework and language interactively (or via `--framework` / `--language`). Writes:
- `agent.yaml` — `v1alpha1` envelope
- `arctl.yaml` — local build config (framework + language)
- `.env` — env vars the chosen framework needs (gitignored)

To wire a sibling `arctl init`'d MCP project for local dev, pass `--local-mcp`. For an MCP at an arbitrary URL (remote or local-not-arctl), edit `.env` after init and add an `MCP_SERVERS_CONFIG` entry:

```sh
MCP_SERVERS_CONFIG=[{"name":"my-remote","type":"remote","url":"https://mcp.example.com/sse"}]
```

## Usage

```sh
arctl init agent NAME [flags]
```

Examples:
```sh
arctl init agent myagent
arctl init agent myagent --framework adk --language python
arctl init agent myagent --local-mcp ../my-mcp
```

## Command-specific flags

```sh
    --description string      Agent description
    --framework string        Framework (e.g. adk). Skips picker.
    --git string              Git repository URL
    --git-branch string       Git branch to record on the agent's source repository
    --git-commit string       Git commit SHA to pin the agent's source repository to
    --image string            Image tag override
    --language string         Language (e.g. python). Skips picker.
    --local-mcp strings       Path to a sibling MCP project; wires it into .env so the local agent can reach it. Repeatable.
    --mcp strings             Registry MCP server ref (name@version). Repeatable.
    --model-name string       Model name
    --model-provider string   Model provider
```

## Global flags

```sh
-h, --help                  Display help information for the command.
    --output-dir string     Parent directory under which the project is created (defaults to the current directory)
```
