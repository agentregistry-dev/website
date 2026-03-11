---
title: arctl skill build
weight: 10
---

Build a skill as a Docker image from a local skill folder containing a `SKILL.md` file.

This command reads the `SKILL.md` frontmatter to determine the skill name, builds a Docker image, and optionally pushes it to a registry. If the given directory contains multiple subdirectories with `SKILL.md` files, all matching skills are built.

## Usage

```sh
arctl skill build <skill-folder-path> [flags]
```

Examples:
```sh
arctl skill build ./my-skill --image docker.io/myorg/my-skill:v1.0.0
arctl skill build ./my-skill --image docker.io/myorg/my-skill:v1.0.0 --push
arctl skill build ./my-skill --image docker.io/myorg/my-skill:v1.0.0 --platform linux/amd64
```

## Command-specific flags

```sh
--image string: Full image specification (e.g., docker.io/myorg/my-skill:v1.0.0)
--platform string: Target platform for Docker build (e.g., linux/amd64, linux/arm64)
--push: Push the image to the registry
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
