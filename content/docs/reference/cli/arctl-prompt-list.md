---
title: arctl prompt list
weight: 10
---

List prompts published to agentregistry.

## Usage

```sh
arctl prompt list [flags]
```

Example:
```sh
arctl prompt list
arctl prompt list --all --output json
```

## Command-specific flags

```sh
-a, --all: Show all items without pagination
-o, --output string: Output format (table, json) (default "table")
-p, --page-size int: Number of items per page (default 15)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
