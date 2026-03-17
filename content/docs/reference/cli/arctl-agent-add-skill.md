---
title: arctl agent add-skill
weight: 10
---

Add a skill to the agent manifest.

Skills can be added from the following sources:

- A container image (via `--image`)
- An existing skill registry (via `--registry-skill-name`)

When starting a new skill from scratch, use [`arctl skill init`](/docs/reference/cli/arctl-skill-init/) instead.

## Usage

```sh
arctl agent add-skill <name> [flags]
```

Examples:
```sh
arctl agent add-skill my-skill --image docker.io/org/skill:latest
arctl agent add-skill my-skill --registry-skill-name cool-skill
```

## Command-specific flags

```sh
--image string                    Docker image containing the skill
--project-dir string              Project directory (default ".")
--registry-skill-name string      Skill name in the registry
--registry-skill-version string   Skill version to pull from the registry (defaults to latest)
--registry-url string             Registry URL (defaults to the currently configured registry)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
