---
title: Connect AI development tools
weight: 30
description: "Connect Claude Code, Cursor, VS Code, or Kiro to agentregistry so your AI development tools can discover and use catalog artifacts."
---

Agentregistry runs its own MCP server that exposes the artifact catalog as MCP tools. By connecting your AI development tools to this server, you can query the registry from inside your IDE or coding assistant without leaving your workflow.

Once connected, your AI development tool can call tools such as `list_agents`, `get_agent`, `list_servers`, `get_server`, `list_skills`, `get_skill`, `list_prompts`, and `get_prompt` to browse and fetch catalog artifacts.

## Supported clients

| Client | Command |
|---|---|
| [Claude Code](https://code.claude.ai) | `arctl configure claude-code` |
| [Cursor](https://www.cursor.com) | `arctl configure cursor` |
| [VS Code](https://code.visualstudio.com) | `arctl configure vscode` |
| [Kiro](https://kiro.dev) | `arctl configure kiro` |

## Before you begin

- Install agentregistry on [Docker]({{< link path="/setup/docker" >}}) or [Kubernetes]({{< link path="/setup/kubernetes" >}}).
- Install the `arctl` CLI. See [Install with Docker]({{< link path="/setup/docker" >}}) or [Install on Kubernetes]({{< link path="/setup/kubernetes" >}}) for the install steps.
- Make sure agentregistry is running and accessible at `http://localhost:12121`.

## Configure a client

Run `arctl configure` with the name of your client. The command writes the MCP server configuration to the correct location for that client automatically.

```sh
arctl configure <client-name>
```

For example, to configure Claude Code:

```sh
arctl configure claude-code
```

Example output:

```console
Configured Claude Code
```

By default, the registry MCP server runs on port `21212`. To use a different port or a custom URL, pass `--port` or `--url`:

```sh
arctl configure claude-code --port 21212
arctl configure claude-code --url http://my-registry-host:21212/mcp
```

## Verify the connection

After configuring a client, restart it and check that `agentregistry-mcp` appears in the list of connected MCP servers. You can then ask your AI tool to list available agents or MCP servers from the registry.

For example, in Claude Code you can type:

```
What agents are available in the agentregistry catalog?
```

Claude Code calls the `list_agents` tool and returns a list of published agents from your catalog.

## Available tools

The registry MCP server exposes the following tools for querying the catalog.

| Tool | Description |
|---|---|
| `list_agents` | List published agents with optional name and tag filters. |
| `get_agent` | Fetch a published agent by name and tag. |
| `list_servers` | List published MCP servers with optional name and tag filters. |
| `get_server` | Fetch a published MCP server by name and tag. |
| `list_skills` | List published skills with optional name and tag filters. |
| `get_skill` | Fetch a published skill by name and tag. |
| `list_prompts` | List published prompts with optional name and tag filters. |
| `get_prompt` | Fetch a published prompt by name and tag. |
| `list_plugins` | List published plugins with optional name and tag filters. |
| `get_plugin` | Fetch a published plugin by name and tag. |
| `list_deployments` | List active deployments with optional name filter. |
| `get_deployment` | Fetch a deployment by name. |
| `list_runtimes` | List connected runtimes with optional name filter. |
| `get_runtime` | Fetch a runtime by name. |
