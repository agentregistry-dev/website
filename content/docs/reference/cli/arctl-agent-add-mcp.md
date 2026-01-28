---
title: arctl agent add-mcp
weight: 10
---

Add an MCP server entry to agent.yaml. Use flags for non-interactive setup or run without flags to open the wizard.

## Usage

```sh
arctl agent add-mcp [name] [args...] [flags]
```

Example: 
```sh
arctl agent add-mcp my-mcp-server --command npx --arg "-y" --arg "mcp-server"
arctl agent add-mcp my-mcp-server --remote https://example.com/mcp
arctl agent add-mcp my-mcp-server --registry-server-name io.github.example/my-server --registry-server-version 1.0.0
```

## Command-specific flags

```sh
--arg strings: Command argument (repeatable)
--build string: Container build (optional; mutually exclusive with --image)
--command string: Command to run MCP server (e.g., npx, uvx, arctl, or a binary)
--env strings: Environment variable in KEY=VALUE format (repeatable)
--header strings: HTTP header for remote MCP in KEY=VALUE format (repeatable, supports ${VAR} for env vars)
--image string: Container image (optional; mutually exclusive with --build)
--project-dir string: Project directory (default: current directory) (default ".")
--registry-server-name string: Registry-deployed MCP server name (optional; mutually exclusive with --remote, --command, --image, --build)
--registry-server-prefer-remote: Prefer remote MCP server (optional)
--registry-server-version string: Version of the MCP server to deploy from registry (e.g., 1.0.0) (optional)
--registry-url string: Registry URL (e.g., https://registry.example.com) (optional; mutually exclusive with --remote, --command, --image, --build)
--remote string: Remote MCP server URL (http/https)
```

## Global flags
```sh
-v, --verbose: Enable verbose output.
-h, --help: Display help information for the command.
```