---
title: arctl skill pull
weight: 10
---

Pull a skill from agentregistry and extract its contents to a local directory. Supports skills packaged as Docker images or hosted in GitHub repositories.

If no output directory is specified, the skill is automatically extracted to `./skills/<skill-name>`.

## Usage

```sh
arctl skill pull <skill-name> [output-directory] [flags]
```

Examples:
```sh
# Pull a skill to the default location (./skills/my-skill)
arctl skill pull my-skill

# Pull to a custom directory
arctl skill pull my-skill ./my-output-dir

# Pull a specific version
arctl skill pull my-skill --version 1.0.0
```

## Command-specific flags

```sh
--version string   Version to pull (if not specified and multiple versions exist, you will be prompted)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
