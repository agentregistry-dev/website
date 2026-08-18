---
title: arctl pull
description: "Fetch a registry resource's source repository to a local directory."
weight: 10
---

Fetch a registry resource's source repository to a local directory.

Reads the resource's `spec.source.repository.url` from the registry and clones it into `DIRECTORY` (defaults to `NAME` if omitted).

Supported types: `agent`, `mcp`, `skill`

## Usage

```sh
arctl pull TYPE NAME [DIRECTORY] [flags]
```

Examples:
```sh
arctl pull agent myagent
arctl pull mcp myserver ./vendor/myserver
arctl pull skill myskill --tag stable
```

## Command-specific flags

```sh
    --tag string   Specific tag to pull
```

## Global flags

```sh
-h, --help                    Display help information for the command.
    --registry-token string   Registry bearer token (defaults to value of ARCTL_API_TOKEN env var)
    --registry-url string     Registry URL (overrides ARCTL_API_BASE_URL env var; defaults to http://localhost:12121)
```
