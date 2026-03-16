---
title: arctl mcp publish
weight: 10
---

Publish an MCP server to the registry.

This command supports two modes:

1. **Package-based** (installable artifact): Requires `--type` and `--package-id`. Use for servers distributed via npm, PyPI, or OCI.
2. **Remote-only** (already-deployed endpoint): Use `--remote-url` for servers already running in the cloud. No `--type` or `--package-id` needed.

If no argument is provided and `mcp.yaml` exists in the current directory, metadata is read from it.

## Usage

```sh
arctl mcp publish [server-name|local-path] [flags]
```

Examples:
```sh
# Publish a remote MCP server hosted on Databricks (no package to install)
arctl mcp publish com.databricks/unity-catalog \
  --remote-url https://my-workspace.cloud.databricks.com/mcp \
  --version 1.0.0 \
  --description "Databricks Unity Catalog MCP server"

# Publish from current folder (reads metadata from mcp.yaml)
arctl mcp publish \
  --type oci \
  --package-id docker.io/myorg/my-server:1.0.0

# Publish an OCI image with explicit server name
arctl mcp publish myorg/my-server \
  --type oci \
  --package-id docker.io/myorg/my-server:1.0.0 \
  --version 1.0.0 \
  --description "My MCP server"

# Publish an NPM package
arctl mcp publish myorg/filesystem-server \
  --type npm \
  --package-id @modelcontextprotocol/server-filesystem \
  --version 1.0.0 \
  --description "Filesystem MCP server" \
  --arg /path/to/directory

# Publish a PyPI package
arctl mcp publish myorg/server \
  --type pypi \
  --package-id mcp-server-package \
  --version 1.0.0 \
  --description "Python MCP server"
```

## Command-specific flags

```sh
--arg stringArray          Package argument (repeatable)
--description string       Server description
--dry-run                  Show what would be done without actually doing it
--git string               Git repository URL (GitHub, GitLab, Bitbucket)
--overwrite                Overwrite if the version is already published
--package-id string        Package identifier (e.g., docker.io/org/image:tag, @mcp/server)
--package-version string   Package version (defaults to --version)
--remote-url string        URL of an already-deployed remote MCP server (e.g. https://my-workspace.databricks.com/mcp)
--transport string         Transport type: stdio or streamable-http (package mode); streamable-http or sse (--remote-url mode)
--transport-url string     Transport URL for streamable-http transport
--type string              Package registry type: npm, pypi, or oci
--version string           Server version
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```
