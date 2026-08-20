---
title: Connect AI clients to the registry MCP server
weight: 30
description: "Connect Claude Code, Cursor, VS Code, or Kiro to agentregistry so your AI development tools can discover and use catalog artifacts."
---

Agentregistry runs its own MCP server that exposes the artifact catalog as MCP tools on port `31313`. By connecting your AI development tools to this server, you can query the registry from inside your IDE or coding assistant without leaving your workflow. The MCP server reads directly from the registry database. 

> [!NOTE]
> The MCP server is read-only. It does not invoke tools on cataloged MCP servers or proxy traffic to them. To add or update registry catalog items, you must continue using the UI, REST API, or `arctl` command line tool.

## Supported tools

After you connect to the MCP server, your AI development client can call the following tools to browse and fetch catalog artifacts.

| Tool | Description |
| --- | --- |
| `list_agents`, `get_agent` | List or retrieve agents from the catalog. |
| `list_servers`, `get_server` | List or retrieve MCP servers from the catalog. |
| `list_skills`, `get_skill` | List or retrieve skills from the catalog. |
| `list_prompts`, `get_prompt` | List or retrieve prompts from the catalog. |
| `list_models`, `get_model` | List or retrieve models from the catalog. |
| `list_plugins`, `get_plugin` | List or retrieve plugins from the catalog. |
| `list_deployments`, `get_deployment` | List or retrieve deployments. |
| `list_runtimes`, `get_runtime` | List or retrieve connected runtimes. |
| `registry_health` | Check the health of the registry MCP server. |
| `registry_version` | Get build information for the registry. |

## Supported clients

The following MCP clients are supported out of the box. 

| Client | Command |
| --- | --- |
| [Claude Code](https://code.claude.ai) | `arctl configure claude-code --port 31313` |
| [Cursor](https://www.cursor.com) | `arctl configure cursor --port 31313` |
| [VS Code](https://code.visualstudio.com) | `arctl configure vscode --port 31313` |
| [Kiro](https://kiro.dev) | `arctl configure kiro --port 31313` |

## Before you begin

Install agentregistry on [Kubernetes]({{< link path="/setup/kubernetes" >}}).

## Connect to the MCP server

1. From your project root, run the `arctl configure` command to configure your MCP client. The command writes a `.mcp.json` file to the current directory, which scopes the MCP server to that project. The following example uses Claude Code. To use a different client, update the command accordingly. For available options, see [Supported clients](#supported-clients).

   ```sh
   arctl configure claude-code --port 31313
   ```

   Example output:

   ```console
   Configured Claude Code
   ```

2. Open the Claude CLI. Verify that Claude wants to add the `arctl` MCP server.  
   ```sh
   claude
   ```

   Example output: 
   ```console
   New MCP server found in this project: arctl

   MCP servers may execute code or access system resources. All tool calls require approval. Learn more in the MCP documentation.

   ❯ 1. Use this MCP server
     2. Use this and all future MCP servers in this project
     3. Continue without using this MCP server
   ```

3. List the MCP servers that you have access to and verify that the `arctl` MCP server is listed. 
   ```sh
   /mcp
   ```

   Example output: 
   ```console
   Manage MCP servers
   1 server

   Project MCPs (/path/to/your-project/.mcp.json)
   ❯ arctl · ✔ connected · 18 tools
   ```

4. Verify that you can access the server by prompting it. For example, you can ask it what agentregistry version you have.
   ```sh
   use the registry_version tool to tell me the agentregistry version  
   ```

   Example output: 
   ```console
   Called arctl (ctrl+o to expand)

   ⏺ The registry (via agentregistry-mcp) reports v0.4.0.
   ```



