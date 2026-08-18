---
title: arctl db migrate
description: "Apply, roll back, and inspect database migrations."
weight: 10
---

Apply, roll back, and inspect database migrations independently of server startup. Reads `AGENT_REGISTRY_DATABASE_URL` from the environment when `--db-url` is omitted.

## Usage

```sh
arctl db migrate [command] [flags]
```

Available sub-commands: `down`, `force`, `goto`, `status`, `up`, `version`

## db migrate up

Apply all pending migrations across every registered source. Acquires a `pg_advisory_lock` per source so concurrent pods serialize.

```sh
arctl db migrate up
```

## db migrate down

Roll back the `N` most-recent applied migrations.

```sh
arctl db migrate down N
```

Migrations whose `.down.sql` raises an error will leave the `schema_migrations` row marked dirty. Use `arctl db migrate force V` to clear the dirty marker after manual remediation.

## db migrate goto

Move the schema to version `V` (forward or backward). Use `V=0` to roll back every applied migration.

```sh
arctl db migrate goto V
```

## db migrate force

Mark version `V` as applied without running its SQL. Use this to reconcile the `schema_migrations` table after manual remediation. The version must correspond to a shipped migration file.

```sh
arctl db migrate force V
```

## db migrate status

Show how many migrations are applied vs pending across all sources.

```sh
arctl db migrate status [flags]
```

Flags:
```sh
-o, --output string   Output format: "text" (default) or "json"
```

## db migrate version

Print the highest applied migration version. For a single source the value is on one line; multi-source binaries print one line per source.

```sh
arctl db migrate version
```

## Global flags

```sh
    --db-url string   PostgreSQL connection URL (defaults to value of AGENT_REGISTRY_DATABASE_URL env var)
-h, --help            Display help information for the command.
```
