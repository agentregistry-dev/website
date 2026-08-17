---
title: arctl apply
description: "Apply one or more registry resources from a YAML file."
weight: 10
---

Apply reads a YAML file (or stdin with `-f -`) containing one or more resource documents and applies them via `POST /v0/apply`.

Each resource is applied atomically; the server reports per-resource status. Errors are reported per resource without aborting the batch.

## Usage

```sh
arctl apply -f FILE [flags]
```

Examples:
```sh
arctl apply -f agent.yaml
arctl apply -f stack.yaml --dry-run
cat stack.yaml | arctl apply -f -
```

## Command-specific flags

```sh
--dry-run                Validate and simulate without mutating state
-f, --filename strings   YAML file to apply (repeatable; use - for stdin)
```

## Global flags

```sh
-h, --help                    Display help information for the command.
    --registry-token string   Registry bearer token (defaults to value of ARCTL_API_TOKEN env var)
    --registry-url string     Registry URL (overrides ARCTL_API_BASE_URL env var; defaults to http://localhost:12121)
```
