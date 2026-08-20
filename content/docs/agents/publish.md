---
title: Publish
weight: 20
description: "Add your agent to the registry catalog."
---

Build your agent image and publish it to agentregistry so your team can discover and deploy it.

## Before you begin

1. Follow the [Get started](/docs/quickstart/) guide to set up agentregistry and start the agentregistry daemon.
2. [Create an agent](/docs/agents/create/).

## Publish the agent

1. Build the agent Docker image. The following command reads `arctl.yaml` in your project directory and builds the image tag from your `agent.yaml`. To push the image to a container registry, add `--push`. Make sure you are logged in to the registry before adding `--push`.

   ```sh
   arctl build myagent
   ```

   Example output:
   ```console
   [+] Building 48.4s (12/12) FINISHED
   ...
   ✅ Successfully built Docker image: ghcr.io/myagent:latest
   ```

   > [!TIP]
   > To build for a specific platform, add `--platform linux/amd64`. To override the image tag, use `--image ghcr.io/myorg/myagent:v1.0.0`. For more information, see the [arctl build](/docs/reference/cli/arctl-build/) command.

2. Publish the agent to agentregistry. The following command registers your `agent.yaml` definition in the catalog.

   ```sh
   arctl apply -f myagent/agent.yaml
   ```

   Example output:
   ```console
   agent.agentregistry.dev/myagent applied
   ```

3. List the agents in agentregistry. Verify that you see an entry for `myagent`.

   ```sh
   arctl get agents
   ```

   Example output:
   ```console
   NAME      FRAMEWORK   LANGUAGE   PROVIDER   MODEL              DEPLOYED   PUBLISHED
   myagent   adk         python     gemini     gemini-2.0-flash   False      True
   ```

4. Optional: Open the [agentregistry UI](http://localhost:12121) and go to the **Agents** view. Verify that you can see your agent.
   {{< reuse-image src="img/ar-list-agent.png" >}}
   {{< reuse-image-dark srcDark="img/ar-list-agent-dark.png" >}}

## Next

Now that you published the agent, you can [deploy the agent to your environment](/docs/agents/deploy/).

## Cleanup

To remove an agent from agentregistry, use `arctl delete`.

```sh
arctl delete agent myagent
```
