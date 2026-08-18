---
title: arctl delete
description: "Delete a registry resource by type and name, or from a YAML file."
weight: 10
---

Delete a registry resource.

**File mode (declarative):** reads resources from a YAML file and sends `DELETE /v0/apply`.

**Explicit mode:** specify the type and name directly. For taggable artifacts (agents, MCPs, skills, prompts), `--tag` selects an exact tag and defaults to `latest`.

Supported types: `agent`, `mcp`, `skill`, `prompt`, `deployment` (plural and uppercase forms also accepted)

## Usage

```sh
arctl delete (TYPE NAME | -f FILE) [flags]
```

Examples:
```sh
arctl delete -f my-agent/agent.yaml
arctl delete -f my-server/mcp.yaml
arctl delete agent acme-summarizer --tag stable
arctl delete agent acme-summarizer --all-tags
arctl delete mcp acme-fetch --tag stable
arctl delete deployment team-a/my-agent
```

## Command-specific flags

```sh
    --all-tags          Delete every tag of NAME (taggable artifact kinds only)
-f, --filename string   YAML file to read resources from
    --tag string        Specific tag to delete (taggable artifact kinds only; defaults to latest)
```

## Global flags

```sh
-h, --help                    Display help information for the command.
    --registry-token string   Registry bearer token (defaults to value of ARCTL_API_TOKEN env var)
    --registry-url string     Registry URL (overrides ARCTL_API_BASE_URL env var; defaults to http://localhost:12121)
```
