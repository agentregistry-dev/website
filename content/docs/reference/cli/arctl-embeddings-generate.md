---
title: arctl embeddings generate
weight: 10
---

Generate embeddings for existing servers and agents (backfill or refresh).

## Usage

```sh
arctl embeddings generate [flags]
```

Example: 
```sh
arctl embeddings generate --servers --agents --update
arctl embeddings generate --dry-run
```

## Command-specific flags

```sh
--agents: Include agents when generating embeddings (default true)
--batch-size int: Number of server versions processed per batch (default 100)
--dry-run: Print planned changes without calling the embedding provider or writing to the database
--servers: Include MCP servers when generating embeddings (default true)
--update: Regenerate embeddings even when the stored checksum matches
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
