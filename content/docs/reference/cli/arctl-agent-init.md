---
title: arctl agent init 
weight: 10
---

Bootstrap a new agent project. You must specify the ADK (Agent Development Kit), the programming language, and the name of the directory you want to create.

## Usage

```sh
arctl agent init [adk] [language] [agent-name]
```

Example: 
```
arctl agent init adk python myagent
```

## Command-specific flags
No specific flags are currently required for initialization beyond the positional arguments.

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```