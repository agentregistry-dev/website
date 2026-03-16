---
title: arctl skill init
weight: 10
---

Initialize a new agentic skill project.

## Usage

```sh
arctl skill init [skill-name] [flags]
```

Examples:
```sh
arctl skill init my-skill
arctl skill init my-skill --empty --force
arctl skill init my-skill --output-dir ./skills
```

## Command-specific flags

```sh
--empty               Create an empty skill project
--force               Overwrite existing directory
--no-git              Skip git initialization
--output-dir string   Output directory for the skill project (default: current directory under the skill name)
--verbose             Enable verbose output during initialization
```

## Global flags
```sh
-h, --help: Display help information for the command.
```
