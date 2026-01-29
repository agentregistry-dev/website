---
title: arctl skill init
weight: 10
---

Initialize a new agentic skill project.

## Usage

```sh
arctl skill init [skill-name] [flags]
```

Example: 
```sh
arctl skill init my-skill
arctl skill init my-skill --empty --force
```

## Command-specific flags

```sh
--empty: Create an empty skill project
--force: Overwrite existing directory
--no-git: Skip git initialization
--verbose: Enable verbose output during initialization
```

## Global flags
```sh
-h, --help: Display help information for the command.
```
