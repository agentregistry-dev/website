---
title: arctl agent add-prompt
weight: 10
---

Add a prompt reference to the agent's `agent.yaml` file. The prompt is resolved from the registry when the agent runs.

## Usage

```sh
arctl agent add-prompt <name> [flags]
```

Example:
```sh
arctl agent add-prompt reviewer --registry-prompt-name code-review
arctl agent add-prompt reviewer --registry-prompt-name code-review --registry-prompt-version 1.0.0
arctl agent add-prompt reviewer --registry-prompt-name code-review --registry-url https://registry.example.com
```

## Command-specific flags

```sh
--registry-prompt-name string: Prompt name in the registry (required)
--registry-prompt-version string: Version of the prompt to pull from the registry (optional; defaults to latest)
--registry-url string: Registry URL (default: current registry)
--project-dir string: Project directory (default: current directory) (default ".")
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
