---
title: arctl agent publish
weight: 10
---

Publish an agent project to the registry.

This command supports two forms:

- 'arctl agent publish ./my-agent' publishes the agent defined by agent.yaml in the given folder.
- 'arctl agent publish my-agent --version 1.2.3' publishes an agent that already exists in the registry by name and version.

## Usage

```sh
arctl agent publish [project-directory|agent-name] [flags]
```

Example: 
```sh
arctl agent publish ./my-agent
arctl agent publish my-agent --version latest
arctl agent publish ./my-agent --github https://github.com/myorg/my-agent
```

## Command-specific flags

```sh
--github string: Specify the GitHub repository for the agent
--version string: Specify version to publish (when publishing an existing registry agent)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```