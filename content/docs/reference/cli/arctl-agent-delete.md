---
title: arctl agent delete
weight: 10
---

Delete an agent from the registry.

## Usage

```sh
arctl agent delete <agent-name> [flags]
```

Example:
```sh
arctl agent delete my-agent --version 1.0.0
```

## Command-specific flags

```sh
--version string: Specify the version to delete (required)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```