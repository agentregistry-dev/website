---
title: arctl deployments show
weight: 10
---

Show detailed information about a deployment, including its status, provider, environment variables, and endpoint URL.

## Usage

```sh
arctl deployments show <deployment-id> [flags]
```

Example:
```sh
arctl deployments show eb2d8231
arctl deployments show eb2d8231-def6-7890-ghij-klmnopqrstuv
arctl deployments show eb2d8231 -o json
```

The deployment ID can be the full ID or a unique prefix (as shown in `arctl deployments list`).

## Command-specific flags

```sh
-o, --output string: Output format (table, json) (default "table")
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
