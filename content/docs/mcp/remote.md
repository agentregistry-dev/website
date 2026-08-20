---
title: Register remote MCP servers
weight: 20
description: Add an existing remote MCP server to the agentregistry catalog so that agents can discover and use it.
---

If you have an MCP server that is already running at a public URL, you can register it in the agentregistry catalog by referencing its URL in an `MCPServer` definition. The registry stores the URL as a catalog entry and makes the server available to agents. Agentregistry does not deploy or manage the server lifecycle.

## Before you begin

1. Install agentregistry on [Kubernetes]({{< link path="/setup/kubernetes" >}}).
2. Make sure you have a running MCP server that is reachable at a public URL.

## Register the remote MCP server

The following example registers the [GitHub MCP server](https://github.com/github/github-mcp-server), which requires a [GitHub Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) for authentication.

1. Save your GitHub Personal Access Token in an environment variable. 
   ```sh
   export GH_PAT=<your-gh-pat>
   ```

2. Create a registry catalog entry for your remote MCP server. 
   ```yaml
   arctl apply -f - <<EOF
   apiVersion: ar.dev/v1alpha1
   kind: MCPServer
   metadata:
     name: github-mcp
   spec:
     description: GitHub MCP server
     remote:
       type: streamable-http
       url: https://api.githubcopilot.com/mcp/
       headers:
         - name: Authorization
           value: "Bearer ${GH_PAT}"
   EOF
   ```

   | Field | Description |
   | --- | --- |
   | `spec.remote.type` | The transport type. Supported values: `streamable-http`, `sse`. |
   | `spec.remote.url` | The full URL of the remote MCP server, including the path. |
   | `spec.remote.headers` | Optional. HTTP headers to include in requests, for example for authentication. |

   Example output:
   ```console
   ✓ MCPServer/github-mcp (latest) created
   ```

3. Verify that the remote MCP server is registered in the catalog.

   ```sh
   arctl get mcps
   ```

   Example output:
   ```console
   NAME         TAG      DESCRIPTION
   github-mcp   latest   GitHub MCP server
   ```

4. Optional: Open the [agentregistry UI](http://localhost:12121) and go to the **Servers** view to review your registered MCP server.

## Next

{{< cards >}}
{{< card link="/docs/agents/mcp/" title="Add to an agent" description="Wire your remote MCP server into an agent." >}}
{{< /cards >}}
