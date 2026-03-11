---
title: arctl skill publish
weight: 10
---

Publish a skill to agentregistry.

This command supports multiple modes:

1. **From a local skill folder** (with `SKILL.md`): Reads metadata from the local file and publishes with a GitHub repository reference or a pre-built Docker image reference.
2. **Direct registration with GitHub** (without `SKILL.md`): Registers a skill by name by using `--github` and `--version` flags.
3. **Direct registration with Docker** (without `SKILL.md`): Registers a skill by name by using `--docker-image` and `--version` flags.

## Usage

```sh
arctl skill publish <skill-name|skill-folder-path> [flags]
```

Examples:
```sh
# Publish from a local folder with a GitHub repository reference
arctl skill publish ./my-skill --github https://github.com/myorg/repo --version 1.0.0

# Publish from a local folder with a pre-built Docker image
arctl skill publish ./my-skill --docker-image docker.io/myorg/my-skill:v1.0.0 --version 1.0.0

# Register directly from a GitHub repository (no local files needed)
arctl skill publish my-skill \
  --github https://github.com/myorg/repo/tree/main/skills/my-skill \
  --version 1.0.0 \
  --description "My remote skill"

# Register directly with a pre-built Docker image (no local files needed)
arctl skill publish my-skill \
  --docker-image docker.io/myorg/my-skill:v1.0.0 \
  --version 1.0.0 \
  --description "My Docker skill"

# Preview what will be published without publishing the skill
arctl skill publish ./my-skill --github https://github.com/myorg/repo --version 1.0.0 --dry-run
```

## Command-specific flags

```sh
--github string        GitHub repository URL.
                       Supports tree URLs: https://github.com/owner/repo/tree/branch/path
--docker-image string  Pre-built Docker image reference (e.g., docker.io/myorg/my-skill:v1.0.0)
--version string       Version to publish (required)
--description string   Skill description (used with direct registration, i.e. without SKILL.md)
--dry-run              Show what would be done without actually doing it
```

{{< callout type="info" >}}
The `--github` and `--docker-image` flags are mutually exclusive. One of them is required.
{{< /callout >}}

{{< callout type="tip" >}}
To build a skill as a Docker image, use [`arctl skill build`](/docs/reference/cli/arctl-skill-build/) instead.
{{< /callout >}}

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
