---
title: Publish to catalog
weight: 20
description: "Add your agent to the registry catalog."
---

Build your agent image and publish it to agentregistry so your team can discover and deploy it.

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon.
2. [Create an agent](/docs/agents/create/).
3. Make sure you are logged in to your container registry.

## Build the agent image

1. Set your container registry URL, such as `ghcr.io/myorg`. This value is used to construct the image reference in your agent manifest.

   ```sh
   export REGISTRY=<registry-url>
   ```

2. Update the agent manifest with your registry URL. Select the tab that matches your setup.

   {{< tabs >}}
   {{% tab name="Agent-only" %}}

   ```yaml
   cat > myagent/agent.yaml <<EOF
   apiVersion: ar.dev/v1alpha1
   kind: Agent
   metadata:
     name: myagent
   spec:
     source:
       image: $REGISTRY/myagent:latest
     description: myagent agent
   EOF
   ```

   {{% /tab %}}
   {{% tab name="Agents with MCP server reference" %}}

   ```yaml
   cat > myagent/agent.yaml <<EOF
   apiVersion: ar.dev/v1alpha1
   kind: Agent
   metadata:
     name: myagent
   spec:
     source:
       image: $REGISTRY/myagent:latest
     description: myagent agent
     mcpServers:
       - kind: MCPServer
         name: mymcp
         tag: latest
   EOF
   ```

   {{% /tab %}}
   {{< /tabs >}}

3. Build the Docker image for your agent by using the image source information from your agent manifest. You can optionally use the `--push` flag to also push the image to your container registry.
   ```sh
   arctl build myagent
   ```

   Example output:
   ```console
   [+] Building 48.4s (12/12) FINISHED
   ...
   ✅ Successfully built Docker image: ghcr.io/myorg/myagent:latest
   ```

   > [!TIP]
   > To build a multi-architecture image (for example, to support both `amd64` and `arm64` nodes in your cluster), add `--platform linux/amd64,linux/arm64`. For more information, see the [arctl build](/docs/reference/cli/arctl-build/) command.

## Publish the agent

Create a catalog entry for your agent. 

1. Publish the agent manifest to agentregistry.

   ```sh
   arctl apply -f myagent/agent.yaml
   ```

   Example output:
   ```console
   ✓ Agent/myagent created
   ```

2. Verify that the agent was published.

   ```sh
   arctl get agents
   ```

   Example output:
   ```console
   NAME      TAG      DESCRIPTION
   myagent   latest   myagent agent
   ```

3. Open the [agentregistry UI](http://localhost:12121) and go to the **Agents** view to review your published agent.
   {{< reuse-image src="img/ar-list-agent.png" srcDark="img/ar-list-agent-dark.png" >}}

## Next

{{< cards >}}
{{< card link="../deploy/" title="Deploy the agent" description="Deploy your agent to your environment." >}}
{{< /cards >}}

## Cleanup

To remove an agent from agentregistry, use `arctl delete`.

```sh
arctl delete agent myagent
```
