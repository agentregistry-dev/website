---
title: arctl agent publish
weight: 10
---

Publish an agent to the registry.

This command supports two modes:

1. **From a local project directory** (with `agent.yaml`): Reads metadata from the local file and publishes the agent.
2. **Direct registration** (without `agent.yaml`): Registers an agent by name using `--git` and `--version` flags.

## Usage

```sh
arctl agent publish [agent-name|project-directory] [flags]
```

Examples:
```sh
# Publish from current directory (reads metadata from agent.yaml)
arctl agent publish

# Publish from specified directory
arctl agent publish ./my-agent

# Publish directly with name and git repo (no agent.yaml needed)
arctl agent publish my-agent \
  --git https://github.com/myorg/my-agent \
  --version 1.0.0 \
  --description "My agent"

# Show what would be published
arctl agent publish --dry-run
```

## Command-specific flags

```sh
--description string   Agent description (when not using agent.yaml)
--dry-run              Show what would be done without actually doing it
--git string           Git repository URL (GitHub, GitLab, Bitbucket)
--overwrite            Overwrite if the version is already published
--version string       Version to publish (overrides manifest)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
