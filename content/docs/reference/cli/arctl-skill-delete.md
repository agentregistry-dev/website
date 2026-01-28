---
title: arctl skill delete
weight: 10
---

Delete a skill from the registry.
The skill must not be published or deployed unless --force is used.

## Usage

```sh
arctl skill delete <skill-name> [flags]
```

Example: 
```sh
arctl skill delete my-skill --version 1.0.0
arctl skill delete my-skill --version 1.0.0 --force
```

## Command-specific flags

```sh
--force: Force delete even if published or deployed
--version string: Specify the version to delete (required)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
