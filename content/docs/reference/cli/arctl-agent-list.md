---
title: arctl agent list
weight: 10
---

List agents that are published to the registry.

## Usage

```sh
arctl agent list [flags]
```

Example: 
```sh
arctl agent list
arctl agent list --all --output json
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