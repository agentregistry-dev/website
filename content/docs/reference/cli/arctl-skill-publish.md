---
title: arctl skill publish
weight: 10
---

Publish a skill to agentregistry.

This command supports two modes:

1. **From a local skill folder** (with `SKILL.md`): Reads metadata from the local file and publishes as a Docker image or GitHub repository reference.
2. **Direct registration** (without `SKILL.md`): Registers a skill by name by using `--github` and `--version` flags.

## Usage

```sh
arctl skill publish <skill-name|skill-folder-path> [flags]
```

Examples:
```sh
# Publish from a local folder as a Docker image
arctl skill publish ./my-skill --docker-url docker.io/myorg --push

# Publish from a local folder with a GitHub repository reference
arctl skill publish ./my-skill --github https://github.com/myorg/repo --version 1.0.0

# Register directly from a GitHub repository (no local files needed)
arctl skill publish my-skill \
  --github https://github.com/myorg/repo/tree/main/skills/my-skill \
  --version 1.0.0 \
  --description "My remote skill"

# Preview what will be published without publishing the skill
arctl skill publish ./my-skill --docker-url docker.io/myorg --dry-run
```

## Command-specific flags

### Common flags
```sh
--github string       GitHub repository URL (alternative to --docker-url).
                      Supports tree URLs: https://github.com/owner/repo/tree/branch/path
--version string      Version to publish (required for --github, optional override for --docker-url)
--description string  Skill description (used with direct registration, i.e. without SKILL.md)
--dry-run             Show what would be done without actually doing it
```

### Docker-only flags
```sh
--docker-url string   Docker registry URL (e.g., docker.io/myorg).
                      The final image name will be <docker-url>/<skill-name>:<tag>
--tag string          Docker image tag (default "latest")
--push                Push image to Docker registry
--platform string     Target platform for Docker build (e.g., linux/amd64,linux/arm64)
```

{{< callout type="info" >}}
The `--docker-url` and `--github` flags are mutually exclusive.
{{< /callout >}}

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
