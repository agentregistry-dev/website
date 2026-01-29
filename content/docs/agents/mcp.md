---
title: Add MCP servers
weight: 50
---

Give an agent access to the tools that are exposed on an MCP server. 

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon. 
2. [Create an agent](/docs/agents/create/). 
3. [Create an MCP server](/docs/mcp/create/).
4. [Publish an MCP server](/docs/mcp/publish/).

## Add MCP server

1. List the MCP servers that are published in agentregistry. 
   ```sh
   arctl mcp list
   ```

   Example output:
   ```
   NAME                VERSION   TYPE   PUBLISHED   DEPLOYED   UPDATED
   user/my-mcp-server  0.1.0     oci    True        False      7s
   ```

2. Add the MCP server to the `myagent` agent that you created as part of the before you begin steps. This command opens an interactive dialog in your terminal. 
   ```sh
   arctl agent add-mcp --project-dir myagent
   ```

3. Go through the interactive dialog. 
   1. Use the arrow keys to go to `3. Registry (pull published MCP server from registry)`. This option allows you to select an MCP server that you previously published to the registry. Press the return key to continue. 
   2. Enter `http://localhost:12121` as the registry URL and press the return key. 
   3. Select the MCP server that you published to agentregistry and the version you want to use. 
   4. Select `true` in the `Prefer remote MCP server` dialog.
   5. Enter the following environment variables. By default, the MCP server scaffolding assumes that you want to run the MCP server with `stdio`. However, streamable HTTP is required to successfully connect to the MCP server from the agent. 
      | Key | Value | 
      | -- | -- | 
      | `MCP_TRANSPORT_MODE` | `http` | 
      | `HOST` | `0.0.0.0` | 
   6. Enter `my-mcp-server` as the MCP server name and press the return key to exit the wizard. 

   Example output: 
   ```sh
   ✓ Added MCP server 'my-mcp-server' (registry) to agent.yaml
   ```

4. Verify that your MCP server tool reference is added to the agent by reviewing the agent definition in the `agent.yaml` file. 
   ```sh
   cat myagent/agent.yaml
   ```

   Example output: 
   ```console
   agentName: myagent
   image: ghcr.io/myagent:latest
   language: python
   framework: adk
   modelProvider: gemini
   modelName: gemini-2.0-flash
   description: ""
   mcpServers:
       - type: registry
         name: my-mcp-server
         env:
           - MCP_TRANSPORT_MODE=http
           - HOST=0.0.0.0
         registryURL: http://localhost:12121
         registryServerName: user/my-mcp-server
         registryServerVersion: 0.1.0
         registryServerPreferRemote: true
   ```

5. Build the agent image. 
   ```sh
   arctl agent build myagent
   ```

6. Run the agent. Wait for the agent dialog to open. 
   ```sh
   arctl agent run myagent
   ```

7. Ask the agent what it can do for you. Verify that the agent offers the ability to roll a dice, check prime numbers, and echo back a message. 
   {{< reuse-image src="img/ar-agent-tool.png" >}}
   {{< reuse-image-dark srcDark="img/ar-agent-tool.png" >}}

8. Try out the echo tool by entering `echo <string>`, such as `echo hello world`. Verify that you see the MCP tool call and that the agent returns `hello world`. 
   {{< reuse-image src="img/ar-agent-tool-verify.png" >}}
   {{< reuse-image-dark srcDark="img/ar-agent-tool-verify.png" >}}


## Cleanup 

To remove the MCP server tool, edit the `agent.yaml` definition and remove the MCP server reference. Then, re-build the agent and run it. 
