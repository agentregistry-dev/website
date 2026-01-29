---
title: arctl agent delete
weight: 10
---

Delete an agent from the registry. To delete an agent that is published or deployed, you must use the `--force` option. 

## Usage

```sh
arctl agent delete <agent-name> [flags]
```

Example: 
```sh
arctl agent delete my-agent --version 1.0.0
arctl agent delete my-agent --version 1.0.0 --force
```

## Command-specific flags

```sh
--force: Force deletion, even if the agent is published or deployed
--version string: Specify the version to delete (required)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```