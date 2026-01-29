---
title: arctl agent publish
weight: 10
---

Publish an agent to agentregistry.

This command supports two options:

- 'arctl agent publish my-agent' publishes the agent as defined by the `agent.yaml` file in the given folder.
- 'arctl agent publish my-agent --version 1.2.3' publishes an agent that already exists in agentregistry under a different version.

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