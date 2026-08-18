---
title: arctl get
description: "List or retrieve registry resources by type."
weight: 10
---

List or retrieve registry resources by type.

Supported types: `agents`, `mcps`, `skills`, `prompts`, `runtimes`, `deployments` (singular and uppercase forms also accepted, e.g. `Agent`, `agent`, `agents`)

Use `arctl get all` to retrieve resources of every type.

## Usage

```sh
arctl get TYPE [NAME] [flags]
```

Examples:
```sh
arctl get all
arctl get agents
arctl get agents --tag stable          # list rows with a specific tag
arctl get agents --latest              # list rows pinned to the "latest" tag
arctl get mcps
arctl get agent acme-summarizer
arctl get agent acme-summarizer -o yaml
arctl get agent acme-summarizer --tag stable
arctl get agent acme-summarizer --all-tags
arctl get deployment team-a/acme-summarizer
arctl get deployments --origin discovered  # list discovered (unmanaged) deployments
arctl get deployments --origin all         # list managed and discovered
arctl get skills -o json
```

## Command-specific flags

```sh
    --all-tags        List every tag of NAME (tagged content kinds only)
    --latest          List mode only: restrict to rows pinned to the literal 'latest' tag
                      (equivalent to --tag latest)
    --origin string   Deployments only: filter by provenance — managed, discovered, or all
                      (defaults to managed when unset)
-o, --output string   Output format: table, yaml, json (default "table")
    --tag string      Tagged kinds only. With NAME: fetch one tag (defaults to latest).
                      Without NAME: filter the list to this tag.
```

## Global flags

```sh
-h, --help                    Display help information for the command.
    --registry-token string   Registry bearer token (defaults to value of ARCTL_API_TOKEN env var)
    --registry-url string     Registry URL (overrides ARCTL_API_BASE_URL env var; defaults to http://localhost:12121)
```
