---
title: arctl agent unpublish
weight: 10
---

Unpublish an agent from the registry. Note that this command can only be used if an agent was published to agentregistry. The command sets the published flag to false and hides the agent from public listings.

## Usage

```sh
arctl agent unpublish [agent-name] [flags]
```

Example: 
```sh
arctl agent unpublish my-agent --version latest
arctl agent unpublish my-agent --version 1.2.3
```

## Command-specific flags

```sh
--version string: Version of the agent to unpublish (default "latest")
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
