---
title: Publish to catalog
weight: 20
description: Add your MCP server to the agentregistry catalog so that you can start deploying the MCP server to connected runtimes.
---

## About the registry catalog

Agentregistry serves as a catalog for your AI artifacts, including agents, skills, and MCP servers. You can decide which MCP servers you want to make available to your registry users by adding them to the registry catalog. After an MCP server is published in the catalog, registry users can deploy it to a connected runtime.

Before you can add an MCP server to the catalog, you must build a Docker container image and push it to a container image registry. The registry deploys MCP servers from the container image. Optionally, you can also add a reference to the source code repository in your `mcp.yaml` file so that catalog users can trace the server back to its source.

| Field | Purpose | Required for deployment? |
| --- | --- | --- |
| `spec.source.package` | The runnable container image. The registry deploys from this. | Yes |
| `spec.source.repository` | A link to the source code repository. Traceability metadata only — not used for deployment. | No |

## Before you begin

1. Install agentregistry on [Kubernetes]({{< link path="/setup/kubernetes" >}}).
2. [Create an MCP server]({{< link path="/mcp/local/create/" >}}).
3. Optional: [Add tools to your MCP server]({{< link path="/mcp/local/tools" >}}).

## Build the image

1. Set your container registry as an environment variable. The examples in this guide use GitHub Container Registry (`ghcr.io`). Replace `my-org` with your GitHub organization or username.
   ```sh
   export REGISTRY=ghcr.io/my-org
   ```

2. Log in to your container registry.
   ```sh
   docker login ghcr.io
   ```

3. Build the MCP server image and push it to your registry.

   ```sh
   arctl build mymcp --image $REGISTRY/mymcp:latest --push
   ```

   Example output:
   ```console
   Building Docker image for python project...
   ...
   ✓ Successfully built Docker image: ghcr.io/my-org/mymcp:latest
   ```

   > [!TIP]
   > To build a multi-architecture image (for example, to support both `amd64` and `arm64` nodes in your cluster), add `--platform linux/amd64,linux/arm64`. For more information, see the [arctl build](/docs/reference/cli/arctl-build/) command.

## Publish the server

1. Write the `mcp.yaml` manifest. The `$REGISTRY` variable set in the build step is used here to keep the image path consistent. The registry validates that the image exists at apply time, so make sure the image is pushed before running this command.

   ```yaml
   cat > mymcp/mcp.yaml << EOF
   apiVersion: ar.dev/v1alpha1
   kind: MCPServer
   metadata:
     name: mymcp
   spec:
     title: mymcp
     description: mymcp MCP server
     source:
       package:
         origin:
           type: oci
           identifier: $REGISTRY/mymcp:latest
           oci:
             serverName: mymcp
         transport:
           type: http
           port: 3000
           path: /mcp
   EOF
   ```

2. Publish the MCP server to the agentregistry catalog.

   ```sh
   arctl apply -f mymcp/mcp.yaml
   ```

   Example output:
   ```console
   → Injecting labels from arctl.yaml: arctl.dev/framework=fastmcp, arctl.dev/language=python
   ✓ MCPServer/mymcp (latest) created
   ```

3. Verify that the MCP server is published in the catalog.

   ```sh
   arctl get mcps
   ```

   Example output:
   ```console
   NAME    TAG      DESCRIPTION
   mymcp   latest   mymcp MCP server
   ```

4. Optional: Open the [agentregistry UI](http://localhost:12121) and go to the **Servers** view to review your published MCP server.
   {{< reuse-image src="img/ar-mcp.svg" srcDark="img/ar-mcp-dark.svg" >}}

## Next

{{< cards >}}
{{< card link="/docs/mcp/local/deploy" title="Deploy the MCP server" description="Deploy your MCP server to a Kubernetes runtime." >}}
{{< card link="/docs/agents/mcp/" title="Add to an agent" description="Wire your MCP server into an agent." >}}
{{< /cards >}}

## Cleanup

To delete an MCP server from agentregistry, use `arctl delete`.

```sh
arctl delete mcp mymcp
```
