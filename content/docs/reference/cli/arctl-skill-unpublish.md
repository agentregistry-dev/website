---
title: arctl skill unpublish
weight: 10
---

Unpublish a skill from the registry.

This marks the skill as unpublished, hiding it from public listings.
The skill data is not deleted and can be re-published later.

Use --all to unpublish all versions of the skill.

## Usage

```sh
arctl skill unpublish <skill-name> [flags]
```

Example: 
```sh
arctl skill unpublish my-skill --version latest
arctl skill unpublish my-skill --all
```

## Command-specific flags

```sh
--all: Unpublish all versions of the skill
--version string: Specify the version of the skill to unpublish (defaults to latest)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
