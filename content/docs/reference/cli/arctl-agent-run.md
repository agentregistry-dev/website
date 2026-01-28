---
title: arctl agent run
weight: 10
---

Run an agent project locally via docker compose. If the argument is a directory,
arctl uses the local files; otherwise it fetches the agent by name from the registry and
launches the same chat interface.

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

