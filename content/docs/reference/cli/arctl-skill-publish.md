---
title: arctl skill publish
weight: 10
---

Wrap a Claude Skill in a Docker image and publish it to both Docker registry and agent registry.

The skill folder must contain a SKILL.md file with proper YAML frontmatter.
Use --multi flag to auto-detect and process multiple skill folders.

## Usage

```sh
arctl skill publish <skill-folder-path> [flags]
```

Example: 
```sh
arctl skill publish ./my-skill --docker-url docker.io/myorg --push
arctl skill publish ./my-skill --platform linux/amd64,linux/arm64
```

## Command-specific flags

```sh
--docker-url string: Docker registry URL. For example: docker.io/myorg. The final image name will be <docker-url>/<skill-name>:<tag>
--dry-run: Show what would be done without actually doing it
--platform string: Target platform(s) for the build (e.g., linux/amd64, linux/arm64, or linux/amd64,linux/arm64)
--push: Automatically push to Docker and agent registries
--tag string: Docker image tag to use (default "latest")
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
