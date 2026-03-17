---
title: Pull skills
weight: 30
description:
---

Pull a published skill from agentregistry and extract its contents to your local machine.

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon.
2. Ensure that the skill you want to pull is [published](/docs/skills/publish/) to agentregistry.

## Pull a skill

Use the `arctl skill pull` command to download a skill from the registry and extract its contents locally.

```sh
arctl skill pull <skill-name>
```

By default, the skill is extracted to `./skills/<skill-name>`. You can specify a custom output directory:

```sh
arctl skill pull my-skill ./my-output-dir
```

## Specify a version

If the skill has multiple versions published, use `--version` to specify which one to pull:

```sh
arctl skill pull my-skill --version 1.0.0
```

If you don't specify a version:
- If only one version exists, it is selected automatically.
- If multiple versions exist, you are prompted to choose one.

## How it works

The `pull` command automatically detects the skill's source and handles extraction:

- **Docker-packaged skills**: The container image is pulled, a temporary container is created, and the skill files are extracted from it.
- **GitHub-hosted skills**: The repository is cloned (using `--depth 1` for efficiency), and the relevant files are copied to the output directory. If the skill's GitHub URL includes a branch and subdirectory path, only the files from that subdirectory are extracted.

In both cases, the skill files are placed in the output directory ready for use.

## Example

```sh
# Pull a skill to the default location (./skills/argocd-cli-setup)
arctl skill pull argocd-cli-setup

# Pull a specific version to a custom directory
arctl skill pull argocd-cli-setup ./my-skills/argocd --version 1.0.0

# List available skills in the registry
arctl skill list
```
