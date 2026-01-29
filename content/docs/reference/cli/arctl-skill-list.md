---
title: arctl skill list
weight: 10
---

List available skills in agentregistry.

## Usage

```sh
arctl skill list [flags]
```

Example: 
```sh
arctl skill list
arctl skill list --all --output json
arctl skill list --page-size 20
```

## Command-specific flags

```sh
-a, --all: Show all items without pagination
-o, --output string: Output format (table, json, yaml) (default "table")
-p, --page-size int: Number of items per page (default 15)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
