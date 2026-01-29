---
title: arctl agent run
weight: 10
---

Run an agent project locally by using Docker compose. If the command includes a directory,
`arctl` uses the local files in that directory. In all other cases, the command tries to fetch the agent from the registry by using its name. 

## Usage

```sh
arctl agent run [project-directory-or-agent-name] [flags]
```

Example: 
```sh
arctl agent run ./my-agent
arctl agent run dice
```

## Command-specific flags

No command-specific flags.

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```

