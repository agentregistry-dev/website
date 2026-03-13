---
title: arctl deployments list
weight: 10
---

List all deployments (agents and MCP servers).

## Usage

```sh
arctl deployments list [flags]
```

Example:
```sh
arctl deployments list
arctl deployments list --type agent
arctl deployments list --type mcp
arctl deployments list --status deployed
arctl deployments list --provider local
arctl deployments list -o json
```

## Command-specific flags

```sh
--type string: Filter by resource type (agent or mcp)
--status string: Filter by deployment status (deploying, deployed, failed, cancelled, discovered)
--provider string: Filter by provider ID
-o, --output string: Output format (table, json) (default "table")
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
