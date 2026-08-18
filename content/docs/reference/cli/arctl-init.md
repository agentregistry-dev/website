---
title: arctl init
description: "Scaffold a new declarative resource project (agent, MCP server, skill, or prompt)."
weight: 10
---

Scaffold a new project. The generated YAML uses the `ar.dev/v1alpha1` declarative format and can be applied directly with `arctl apply`.

Supported types:
- `agent NAME` — framework + language picker
- `mcp NAME` — framework + language picker
- `skill NAME`
- `prompt NAME`

Run `arctl init` with no arguments for an interactive picker that selects the resource kind.

## Usage

```sh
arctl init TYPE NAME [flags]
```

Examples:
```sh
arctl init agent myagent
arctl init agent myagent --framework adk --language python
arctl init mcp my-server
arctl init mcp my-server --framework fastmcp --language python
arctl init skill my-skill
arctl init prompt my-prompt
arctl init                   # interactive: picker for kind
```

## Command-specific flags

```sh
    --output-dir string   Parent directory under which the project is created (defaults to the current directory)
```

## Global flags

```sh
-h, --help   Display help information for the command.
```

## Sub-commands

- [arctl init agent](arctl-init-agent) — scaffold a new agent project
- [arctl init mcp](arctl-init-mcp) — scaffold a new MCP server project
- [arctl init prompt](arctl-init-prompt) — create a new declarative prompt YAML
- [arctl init skill](arctl-init-skill) — scaffold a new skill project
