---
title: arctl prompt delete
weight: 10
---

Delete a prompt version from agentregistry.

## Usage

```sh
arctl prompt delete <prompt-name> --version <version>
```

Example:
```sh
arctl prompt delete code-review --version 1.0.0
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
