---
title: Add MCP servers
description: Give an agent access to the tools that are exposed by an MCP server. 
weight: 20
---

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. [Create an agent](/docs/agents/create/). 
3. [Create an MCP server](/docs/mcp/local/create/).
4. [Publish an MCP server](/docs/mcp/local/publish/).

## Add an MCP server to the agent

MCP servers are referenced in the agent manifest in the `spec.mcpServers` block. Each MCP server that you reference in that block must be published in the registry catalog. 

1. List the MCP servers that are published in the registry catalog. 
   ```sh
   arctl get mcps
   ```

   Example output:
   ```console
   NAME    TAG      DESCRIPTION
   mymcp   latest   mymcp MCP server
   ```

2. Add an `mcpServers` block to your agent definition (`agent.yaml`) and reference the MCP server that you want your agent to have access to.

   ```yaml
   cat > myagent/agent.yaml <<EOF
   apiVersion: ar.dev/v1alpha1
   kind: Agent
   metadata:
     name: myagent
   spec:
     source:
       image: ghcr.io/myagent:latest
     description: myagent agent
     mcpServers:
       - kind: MCPServer
         name: mymcp
         tag: latest
   EOF
   ```

   | Field | Description |
   | -- | -- |
   | `mcpServers[].kind` | Must be `MCPServer`. |
   | `mcpServers[].name` | Name of the MCP server in agentregistry. |
   | `mcpServers[].tag` | Tag to use. If omitted, the latest tag is resolved at deploy time. |

> [!NOTE]
> MCP servers are referenced in the agent manifest and resolved from the registry at deploy time. You cannot locally test access to the MCP server tools by using the `arctl run agent` command. To test access to the tools, you must publish the agent in the registry catalog and deploy the agent to your runtime. 


## Next

{{< cards >}}
{{< card link="../publish/" title="Publish the agent" description="Build and publish your agent to the agentregistry catalog." >}}
{{< /cards >}}

