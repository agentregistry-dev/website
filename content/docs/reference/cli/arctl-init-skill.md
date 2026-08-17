---
title: arctl init skill
description: "Scaffold a new skill project with declarative YAML and source stubs."
weight: 10
---

Scaffold a new skill project. Creates a project directory containing a declarative `skill.yaml` (`ar.dev/v1alpha1`) and source stubs.

The generated `skill.yaml` can be applied directly:
```sh
arctl apply -f NAME/skill.yaml
```

## Usage

```sh
arctl init skill NAME [flags]
```

Examples:
```sh
arctl init skill my-skill
arctl init skill my-skill --description "Text summarizer"
```

## Command-specific flags

```sh
    --description string   Skill description
```

## Global flags

```sh
-h, --help                  Display help information for the command.
    --output-dir string     Parent directory under which the project is created (defaults to the current directory)
```
