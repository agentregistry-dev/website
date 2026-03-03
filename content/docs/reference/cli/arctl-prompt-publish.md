---
title: arctl prompt publish
weight: 10
---

Publish a prompt to agentregistry. The prompt can be provided as a plain text file or a YAML file.

When publishing from a text file, the `--name` and `--version` flags are required. When publishing from a YAML file (`.yaml` or `.yml`), the name and version are read from the file but can be overridden with flags.

## Usage

```sh
arctl prompt publish <file> [flags]
```

Example:
```sh
arctl prompt publish system-prompt.txt --name my-prompt --version 1.0.0
arctl prompt publish system-prompt.txt --name my-prompt --version 1.0.0 --description "System prompt for code review"
arctl prompt publish prompt.yaml
arctl prompt publish prompt.yaml --version 2.0.0
```

## Command-specific flags

```sh
--name string: Prompt name (required for text files)
--version string: Prompt version (required for text files)
--description string: Prompt description
--dry-run: Preview what will be published without publishing the prompt
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
