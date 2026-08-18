---
title: arctl version
description: "Display the version of the arctl CLI."
weight: 10
---

Displays the version of `arctl`.

## Usage

```sh
arctl version [flags]
```

Examples:
```sh
arctl version
arctl version --json
```

## Command-specific flags

```sh
    --json   Output version information in JSON format
```

## Global flags

```sh
-h, --help                    Display help information for the command.
    --registry-token string   Registry bearer token (defaults to value of ARCTL_API_TOKEN env var)
    --registry-url string     Registry URL (overrides ARCTL_API_BASE_URL env var; defaults to http://localhost:12121)
```
