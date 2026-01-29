---
title: arctl skill delete
weight: 10
---

Delete a skill from agentregistry. If the skill is published, use the `--force` option. 

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
--force: Force deletion, even if the skill is published 
--version string: Specify the version to delete (required)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
