---
title: arctl init prompt
description: "Create a new declarative prompt YAML using the ar.dev/v1alpha1 format."
weight: 10
---

Create a new `<name>.yaml` in the current directory using the `ar.dev/v1alpha1` declarative format. No code scaffolding is generated.

The generated file can be applied directly:
```sh
arctl apply -f my-prompt.yaml
```

## Usage

```sh
arctl init prompt NAME [flags]
```

Examples:
```sh
arctl init prompt my-prompt
arctl init prompt my-prompt --description "System prompt for summarization"
```

## Command-specific flags

```sh
    --content string       Initial prompt content (default "You are a helpful assistant.")
    --description string   Prompt description
```

## Global flags

```sh
-h, --help                  Display help information for the command.
    --output-dir string     Parent directory under which the project is created (defaults to the current directory)
```
